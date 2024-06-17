package com.example.spring_service.controllers;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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

import com.example.spring_service.models.EExpressApiUrl;
import com.example.spring_service.models.User;
import com.example.spring_service.models.UserActivity;
import com.example.spring_service.payload.request.LoanMethodCreatePayload;
import com.example.spring_service.payload.request.LoanMethodDeletePayload;
import com.example.spring_service.payload.request.LoanMethodEditPayload;
import com.example.spring_service.payload.request.LoanProductCreatePayload;
import com.example.spring_service.payload.request.LoanProductDeletePayload;
import com.example.spring_service.payload.request.LoanProductEditPayload;
import com.example.spring_service.payload.request.LoanTypeCreatePayload;
import com.example.spring_service.payload.request.LoanTypeDeletePayload;
import com.example.spring_service.payload.request.LoanTypeEditPayload;
import com.example.spring_service.repository.UserActivityRepository;
import com.example.spring_service.repository.UserRepository;
import com.example.spring_service.security.services.UserDetailsImpl;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/express")
public class ExpressController {
    @Value("${shounoop.app.expressServiceUrl}")
    private String expressServiceUrl;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserActivityRepository userActivityRepository;

    private final RestTemplate restTemplate;

    public ExpressController(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @GetMapping("/loan-methods")
    public ResponseEntity<?> getLoanMethods() {
        String url = expressServiceUrl + EExpressApiUrl.GET_LOAN_METHODS;
        ResponseEntity<?> response = restTemplate.getForEntity(url, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            saveUserActivity("Viewed loan methods");
        }

        return response;
    }

    @GetMapping("/loan-methods/{id}")
    public ResponseEntity<?> getLoanMethodById(@PathVariable("id") Integer id) {
        if (id == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        String url = expressServiceUrl + EExpressApiUrl.GET_LOAN_METHOD_BY_ID + "?id=" + id;
        ResponseEntity<?> response = restTemplate.getForEntity(url, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            saveUserActivity("Viewed a loan method");
        }

        return response;
    }

    @PostMapping("/loan-methods")
    public ResponseEntity<?> createLoanMethod(@RequestBody LoanMethodCreatePayload payload) {
        String url = expressServiceUrl + EExpressApiUrl.CREATE_LOAN_METHOD;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<LoanMethodCreatePayload> requestEntity = new HttpEntity<>(payload, headers);

        ResponseEntity<?> response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            saveUserActivity("Created a loan method");
        }

        return response;
    }

    @PutMapping("/loan-methods")
    public ResponseEntity<?> editLoanMethod(@RequestBody LoanMethodEditPayload payload) {
        String url = expressServiceUrl + EExpressApiUrl.EDIT_LOAN_METHOD;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<LoanMethodEditPayload> requestEntity = new HttpEntity<>(payload, headers);

        ResponseEntity<?> response = restTemplate.exchange(url, HttpMethod.PUT, requestEntity, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            saveUserActivity("Edited a loan method");
        }

        return response;
    }

    @DeleteMapping("/loan-methods/{id}")
    public ResponseEntity<?> deleteLoanMethod(@PathVariable("id") Integer id) {
        String url = expressServiceUrl + EExpressApiUrl.DELETE_LOAN_METHOD;

        LoanMethodDeletePayload payload = new LoanMethodDeletePayload(id);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<LoanMethodDeletePayload> requestEntity = new HttpEntity<>(payload, headers);

        ResponseEntity<?> response = restTemplate.exchange(url, HttpMethod.DELETE, requestEntity, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            saveUserActivity("Deleted a loan method");
        }

        return response;

    }

    @GetMapping("/loan-types")
    public ResponseEntity<?> getLoanTypes() {
        String url = expressServiceUrl + EExpressApiUrl.GET_LOAN_TYPES;
        ResponseEntity<?> response = restTemplate.getForEntity(url, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            saveUserActivity("Viewed loan types");
        }

        return response;
    }

    @GetMapping("/loan-types/{id}")
    public ResponseEntity<?> getLoanTypeById(@PathVariable("id") Integer id) {
        if (id == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        String url = expressServiceUrl + EExpressApiUrl.GET_LOAN_TYPE_BY_ID + "?id=" + id;
        ResponseEntity<?> response = restTemplate.getForEntity(url, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            saveUserActivity("Viewed a loan type");
        }

        return response;
    }

    @PostMapping("/loan-types")
    public ResponseEntity<?> createLoanType(@RequestBody LoanTypeCreatePayload payload) {
        String url = expressServiceUrl + EExpressApiUrl.CREATE_LOAN_TYPE;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<LoanTypeCreatePayload> requestEntity = new HttpEntity<>(payload, headers);

        ResponseEntity<?> response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            saveUserActivity("Created a loan type");
        }

        return response;
    }

    @PutMapping("/loan-types")
    public ResponseEntity<?> editLoanType(@RequestBody LoanTypeEditPayload payload) {
        String url = expressServiceUrl + EExpressApiUrl.EDIT_LOAN_TYPE;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<LoanTypeEditPayload> requestEntity = new HttpEntity<>(payload, headers);

        ResponseEntity<?> response = restTemplate.exchange(url, HttpMethod.PUT, requestEntity, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            saveUserActivity("Edited a loan type");
        }

        return response;
    }

    @DeleteMapping("/loan-types/{id}")
    public ResponseEntity<?> deleteLoanType(@PathVariable("id") Integer id) {
        String url = expressServiceUrl + EExpressApiUrl.DELETE_LOAN_TYPE;

        LoanTypeDeletePayload payload = new LoanTypeDeletePayload(id);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<LoanTypeDeletePayload> requestEntity = new HttpEntity<>(payload, headers);

        ResponseEntity<?> response = restTemplate.exchange(url, HttpMethod.DELETE, requestEntity, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            saveUserActivity("Deleted a loan type");
        }

        return response;
    }

    @GetMapping("/loan-products")
    public ResponseEntity<?> getLoanProducts() {
        String url = expressServiceUrl + EExpressApiUrl.GET_LOAN_PRODUCTS;
        ResponseEntity<?> response = restTemplate.getForEntity(url, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            saveUserActivity("Viewed loan products");
        }

        return response;
    }

    @GetMapping("/loan-products/{id}")
    public ResponseEntity<?> getLoanProductById(@PathVariable("id") Integer id) {
        if (id == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        String url = expressServiceUrl + EExpressApiUrl.GET_LOAN_PRODUCT_BY_ID + "?id=" + id;
        ResponseEntity<?> response = restTemplate.getForEntity(url, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            saveUserActivity("Viewed a loan product");
        }

        return response;
    }

    @PostMapping("/loan-products")
    public ResponseEntity<?> createLoanProduct(@RequestBody LoanProductCreatePayload payload) {
        String url = expressServiceUrl + EExpressApiUrl.CREATE_LOAN_PRODUCT;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<LoanProductCreatePayload> requestEntity = new HttpEntity<>(payload, headers);

        ResponseEntity<?> response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            saveUserActivity("Created a loan product");
        }

        return response;
    }

    @PutMapping("/loan-products")
    public ResponseEntity<?> editLoanProduct(@RequestBody LoanProductEditPayload payload) {
        String url = expressServiceUrl + EExpressApiUrl.EDIT_LOAN_PRODUCT;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<LoanProductEditPayload> requestEntity = new HttpEntity<>(payload, headers);

        ResponseEntity<?> response = restTemplate.exchange(url, HttpMethod.PUT, requestEntity, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            saveUserActivity("Edited a loan product");
        }

        return response;
    }

    @DeleteMapping("/loan-products/{id}")
    public ResponseEntity<?> deleteLoanProduct(@PathVariable("id") Integer id) {
        String url = expressServiceUrl + EExpressApiUrl.DELETE_LOAN_PRODUCT;

        LoanProductDeletePayload payload = new LoanProductDeletePayload(id);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<LoanProductDeletePayload> requestEntity = new HttpEntity<>(payload, headers);

        ResponseEntity<?> response = restTemplate.exchange(url, HttpMethod.DELETE, requestEntity, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            saveUserActivity("Deleted a loan product");
        }

        return response;
    }

    @GetMapping("/customers")
    public ResponseEntity<?> getCustomers() {
        String url = expressServiceUrl + EExpressApiUrl.GET_CUSTOMERS;
        ResponseEntity<?> response = restTemplate.getForEntity(url, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            saveUserActivity("Viewed customers");
        }

        return response;
    }

    @GetMapping("/customers/{id}")
    public ResponseEntity<?> getCustomerById(@PathVariable("id") Integer id) {
        if (id == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        String url = expressServiceUrl + EExpressApiUrl.GET_CUSTOMER_BY_ID + "/" + id;
        ResponseEntity<?> response = restTemplate.getForEntity(url, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            saveUserActivity("Viewed a customer");
        }

        return response;
    }

    @PostMapping("/customers")
    // @RequestBody String (String payload can be used if the payload is a object)
    public ResponseEntity<?> createCustomer(@RequestBody String payload) {
        String url = expressServiceUrl + EExpressApiUrl.CREATE_CUSTOMER;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> requestEntity = new HttpEntity<>(payload, headers);

        ResponseEntity<?> response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            saveUserActivity("Created a customer");
        }

        return response;
    }

    @PostMapping("/customers/{id}")
    public ResponseEntity<?> editCustomer(@PathVariable("id") Integer id, @RequestBody String payload) {
        String url = expressServiceUrl + EExpressApiUrl.EDIT_CUSTOMER + "/" + id;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> requestEntity = new HttpEntity<>(payload, headers);

        ResponseEntity<?> response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            saveUserActivity("Edited a customer");
        }

        return response;
    }

