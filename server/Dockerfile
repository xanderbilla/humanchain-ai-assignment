# Use a smaller base image for runtime
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copy only the built JAR file
COPY target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]