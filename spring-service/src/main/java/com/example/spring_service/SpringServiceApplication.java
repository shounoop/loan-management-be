package com.example.spring_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class SpringServiceApplication {
	public static void main(String[] args) {
		SpringApplication.run(SpringServiceApplication.class, args);
	}
}

@RestController
class HelloController {
	@GetMapping("/api/hello")
	public String sayHello() {
		return "Hello from Spring Boot!";
	}
}
