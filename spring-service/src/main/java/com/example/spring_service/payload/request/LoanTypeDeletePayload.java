package com.example.spring_service.payload.request;

public class LoanTypeDeletePayload {
    private Integer id;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public LoanTypeDeletePayload() {
    }

    public LoanTypeDeletePayload(Integer id) {
        this.id = id;
    }

}
