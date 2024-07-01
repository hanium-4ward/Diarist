package com.hanium.diarist.domain.oauth.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.hanium.diarist.common.exception.BusinessException;
import com.hanium.diarist.common.exception.ErrorCode;
import com.hanium.diarist.common.security.jwt.JwtTokenProvider;
import com.hanium.diarist.domain.oauth.dto.KakaoUserProfile;
import com.hanium.diarist.domain.oauth.dto.ResponseJwtToken;
import com.hanium.diarist.domain.oauth.properties.KakaoProperties;
import com.hanium.diarist.domain.user.domain.SocialCode;
import com.hanium.diarist.domain.user.domain.User;
import com.hanium.diarist.domain.user.service.UserService;
import com.hanium.diarist.domain.user.service.ValidateUserService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;

@Service
@AllArgsConstructor
public class KakaoOauthService {

    private final KakaoProperties kakaoProperties;
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    private final ValidateUserService validateUserService;
    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;

    @Transactional
    public ResponseJwtToken login(String code) {
        String[] kakaoAccessToken = getKakaoAccessToken(code);
        String accessToken = kakaoAccessToken[0];
        String refreshToken = kakaoAccessToken[1];
        KakaoUserProfile userProfile = getUserProfile(accessToken);
//        System.out.println(userProfile.toString());
        User user = validateUserService.validateRegisteredUserByEmail(userProfile.getKakao_account().getEmail());

        if(user == null){ // 회원가입을 해야하는 경우
            user = userService.registerUser(userProfile.getKakao_account().getEmail(), userProfile.getProperties().getNickname(), SocialCode.KAKAO, refreshToken);
        }
        String jwtAccessToken = jwtTokenProvider.createAccessToken(user.getUserId(),
                user.getUserRole());
        String jwtRefreshToken = jwtTokenProvider.createRefreshToken(user.getUserId(),
                user.getUserRole());


        return ResponseJwtToken.of(jwtAccessToken, jwtRefreshToken);
    }


    public String[] getKakaoAccessToken(String code) { // access token을 발급받음.
        String accessToken = "";
        String refreshToken = "";
        String reqURL = kakaoProperties.getTokenUrl();
        String[] tokens = null;
        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            // post 요청을 위해 기본값이 false인 setDoOutput을 true로
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            // POST 요청에 필요로 요구하는 파라미터 스트림을 통해 전송
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            StringBuilder sb = new StringBuilder();
            sb.append("grant_type=authorization_code");
            sb.append("&client_id=" + kakaoProperties.getRestApiKey());
            sb.append("&redirect_uri=" + kakaoProperties.getRedirectUri());
            sb.append("&code=" + code);
            sb.append("&client_secret=" + kakaoProperties.getClientSecret());
            bw.write(sb.toString());
            bw.flush();

            // 결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();
//            System.out.println("responseCode : " + responseCode);

            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";
            while ((line = br.readLine()) != null) {
                result += line;
            }
//            System.out.println("response body : " + result);
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result); // 토큰을 얻을 수 있음.
            accessToken = element.getAsJsonObject().get("access_token").getAsString();
            refreshToken = element.getAsJsonObject().get("refresh_token").getAsString();
            tokens = new String[]{accessToken, refreshToken};

            br.close();
            bw.close();


        } catch (Exception e) {
            e.printStackTrace();
        }
        return tokens;
    }

    private KakaoUserProfile getUserProfile(String accessToken) {
        String userInfoUrl = kakaoProperties.getUserInfoUrl();
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        HttpEntity<?> httpEntity = new HttpEntity<>(headers);
        ResponseEntity<String> userInfoResponse = restTemplate.exchange(userInfoUrl, HttpMethod.GET, httpEntity, String.class);

        try{
            return objectMapper.readValue(userInfoResponse.getBody(), KakaoUserProfile.class);
        }catch (JsonProcessingException e){
            throw new BusinessException(ErrorCode.JSON_PROCESS_ERROR, e);
        }
    }


}