    @DeleteMapping("/customers/{id}")
    public ResponseEntity<?> deleteCustomer(@PathVariable("id") Integer id) {
        String url = expressServiceUrl + EExpressApiUrl.DELETE_CUSTOMER + "/" + id;

        ResponseEntity<?> response = restTemplate.exchange(url, HttpMethod.DELETE, null, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            saveUserActivity("Deleted a customer");
        }

        return response;
    }

    @GetMapping("/loan-applications")
    public ResponseEntity<?> getLoanApplications() {
        String url = expressServiceUrl + EExpressApiUrl.GET_LOAN_APPLICATIONS;
        ResponseEntity<?> response = restTemplate.getForEntity(url, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            saveUserActivity("Viewed loan applications");
        }

        return response;
    }

    @GetMapping("/loan-applications/{id}")
    public ResponseEntity<?> getLoanApplicationById(@PathVariable("id") Integer id) {
        if (id == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        String url = expressServiceUrl + EExpressApiUrl.GET_LOAN_APPLICATION_BY_ID + "/" + id;
        ResponseEntity<?> response = restTemplate.getForEntity(url, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            saveUserActivity("Viewed a loan application");
        }

        return response;
    }

    @GetMapping("/loan-applications/customer/{id}")
    public ResponseEntity<?> getLoanApplicationByCustomerId(@PathVariable("id") Integer id) {
        if (id == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        String url = expressServiceUrl + EExpressApiUrl.GET_LOAN_APPLICATION_BY_CUSTOMER_ID + "/" + id;
        ResponseEntity<?> response = restTemplate.getForEntity(url, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            saveUserActivity("Viewed a loan application");
        }

        return response;
    }

    @PostMapping("/loan-applications")
    public ResponseEntity<?> createLoanApplication(@RequestBody String payload) {
        String url = expressServiceUrl + EExpressApiUrl.CREATE_LOAN_APPLICATION;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> requestEntity = new HttpEntity<>(payload, headers);

        ResponseEntity<?> response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            saveUserActivity("Created a loan application");
        }

        return response;
    }

    @PutMapping("/loan-applications/{id}")
    public ResponseEntity<?> editLoanApplication(@PathVariable("id") Integer id, @RequestBody String payload) {
        String url = expressServiceUrl + EExpressApiUrl.EDIT_LOAN_APPLICATION + "/" + id;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> requestEntity = new HttpEntity<>(payload, headers);

        ResponseEntity<?> response = restTemplate.exchange(url, HttpMethod.PUT, requestEntity, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            saveUserActivity("Edited a loan application");
        }

        return response;
    }

    @DeleteMapping("/loan-applications/{id}")
    public ResponseEntity<?> deleteLoanApplication(@PathVariable("id") Integer id) {
        String url = expressServiceUrl + EExpressApiUrl.DELETE_LOAN_APPLICATION + "/" + id;

        ResponseEntity<?> response = restTemplate.exchange(url, HttpMethod.DELETE, null, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            saveUserActivity("Deleted a loan application");
        }

        return response;
    }

    @PostMapping("/generate-pdf")
    public ResponseEntity<?> generatePdf(@RequestBody String payload) {
        String url = expressServiceUrl + EExpressApiUrl.GENERATE_PDF;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> requestEntity = new HttpEntity<>(payload, headers);

        ResponseEntity<?> response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            saveUserActivity("Generated a PDF");
        }

        return response;
    }

