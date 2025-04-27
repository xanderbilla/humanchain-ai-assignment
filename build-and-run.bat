@echo off

REM Store the original directory
set ORIGINAL_DIR=%CD%
echo Original directory: %ORIGINAL_DIR%

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
    if "%%a"=="DOCKER_CLIENT_APP_NAME" set DOCKER_CLIENT_APP_NAME=%%b
    if "%%a"=="DOCKER_SERVER_APP_NAME" set DOCKER_SERVER_APP_NAME=%%b
    if "%%a"=="CORS_ALLOWED_ORIGINS" set CORS_ALLOWED_ORIGINS=%%b
)

REM Check if required environment variables are set
if "%DOCKER_USERNAME%"=="" (
    echo Error: DOCKER_USERNAME not set in .env file
    exit /b 1
)
if "%DOCKER_CLIENT_APP_NAME%"=="" (
    echo Error: DOCKER_CLIENT_APP_NAME not set in .env file
    exit /b 1
)
if "%DOCKER_SERVER_APP_NAME%"=="" (
    echo Error: DOCKER_SERVER_APP_NAME not set in .env file
    exit /b 1
)
if "%CORS_ALLOWED_ORIGINS%"=="" (
    echo Error: CORS_ALLOWED_ORIGINS not set in .env file
    exit /b 1
)

echo.
echo Building Server Docker image...
echo Docker build command: docker build -t %DOCKER_USERNAME%/%DOCKER_SERVER_APP_NAME%:latest ./server/.
docker build -t %DOCKER_USERNAME%/%DOCKER_SERVER_APP_NAME%:latest ./server/.
if %ERRORLEVEL% neq 0 (
    echo Server Docker build failed
    exit /b %ERRORLEVEL%
)

echo.
echo Building Client Docker image...
echo Docker build command: docker build -t %DOCKER_USERNAME%/%DOCKER_CLIENT_APP_NAME%:latest ./ui/.
docker build -t %DOCKER_USERNAME%/%DOCKER_CLIENT_APP_NAME%:latest ./ui/.
if %ERRORLEVEL% neq 0 (
    echo Client Docker build failed
    exit /b %ERRORLEVEL%
)

echo.
echo Pushing images to Docker Hub...
docker login
if %ERRORLEVEL% neq 0 (
    echo Docker login failed
    exit /b %ERRORLEVEL%
)

docker push %DOCKER_USERNAME%/%DOCKER_SERVER_APP_NAME%:latest
if %ERRORLEVEL% neq 0 (
    echo Server Docker push failed
    exit /b %ERRORLEVEL%
)

docker push %DOCKER_USERNAME%/%DOCKER_CLIENT_APP_NAME%:latest
if %ERRORLEVEL% neq 0 (
    echo Client Docker push failed
    exit /b %ERRORLEVEL%
)

echo.
echo Starting the application in detached mode...
docker-compose up -d --remove-orphans
if %ERRORLEVEL% neq 0 (
    echo Docker compose failed
    exit /b %ERRORLEVEL%
)

echo Application is running in the background. Press Ctrl+C to stop.
:loop
timeout /t 1 /nobreak >nul
goto loop 