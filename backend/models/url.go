package models

import "gorm.io/gorm"

type URL struct {
    gorm.Model
    Address       string
    Title         string
    HTMLVersion   string
    InternalLinks int
    ExternalLinks int
    BrokenLinks   string // Store as JSON string
    HasLoginForm  bool
    Status        string // queued, running, done, error
}
