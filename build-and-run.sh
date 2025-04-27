#!/bin/bash

# Enable debugging
set -x

# Store the original directory
ORIGINAL_DIR=$(pwd)
echo "Original directory: $ORIGINAL_DIR"

# Function to clean up on exit
cleanup() {
    echo "Cleaning up..."
    cd "$ORIGINAL_DIR"
    echo "Stopping docker-compose..."
    docker-compose down
    exit 0
}

# Set up trap to ensure cleanup runs on script exit
trap cleanup SIGINT SIGTERM

echo "Environment variables:"
env | grep DOCKER

# Check if .env file exists
if [ ! -f .env ]; then
    echo "Error: .env file not found!"
    echo "Please create a .env file with your environment variables."
    exit 1
fi

# Clean up the .env file by removing Windows line endings and comments
TEMP_ENV=$(mktemp)
sed 's/\r$//' .env | grep -v '^#' | grep -v '^$' > "$TEMP_ENV"

# Load environment variables from the cleaned .env file
while IFS='=' read -r key value; do
    if [ -n "$key" ] && [ -n "$value" ]; then
        # Remove any remaining whitespace
        key=$(echo "$key" | tr -d '[:space:]')
        value=$(echo "$value" | tr -d '[:space:]')
        export "$key=$value"
    fi
done < "$TEMP_ENV"
rm "$TEMP_ENV"

# Check if required environment variables are set
required_vars=("DOCKER_USERNAME" "DOCKER_CLIENTAPP_NAME" "DOCKER_SERVER_APP_NAME" "MONGODB_URI" "CORS_ALLOWED_ORIGINS" "SERVER_PORT" "API_URL" "CLIENT_PORT")

for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        echo "Error: $var not set in .env file"
        exit 1
    fi
done

echo -e "\nBuilding Server Docker image..."
echo "Docker build command: docker build -t $DOCKER_USERNAME/$DOCKER_SERVER_APP_NAME:latest ./server/."
docker build -t $DOCKER_USERNAME/$DOCKER_SERVER_APP_NAME:latest ./server/.
if [ $? -ne 0 ]; then
    echo "Server Docker build failed"
    exit $?
fi

echo -e "\nBuilding Client Docker image..."
echo "Docker build command: docker build -t $DOCKER_USERNAME/$DOCKER_CLIENT_APP_NAME:latest ./client/."
docker build -t $DOCKER_USERNAME/$DOCKER_CLIENT_APP_NAME:latest ./client/.
if [ $? -ne 0 ]; then
    echo "Client Docker build failed"
    exit $?
fi

echo -e "\nPushing images to Docker Hub..."
docker login
if [ $? -ne 0 ]; then
    echo "Docker login failed"
    exit $?
fi

docker push $DOCKER_USERNAME/$DOCKER_SERVER_APP_NAME:latest
if [ $? -ne 0 ]; then
    echo "Server Docker push failed"
    exit $?
fi

docker push $DOCKER_USERNAME/$DOCKER_CLIENT_APP_NAME:latest
if [ $? -ne 0 ]; then
    echo "Client Docker push failed"
    exit $?
fi

echo -e "\nStarting the application in detached mode..."
docker-compose up -d --remove-orphans
if [ $? -ne 0 ]; then
    echo "Docker compose failed"
    exit $?
fi

echo "Application is running in the background. Press Ctrl+C to stop."
# Keep the script running and handle Ctrl+C
while true; do
    sleep 1
done 