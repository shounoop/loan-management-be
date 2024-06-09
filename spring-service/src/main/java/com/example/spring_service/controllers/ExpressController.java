package com.example.spring_service.controllers;

import com.example.spring_service.models.EExpressApiUrl;
import com.example.spring_service.payload.request.LoanMethodCreatePayload;
import com.example.spring_service.payload.request.LoanMethodDeletePayload;
import com.example.spring_service.payload.request.LoanMethodEditPayload;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.MediaType;

// @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/express")
public class ExpressController {
    @Value("${shounoop.app.expressServiceUrl}")
    private String expressServiceUrl;

    private final RestTemplate restTemplate;

    public ExpressController(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @GetMapping("/customers")
    public ResponseEntity<String> getCustomers() {
        String url = expressServiceUrl + EExpressApiUrl.GET_CUSTOMERS;
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        return response;
    }

    @GetMapping("/loan-methods")
    public ResponseEntity<String> getLoanMethods() {
        String url = expressServiceUrl + EExpressApiUrl.GET_LOAN_METHODS;
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        return response;
    }

    @GetMapping("/loan-methods/{id}")
    public ResponseEntity<String> getLoanMethodById(@PathVariable Long id) {
        if (id == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        String url = expressServiceUrl + EExpressApiUrl.GET_LOAN_METHOD_BY_ID + "?id=" + id;
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        return response;
    }

    @PostMapping("/loan-method")
    public ResponseEntity<String> createLoanMethod(@RequestBody LoanMethodCreatePayload payload) {
        String url = expressServiceUrl + EExpressApiUrl.CREATE_LOAN_METHOD;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<LoanMethodCreatePayload> requestEntity = new HttpEntity<>(payload, headers);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);

        return response;
    }

    @PutMapping("/loan-method")
    public ResponseEntity<String> editLoanMethod(@RequestBody LoanMethodEditPayload payload) {
        String url = expressServiceUrl + EExpressApiUrl.EDIT_LOAN_METHOD;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<LoanMethodEditPayload> requestEntity = new HttpEntity<>(payload, headers);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.PUT, requestEntity, String.class);

        return response;
    }

    @DeleteMapping("/loan-method/{id}")
    public ResponseEntity<String> deleteLoanMethod(@PathVariable("id") Integer id) {
        String url = expressServiceUrl + EExpressApiUrl.DELETE_LOAN_METHOD;

        LoanMethodDeletePayload payload = new LoanMethodDeletePayload(id);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<LoanMethodDeletePayload> requestEntity = new HttpEntity<>(payload, headers);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.DELETE, requestEntity, String.class);

        return response;
    }
}
