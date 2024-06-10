package com.example.spring_service.payload.request;

public class LoanTypeCreatePayload {
    private String loan_type_name;
    private String loan_type_desc;

    public String getLoan_type_name() {
        return loan_type_name;
    }

    public void setLoan_type_name(String loan_type_name) {
        this.loan_type_name = loan_type_name;
    }

    public String getLoan_type_desc() {
        return loan_type_desc;
    }

    public void setLoan_type_desc(String loan_type_desc) {
        this.loan_type_desc = loan_type_desc;
    }

    public LoanTypeCreatePayload() {
    }

    public LoanTypeCreatePayload(String loan_type_name, String loan_type_desc) {
        this.loan_type_name = loan_type_name;
        this.loan_type_desc = loan_type_desc;
    }
}
