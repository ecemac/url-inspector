package main

import (
    "github.com/ecemac/url-inspector/config"
    "github.com/ecemac/url-inspector/handlers"
    "github.com/ecemac/url-inspector/models"
    "github.com/ecemac/url-inspector/middleware"
    "github.com/gin-gonic/gin"
)

func main() {
    config.ConnectDB()
    config.DB.AutoMigrate(&models.URL{})

    r := gin.Default()

    api := r.Group("/", middleware.Auth())
    {
        api.POST("/urls", handlers.AddURL)
        api.GET("/urls", handlers.GetURLs)
        api.GET("/urls/:id", handlers.GetURLByID)
    }

    r.Run(":8080")
}
