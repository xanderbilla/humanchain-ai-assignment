#!/bin/bash

# Check if .env file exists
if [ ! -f .env ]; then
    echo "Error: .env file not found!"
    echo "Please create a .env file with your environment variables."
    exit 1
fi

# Load environment variables from .env file
export $(grep -v '^#' .env | xargs)

# Check if required environment variables are set
if [ -z "$DOCKER_USERNAME" ]; then
    echo "Error: DOCKER_USERNAME not set in .env file"
    exit 1
fi

if [ -z "$DOCKER_APP_NAME" ]; then
    echo "Error: DOCKER_APP_NAME not set in .env file"
    exit 1
fi

echo "Building Docker image..."
docker build -t $DOCKER_USERNAME/$DOCKER_APP_NAME:latest .
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