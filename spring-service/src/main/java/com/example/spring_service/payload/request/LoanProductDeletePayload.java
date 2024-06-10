package com.example.spring_service.payload.request;

public class LoanProductDeletePayload {
    private Integer id;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public LoanProductDeletePayload() {
    }

    public LoanProductDeletePayload(Integer id) {
        this.id = id;
    }

}
