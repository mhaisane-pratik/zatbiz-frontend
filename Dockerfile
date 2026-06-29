# --- BUILD STAGE ---
FROM maven:3.8.8-eclipse-temurin-17 AS build
WORKDIR /app

# Copy the Spring Boot directory structure
COPY ZATBIZ/primezat-builder-demo /app

# Build the jar file (skipping test compilation to accelerate deployment)
RUN mvn clean package -DskipTests

# --- RUN STAGE ---
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

# Copy the built executable jar from the build environment
COPY --from=build /app/target/*.jar app.jar

# Render exposes PORT env var; mapping it for Spring Boot server port
ENV PORT=8080
EXPOSE 8080

ENTRYPOINT ["java", "-Dserver.port=${PORT}", "-jar", "app.jar"]
