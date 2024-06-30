package com.hanium.diarist.domain.oauth.controller;

import com.hanium.diarist.domain.oauth.service.KakaoOauthService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class OAuthController {

    private final KakaoOauthService kakaoOauthService;

    @GetMapping("/login/oauth/code")
    public void kakaoCallback(@RequestParam String code) {
        System.out.println(code);
        kakaoOauthService.login(code);


    }


}
