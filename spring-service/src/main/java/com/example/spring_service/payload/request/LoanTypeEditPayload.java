package com.example.spring_service.payload.request;

import lombok.Data;

@Data
public class LoanTypeEditPayload {
    private Integer loan_type_id;
    private String loan_type_name;
    private String loan_type_desc;
    private String interest_rate;
    private String late_interest_fee;
    private String prepay_interest_fee;
}
