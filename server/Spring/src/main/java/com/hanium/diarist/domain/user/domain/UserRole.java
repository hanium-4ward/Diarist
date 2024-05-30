package com.hanium.diarist.domain.user.domain;

public enum UserRole {
    USER("ROLE_USER"), ADMIN("ROLE_ADMIN");
    private String role;

    UserRole(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }
}
