@echo off

echo Current directory: %CD%
echo Environment variables:
set | findstr DOCKER

REM Check if .env file exists
if not exist .env (
    echo Error: .env file not found!
    echo Please create a .env file with your environment variables.
    exit /b 1
)

REM Load environment variables from .env file
for /f "tokens=1,2 delims==" %%a in (.env) do (
    if "%%a"=="DOCKER_USERNAME" set DOCKER_USERNAME=%%b
    if "%%a"=="DOCKER_APP_NAME" set DOCKER_APP_NAME=%%b
)

REM Check if required environment variables are set
if "%DOCKER_USERNAME%"=="" (
    echo Error: DOCKER_USERNAME not set in .env file
    exit /b 1
)
if "%DOCKER_APP_NAME%"=="" (
    echo Error: DOCKER_APP_NAME not set in .env file
    exit /b 1
)

echo Running tests and building the application...
cd server
echo Current directory after cd: %CD%
call mvn clean package -P test
if %ERRORLEVEL% neq 0 (
    echo Maven build failed
    exit /b %ERRORLEVEL%
)
cd ..

echo.
echo Building Docker image...
echo Docker build command: docker build -t %DOCKER_USERNAME%/%DOCKER_APP_NAME%:latest ./server/.
docker build -t %DOCKER_USERNAME%/%DOCKER_APP_NAME%:latest ./server/.
if %ERRORLEVEL% neq 0 (
    echo Docker build failed
    exit /b %ERRORLEVEL%
)

echo.
echo Pushing image to Docker Hub...
docker login
if %ERRORLEVEL% neq 0 (
    echo Docker login failed
    exit /b %ERRORLEVEL%
)

docker push %DOCKER_USERNAME%/%DOCKER_APP_NAME%:latest
if %ERRORLEVEL% neq 0 (
    echo Docker push failed
    exit /b %ERRORLEVEL%
)

echo.
echo Starting the application...
docker-compose up --remove-orphans
if %ERRORLEVEL% neq 0 (
    echo Docker compose failed
    exit /b %ERRORLEVEL%
) 