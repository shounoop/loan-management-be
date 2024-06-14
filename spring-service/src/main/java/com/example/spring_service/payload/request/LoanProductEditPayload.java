package com.example.spring_service.payload.request;

import lombok.Data;

@Data
public class LoanProductEditPayload {
    private String loan_product_name;
    private Long loan_method_id;
    private Long loan_type_id;
    private Long minimum_amount;
    private Long maximum_amount;
    private Long minimum_term;
    private Long maximum_term;
    private String repayment_schedule;
    private String eligibility_criteria;
    private String product_description;
    private String additional_notes;
    private Double late_fee;
    private String status;
    private Long loan_product_id;
}
