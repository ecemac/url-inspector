package config

import (
	"fmt"
	"os"
	"time"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
	dsn := os.Getenv("DB_DSN")

	var err error
	maxAttempts := 10

	for attempts := 1; attempts <= maxAttempts; attempts++ {
		DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
		if err == nil {
			sqlDB, errPing := DB.DB()
			if errPing == nil && sqlDB.Ping() == nil {
				fmt.Println("✅ Connected to DB")
				return
			}
		}

		fmt.Printf("❌ Failed to connect to DB (attempt %d/%d): %v\n", attempts, maxAttempts, err)
		time.Sleep(2 * time.Second)
	}

	fmt.Println("💥 Could not connect to DB after retries")
	os.Exit(1)
}
