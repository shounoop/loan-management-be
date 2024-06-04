# # Build Stage 
# FROM maven:3.9.6-sapmachine AS build 
# COPY src /home/app/src 
# COPY pom.xml /home/app 
# RUN mvn -f /home/app/pom.xml clean package 

# # Execution Stage 
# FROM openjdk:21 
# COPY --from=build /home/app/target/spring-service-0.0.1-SNAPSHOT.jar /usr/local/lib/demo.jar 
# EXPOSE 8080 
# ENTRYPOINT ["java","-jar","/usr/local/lib/demo.jar"]

# FROM maven:3.8.5-openjdk-17 # for Java 17
# FROM maven:3.8.2-jdk-8
FROM maven:3.8-openjdk-17

WORKDIR /spring-service
COPY . .
RUN mvn clean install

CMD mvn spring-boot:run