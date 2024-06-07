package com.example.spring_service.controllers;

// import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

// @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/express")
public class ExpressController {
    // @Value("${EXPRESS_SERVICE_URL}")
    private String expressServiceUrl = "http://express-service:3000/api/v1";

    private final RestTemplate restTemplate;

    public ExpressController(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @GetMapping("/customers")
    public ResponseEntity<String> getCustomers() {
        String url = expressServiceUrl + "/customer/all";
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        return response;
    }
}
