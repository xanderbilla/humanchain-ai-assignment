# Stage 1: Build the application using Maven
FROM maven:3.8.4-openjdk-17-slim AS build

WORKDIR /app

# Copy only the files needed for dependency resolution first
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy source code
COPY src ./src

# Build the application with test profile
RUN mvn clean package -P test

# Stage 2: Run the application using OpenJDK
FROM openjdk:17-jdk-slim

WORKDIR /app

# Copy the built JAR from the build stage
COPY --from=build /app/target/*.jar app.jar

EXPOSE ${SERVER_PORT:-8080}

ENTRYPOINT ["java", "-jar", "app.jar"]