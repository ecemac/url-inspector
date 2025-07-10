package config

import (
    "log"
    "os"
    "gorm.io/driver/mysql"
    "gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
    dsn := os.Getenv("DB_DSN")
    if dsn == "" {
        log.Fatal("DB_DSN environment variable not set")
    }
    db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
    if err != nil {
        log.Fatal("❌ Failed to connect to DB:", err)
    }
    DB = db
}
