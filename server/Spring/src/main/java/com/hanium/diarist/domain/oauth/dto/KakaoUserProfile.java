package com.hanium.diarist.domain.oauth.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class KakaoUserProfile {

    private Properties properties;
    private KakaoAccount kakao_account;

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Properties {
        private String nickname;
        private String profile_image;
        private String thumbnail_image;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class KakaoAccount {
        private boolean has_email;
        private boolean email_needs_agreement;
        private boolean is_email_valid;
        private boolean is_email_verified;
        private String email;
    }



}
