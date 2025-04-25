#!/bin/bash

# Enable debugging
set -x

echo "Current directory: $(pwd)"
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
if [ -z "$DOCKER_USERNAME" ]; then
    echo "Error: DOCKER_USERNAME not set in .env file"
    exit 1
fi

if [ -z "$DOCKER_APP_NAME" ]; then
    echo "Error: DOCKER_APP_NAME not set in .env file"
    exit 1
fi

echo "Running tests and building the application..."
cd server
echo "Current directory after cd: $(pwd)"
mvn clean package -P test
if [ $? -ne 0 ]; then
    echo "Maven build failed"
    exit $?
fi
cd ..

echo -e "\nBuilding Docker image..."
echo "Docker build command: docker build -t $DOCKER_USERNAME/$DOCKER_APP_NAME:latest ./server/."
docker build -t $DOCKER_USERNAME/$DOCKER_APP_NAME:latest ./server/.
if [ $? -ne 0 ]; then
    echo "Docker build failed"
    exit $?
fi

echo -e "\nPushing image to Docker Hub..."
docker login
if [ $? -ne 0 ]; then
    echo "Docker login failed"
    exit $?
fi

docker push $DOCKER_USERNAME/$DOCKER_APP_NAME:latest
if [ $? -ne 0 ]; then
    echo "Docker push failed"
    exit $?
fi

echo -e "\nStarting the application..."
docker-compose up --remove-orphans
if [ $? -ne 0 ]; then
    echo "Docker compose failed"
    exit $?
fi 