FROM openjdk:21
VOLUME /tmp
COPY target/spring-service-0.0.1-SNAPSHOT.jar spring-service.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/spring-service.jar"]
