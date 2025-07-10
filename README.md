A React + Go web app that crawls URLs and shows key page info.

---

## 🚀 Quick Start

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed on your machine

---

### Run the full app with Docker Compose

From the project root, run: ```docker-compose up --build```

This will start three services:

- MySQL database on port 3306
- Go backend API on port 8080
- React frontend on port 5173

### Access the app

Open your browser and go to: 

http://localhost:5173

You should see the frontend app running.

## Development

### Backend

Code lives in /backend

Written in Go with Gin framework

Connects to MySQL using DSN from environment variable DB_DSN

To run backend manually (requires Go and MySQL installed):

```
cd backend
go run main.go
```

### Backend

Code lives in /frontend

React app using React Router (v6 framework mode) and TypeScript

To run frontend manually (requires Node.js installed):

```
cd frontend
npm install
npm run dev
```

## Features

- Add URLs for crawling and analysis

- View summary table with sortable, filterable columns

- Click rows to see details (charts, broken links, etc.)

- Bulk actions (re-run analysis, delete URLs)

- Real-time crawl progress updates
