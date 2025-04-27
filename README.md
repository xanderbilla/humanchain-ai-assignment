# AI Safety Incident Log System

A project for logging and managing AI safety incidents, built as part of HumanChain AI’s backend intern assignment.

## ✨ About the Project

This project brings together a simple but powerful system for tracking AI safety incidents.  
It’s made up of:

- A **Spring Boot** backend (Java 17) for handling APIs
- A **Next.js** frontend for a clean, minimal interface (to test backend)
- **MongoDB** to store and manage incident data
- **Docker** and **Docker Compose** to run everything smoothly together

It’s fully containerized, quick to set up, and easy to extend.

## 📁 Folder Structure

```
humanchain-ai-assignment/
├── server/              # Backend - Spring Boot app
├── client/              # Frontend - Next.js app (Shadcn UI)
├── .env                 # Environment variables
├── .gitignore
├── .gitattributes
├── build-and-run.bat    # Windows quick start script
├── build-and-run.sh     # Linux/Mac quick start script
├── docker-compose.yml   # Docker orchestration
├── LICENSE
└── README.md            # You're here :)
```

## 🛠️ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/xanderbilla/humanchain-ai-assignment
cd humanchain-ai-assignment
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory with the following keys:

```
DOCKER_USERNAME=your-dockerhub-username
DOCKER_CLIENT_APP_NAME=logs-client
DOCKER_SERVER_APP_NAME=logs-server
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

## 🚀 Running Everything

The easiest way:

```bash
# Windows
build-and-run.bat

# Linux/Mac
./build-and-run.sh
```

Or manually if you prefer:

```bash
docker-compose up --build
```

## 🌐 Access Points

- Backend API → [http://localhost:SERVER_PORT](http://localhost:SERVER_PORT)
- Frontend Client → [http://localhost:CLIENT_PORT](http://localhost:CLIENT_PORT)

## 📡 Backend API Overview

| Method | Endpoint                 | Description               |
| :----: | :----------------------- | :------------------------ |
|  GET   | `/api/v1/incidents`      | Fetch all incidents       |
|  GET   | `/api/v1/incidents/{id}` | Fetch a specific incident |
|  POST  | `/api/v1/incidents`      | Create a new incident     |
| DELETE | `/api/v1/incidents/{id}` | Delete an incident        |

### 📋 Quick Example: Creating an Incident

```http
POST /api/v1/incidents
Content-Type: application/json

{
  "title": "AI Model Misbehaving",
  "description": "Generated unsafe content without prompt.",
  "severity": "High"
}
```

### 🧹 Response Format

```json
{
  "success": true,
  "message": "Successfully retrieved all incidents",
  "data": [
    {
      "id": "680dc8e3759a9f060059df23",
      "title": "AI Model Performance Degradation",
      "description": "The sentiment analysis model is showing decreased accuracy in processing customer feedback",
      "severity": "LOW",
      "reportedAt": "2025-04-27T06:04:19.212"
    }
  ],
  "timestamp": "2025-04-27T06:04:22.514472877",
  "status": "SUCCESS"
}
```

```json
{
  "timestamp": "2024-04-24T12:00:00Z",
  "status": 400,
  "error": "Bad Request",
  "message": "Detailed explanation here",
  "path": "/api/v1/incidents"
}
```

### 🧹 Error Response Format

```json
{
  "timestamp": "2024-04-24T12:00:00Z",
  "status": 400,
  "error": "Bad Request",
  "message": "Detailed explanation here",
  "path": "/api/v1/incidents"
}
```

## 🖥️ Frontend (Next.js + Shadcn UI)

A small but clean UI to:

- View all incidents
- Create new incident reports
- (More features can be easily added!)

| Route        | What It Does                             |
| :----------- | :--------------------------------------- |
| `/`          | Homepage nand display server status      |
| `/incidents` | Lists all incidents and create incidents |

## 🛢️ MongoDB Schema

Each `incident` document looks like:

```json
{
  "id": "String",
  "title": "String",
  "description": "String",
  "severity": "Low | Medium | High",
  "reportedAt": "DateTime"
}
```

## 🛠️ Development Tips

### Backend

```bash
cd server/
mvn clean package
mvn test
```

### Frontend

```bash
cd client/
npm install
npm run dev
```

## 🔒 Security Practices

- Environment-based configuration (no hardcoding secrets)
- Input validation and sanitization
- Proper error handling
- CORS restrictions
- Dockerized for safe deployments

## 👨‍💻 Author

Made with care by  
[**Vikas Singh**](https://github.com/xanderbilla)

## 📜 License

This project is confidential and was built as part of an assignment for **HumanChain AI**.  
All rights related to assignment requirements and specifications are owned by HumanChain AI.  
Unauthorized copying or use without written permission is prohibited.

(Full terms in the [LICENSE](LICENSE) file.)
