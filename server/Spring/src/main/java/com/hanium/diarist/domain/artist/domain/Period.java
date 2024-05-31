package com.hanium.diarist.domain.artist.domain;

public enum Period {
    Renaissance("르네상스"),Modern("근대"),Contemporary("현대"),Asia("동양화");
    private String keyword;

    Period(String keyword) {
        this.keyword = keyword;
    }

    public String getKeyword() {
        return keyword;
    }
}
