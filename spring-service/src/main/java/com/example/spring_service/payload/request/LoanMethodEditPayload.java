package com.example.spring_service.payload.request;

public class LoanMethodEditPayload {
    private String loan_method_name;
    private String loan_method_desc;
    private Integer loan_method_id;

    public String getLoan_method_name() {
        return loan_method_name;
    }

    public void setLoan_method_name(String loan_method_name) {
        this.loan_method_name = loan_method_name;
    }

    public String getLoan_method_desc() {
        return loan_method_desc;
    }

    public void setLoan_method_desc(String loan_method_desc) {
        this.loan_method_desc = loan_method_desc;
    }

    public Integer getLoan_method_id() {
        return loan_method_id;
    }

    public void setLoan_method_id(Integer loan_method_id) {
        this.loan_method_id = loan_method_id;
    }

}
