A React + Go web app that crawls URLs and shows key page info.

---

## 🚀 Quick Start

### Prerequisites

This project uses Docker Compose to run the backend, frontend, and database services together.

Before running any commands below, please ensure that [Docker](https://docs.docker.com/get-docker/) and Docker Compose are installed and the Docker daemon is running on your machine.

---

### Run the full app with Docker Compose

From the project root, run: ```docker-compose up --build```

This will start three services:

- Go backend API on port 8080
- React frontend on port 5173
- The MySQL database runs inside the Docker network and is configured automatically

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
