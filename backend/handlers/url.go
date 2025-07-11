package handlers

import (
    "github.com/gin-gonic/gin"
    "net/http"
    "github.com/ecemac/url-inspector/config"
    "github.com/ecemac/url-inspector/models"
    "github.com/ecemac/url-inspector/crawler"
)

func AddURL(c *gin.Context) {
    var input struct {
        Address string `json:"address"`
    }

    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "invalid input"})
        return
    }

    url := models.URL{
        Address: input.Address,
        Status:  "queued",
    }

    config.DB.Create(&url)
    go crawler.Crawl(&url)

    c.JSON(http.StatusOK, gin.H{"id": url.ID})
}

func GetURLs(c *gin.Context) {
    var urls []models.URL
    config.DB.Find(&urls)
    c.JSON(http.StatusOK, urls)
}

func GetURLByID(c *gin.Context) {
    var url models.URL
    if err := config.DB.First(&url, c.Param("id")).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "not found"})
        return
    }
    c.JSON(http.StatusOK, url)
}