    @PostMapping("/send-email")
    public ResponseEntity<?> sendEmail(@RequestBody String payload) {
        String url = expressServiceUrl + EExpressApiUrl.SEND_EMAIL;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> requestEntity = new HttpEntity<>(payload, headers);

        ResponseEntity<?> response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            saveUserActivity("Sent an email");
        }

        return response;
    }

    @GetMapping("/documents/all/{id}")
    public ResponseEntity<?> getDocumentById(@PathVariable("id") Integer id) {
        if (id == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        String url = expressServiceUrl + EExpressApiUrl.GET_DOCUMENT_BY_ID + "/" + id;

        ResponseEntity<?> response = restTemplate.getForEntity(url, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            saveUserActivity("Viewed a document");
        }

        return response;
    }

    @DeleteMapping("/documents/{id}/{filename}")
    public ResponseEntity<?> deleteDocument(@PathVariable("id") Integer id, @PathVariable("filename") String filename) {

        String url = expressServiceUrl + EExpressApiUrl.DELETE_FILE + "?id=" + id + "&filename="
                + filename;

        ResponseEntity<?> response = restTemplate.exchange(url, HttpMethod.DELETE, null, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            saveUserActivity("Deleted a document");
        }

        return response;
    }

    // upload with form-data
    @PostMapping("/documents/{id}")
    public ResponseEntity<?> uploadFiles(@PathVariable("id") Integer id, @RequestBody String payload) {
        String url = expressServiceUrl + EExpressApiUrl.UPLOAD_FILES + "/" + id;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> requestEntity = new HttpEntity<>(payload, headers);

        ResponseEntity<?> response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            saveUserActivity("Uploaded a document");
        }

        return response;
    }

    @GetMapping("/documents/{filename}")
    public ResponseEntity<?> downloadFile(@PathVariable("filename") String filename) {
        String url = expressServiceUrl + EExpressApiUrl.DOWNLOAD_FILES + "?filename=" + filename;

        ResponseEntity<?> response = restTemplate.getForEntity(url, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            saveUserActivity("Downloaded a document");
        }

        return response;
    }

    private void saveUserActivity(String activityDescription) {
        User currentUser = getCurrentUser();

        // Create UserActivity
        UserActivity userActivity = new UserActivity();
        userActivity.setActivityDescription(activityDescription);
        userActivity.setTimestamp(LocalDateTime.now());
        userActivity.setUser(currentUser);

        // Save UserActivity
        userActivityRepository.save(userActivity);
    }

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return userRepository.findById(userDetails.getId()).orElseThrow(
                () -> new RuntimeException("Error: User is not found."));
    }
}
