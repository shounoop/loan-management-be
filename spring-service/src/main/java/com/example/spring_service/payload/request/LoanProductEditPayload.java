package com.example.spring_service.payload.request;

public class LoanProductEditPayload {
    private String loan_product_name;
    private Double interest_rate;
    private Integer minimum_amount;
    private Integer maximum_amount;
    private Integer minimum_term;
    private Integer maximum_term;
    private String repayment_schedule;
    private String eligibility_criteria;
    private String product_description;
    private String additional_notes;
    private Double late_fee;
    private String status;
    private Integer loan_product_id;

    public String getLoan_product_name() {
        return loan_product_name;
    }

    public void setLoan_product_name(String loan_product_name) {
        this.loan_product_name = loan_product_name;
    }

    public Double getInterest_rate() {
        return interest_rate;
    }

    public void setInterest_rate(Double interest_rate) {
        this.interest_rate = interest_rate;
    }

    public Integer getMinimum_amount() {
        return minimum_amount;
    }

    public void setMinimum_amount(Integer minimum_amount) {
        this.minimum_amount = minimum_amount;
    }

    public Integer getMaximum_amount() {
        return maximum_amount;
    }

    public void setMaximum_amount(Integer maximum_amount) {
        this.maximum_amount = maximum_amount;
    }

    public Integer getMinimum_term() {
        return minimum_term;
    }

    public void setMinimum_term(Integer minimum_term) {
        this.minimum_term = minimum_term;
    }

    public Integer getMaximum_term() {
        return maximum_term;
    }

    public void setMaximum_term(Integer maximum_term) {
        this.maximum_term = maximum_term;
    }

    public String getRepayment_schedule() {
        return repayment_schedule;
    }

    public void setRepayment_schedule(String repayment_schedule) {
        this.repayment_schedule = repayment_schedule;
    }

    public String getEligibility_criteria() {
        return eligibility_criteria;
    }

    public void setEligibility_criteria(String eligibility_criteria) {
        this.eligibility_criteria = eligibility_criteria;
    }

    public String getProduct_description() {
        return product_description;
    }

    public void setProduct_description(String product_description) {
        this.product_description = product_description;
    }

    public String getAdditional_notes() {
        return additional_notes;
    }

    public void setAdditional_notes(String additional_notes) {
        this.additional_notes = additional_notes;
    }

    public Double getLate_fee() {
        return late_fee;
    }

    public void setLate_fee(Double late_fee) {
        this.late_fee = late_fee;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getLoan_product_id() {
        return loan_product_id;
    }

    public void setLoan_product_id(Integer loan_product_id) {
        this.loan_product_id = loan_product_id;
    }
}
