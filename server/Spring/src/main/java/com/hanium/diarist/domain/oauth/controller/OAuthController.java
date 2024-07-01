package com.hanium.diarist.domain.oauth.controller;

import com.hanium.diarist.common.response.SuccessResponse;
import com.hanium.diarist.domain.oauth.dto.ResponseJwtToken;
import com.hanium.diarist.domain.oauth.service.KakaoOauthService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/oauth2")
public class OAuthController {

    private final KakaoOauthService kakaoOauthService;

    @GetMapping("/kakao/login")
    public ResponseEntity<SuccessResponse<ResponseJwtToken>> kakaoCallback(@RequestParam String code) {
//        System.out.println(code);
        return SuccessResponse.of(kakaoOauthService.login(code)).asHttp(HttpStatus.OK);
    }


}
