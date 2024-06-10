package com.example.spring_service.payload.request;

public class LoanTypeEditPayload {
    private String loan_type_name;
    private String loan_type_desc;
    private Integer loan_type_id;

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

    public Integer getLoan_type_id() {
        return loan_type_id;
    }

    public void setLoan_type_id(Integer loan_type_id) {
        this.loan_type_id = loan_type_id;
    }

}
