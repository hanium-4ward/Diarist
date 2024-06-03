package com.hanium.diarist.domain.diary.dto;

public class AdResponse {
    private boolean adRequired;

    public AdResponse(boolean adRequired) {
        this.adRequired = adRequired;
    }

    public boolean isAdRequired() {
        return adRequired;
    }
}
