package crawler

import (
    "github.com/ecemac/url-inspector/config"
    "github.com/ecemac/url-inspector/models"
    "net/http"
    "golang.org/x/net/html"
    "encoding/json"
)

func Crawl(url *models.URL) {
    url.Status = "running"
    config.DB.Save(url)

    resp, err := http.Get(url.Address)
    if err != nil {
        url.Status = "error"
        config.DB.Save(url)
        return
    }
    defer resp.Body.Close()

    doc, err := html.Parse(resp.Body)
    if err != nil {
        url.Status = "error"
        config.DB.Save(url)
        return
    }

    title := ""
    var headings map[string]int = map[string]int{
        "h1": 0, "h2": 0, "h3": 0, "h4": 0, "h5": 0, "h6": 0,
    }

    var traverse func(*html.Node)
    traverse = func(n *html.Node) {
        if n.Type == html.ElementNode {
            if n.Data == "title" && n.FirstChild != nil {
                title = n.FirstChild.Data
            }
            if _, ok := headings[n.Data]; ok {
                headings[n.Data]++
            }
        }
        for c := n.FirstChild; c != nil; c = c.NextSibling {
            traverse(c)
        }
    }

    traverse(doc)

    // convert headings map to JSON for simplicity
    headingJSON, _ := json.Marshal(headings)

    url.Title = title
    url.HTMLVersion = "HTML5"
    url.Status = "done"
    url.BrokenLinks = string(headingJSON) // placeholder
    config.DB.Save(url)
}
