# AI Safety Incident Log API

A RESTful API service for logging and managing AI safety incidents, developed as part of HumanChain AI's backend intern take-home assignment.

## Project Overview

This project implements a backend service to log and manage hypothetical AI safety incidents. It's built using:

- **Language**: Java
- **Framework**: Spring Boot
- **Database**: MongoDB
- **API Style**: RESTful

## Project Structure

```
src/main/java/com/humanchain/logs/
├── config/         # Configuration classes
├── controller/     # REST API endpoints
├── dto/           # Data Transfer Objects
├── model/         # Domain models
├── repository/    # Data access layer
├── service/       # Business logic
├── serializer/    # Custom serialization
└── validation/    # Input validation
```

## Prerequisites

- Java 17 or higher
- Maven
- Docker and Docker Compose
- MongoDB (will be started via Docker)

## Setup and Installation

1. **Clone the repository**

   ```bash
   git clone humanchain-ai-assignment
   cd humanchain-ai-assignment
   ```

2. **Create environment file**
   Create a `.env` file in the root directory with the following content:

   ```
    MONGODB_URI=mongodb+srv://....
    DOCKER_USERNAME=your-dockerhub-username
    DOCKER_APP_NAME=log-server-app
    CORS_ALLOWED_ORIGINS=http://localhost:3000
    APP_PORT=port-on-which-you-want-to-access-app
   ```

3. **Build and Run**

   ```bash
   # On Windows
   build-and-run.bat

   # On Linux/Mac
   ./build-and-run.sh
   ```

The application will be available at `http://localhost:APP_PORT`

## API Reference

#### Get all incidents

```http
  GET /api/v1/incidents
```

| Parameter | Type   | Description            |
| :-------- | :----- | :--------------------- |
| `none`    | `none` | No parameters required |

#### Get incident by ID

```http
  GET /api/v1/incidents/${id}
```

| Parameter | Type     | Description                                             |
| :-------- | :------- | :------------------------------------------------------ |
| `id`      | `string` | **Required**. MongoDB ObjectId of the incident to fetch |

#### Create incident

```http
  POST /api/v1/incidents
```

| Parameter     | Type     | Description                                        |
| :------------ | :------- | :------------------------------------------------- |
| `title`       | `string` | **Required**. Short summary of the incident        |
| `description` | `string` | **Required**. Detailed description of the incident |
| `severity`    | `string` | **Required**. Severity level (Low, Medium, High)   |

#### Delete incident

```http
  DELETE /api/v1/incidents/${id}
```

| Parameter | Type     | Description                                              |
| :-------- | :------- | :------------------------------------------------------- |
| `id`      | `string` | **Required**. MongoDB ObjectId of the incident to delete |

## Error Handling

The API implements comprehensive error handling for:

- Invalid input data
- Resource not found
- Server errors
- Validation errors

Error responses follow this format:

```json
{
  "timestamp": "2024-04-24T12:00:00Z",
  "status": 400,
  "error": "Bad Request",
  "message": "Detailed error message",
  "path": "/api/v1/incidents"
}
```

## Database Schema

The MongoDB collection `incidents` uses the following schema:

```json
{
  "id": "String",
  "title": "String",
  "description": "String",
  "severity": "String",
  "reportedAt": "DateTime"
}
```

## Design Decisions

1. **Technology Stack**:

   - Spring Boot for robust backend development
   - MongoDB for flexible document storage
   - Docker for containerization and easy deployment

2. **API Design**:

   - RESTful principles
   - Versioned API endpoints (/api/v1/)
   - Consistent error handling
   - Input validation

3. **Security**:
   - Environment-based configuration
   - Input sanitization
   - Proper error handling

## Development

### Running Tests

```bash
mvn test
```

### Building Locally

```bash
mvn clean package
```

### Running with Docker

```bash
docker-compose up
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is proprietary and confidential. It was developed as part of HumanChain AI's backend intern take-home assignment. While the implementation was created by the developer, the assignment requirements and specifications remain the property of HumanChain AI.

**IMPORTANT**: This code and its associated documentation are subject to the terms of the assignment. Unauthorized copying, distribution, or use of this project without explicit written permission from HumanChain AI is strictly prohibited.

For detailed terms and conditions, please refer to the [LICENSE](LICENSE) file.

## Contact

For any questions or concerns regarding the use of this project, please contact the HumanChain AI team.
