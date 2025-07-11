package main

import (
    "time"

    "github.com/ecemac/url-inspector/config"
    "github.com/ecemac/url-inspector/handlers"
    "github.com/ecemac/url-inspector/models"
    "github.com/ecemac/url-inspector/middleware"
    "github.com/gin-gonic/gin"
    "github.com/gin-contrib/cors"
)

func main() {
    config.ConnectDB()
    config.DB.AutoMigrate(&models.URL{})

    r := gin.Default()

    // Add CORS middleware to allow your frontend origin
    r.Use(cors.New(cors.Config{
        AllowOrigins:     []string{"http://localhost:5173"}, // your frontend origin
        AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
        AllowHeaders:     []string{"Origin", "Authorization", "Content-Type"},
        ExposeHeaders:    []string{"Content-Length"},
        AllowCredentials: true,
        MaxAge:           12 * time.Hour,
    }))

    api := r.Group("/", middleware.Auth())
    {
        api.POST("/urls", handlers.AddURL)
        api.GET("/urls", handlers.GetURLs)
        api.GET("/urls/:id", handlers.GetURLByID)
    }

    r.Run(":8080")
}
