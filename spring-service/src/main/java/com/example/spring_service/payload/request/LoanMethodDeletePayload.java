package com.example.spring_service.payload.request;

public class LoanMethodDeletePayload {
    private Integer id;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public LoanMethodDeletePayload() {
    }

    public LoanMethodDeletePayload(Integer id) {
        this.id = id;
    }

}
