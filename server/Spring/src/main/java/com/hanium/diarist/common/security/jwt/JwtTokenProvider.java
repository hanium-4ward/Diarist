package com.hanium.diarist.common.security.jwt;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hanium.diarist.common.exception.BusinessException;
import com.hanium.diarist.common.exception.ErrorCode;
import com.hanium.diarist.common.security.jwt.exception.ExpiredAccessTokenException;
import com.hanium.diarist.common.security.jwt.exception.InvalidTokenException;
import com.hanium.diarist.domain.user.domain.UserRole;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springdoc.core.configuration.SpringDocUIConfiguration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;

import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Component
@PropertySource("classpath:application.yml")
public class JwtTokenProvider {

    private final JwtDecoder jwtDecoder;

    private final String CLAIM_USER_ID = JwtProperties.USER_ID;
    private final String CLAIM_USER_ROLE = JwtProperties.USER_ROLE;

    private final long ACCESS_TOKEN_EXPIRE_TIME;
    private final long REFRESH_TOKEN_EXPIRE_TIME;

    private final Key key;
    private final ObjectMapper objectMapper;

    @Value("${jwt.secret}")
    private String secret;

    // access : 1시간, refresh : 60일 , 생성자 주입
    public JwtTokenProvider(@Value("${jwt.access-token-expire-time}") long accessTime,
                            @Value("${jwt.refresh-token-expire-time}") long refreshTime,
                            @Value("${jwt.secret}") String secretKey,
                            JwtDecoder jwtDecoder) {
        this.ACCESS_TOKEN_EXPIRE_TIME = accessTime;
        this.REFRESH_TOKEN_EXPIRE_TIME = refreshTime;
        byte[] keyBytes = Base64.getDecoder().decode(secretKey);
        this.key = Keys.hmacShaKeyFor(keyBytes);
        this.objectMapper = new ObjectMapper();
        this.jwtDecoder = jwtDecoder;
    }

    @PostConstruct
    public void init() {
        byte[] keyBytes = Base64.getDecoder().decode(secret);
        SecretKey key = Keys.hmacShaKeyFor(keyBytes);
        log.info("JWT Provider initialized with secret: {}", Base64.getEncoder().encodeToString(key.getEncoded()));
    }


    protected String createToken(Long userId, UserRole userRole, long tokenValid) {
        Map<String, Object> header = new HashMap<>();
        header.put("typ", "JWT");

        Claims claims = Jwts.claims();
        claims.put(CLAIM_USER_ID, userId.toString());
        claims.put(CLAIM_USER_ROLE, userRole);

        Date date = new Date();
        return Jwts.builder()
                .setHeader(header)
                .setClaims(claims)// 토큰 발행 유저 정보
                .setIssuedAt(date)
                .setExpiration(new Date(date.getTime() + tokenValid))
                .signWith(key, SignatureAlgorithm.HS512)// 알고리즘
                .compact();
    }

    public String createAccessToken(Long userId, UserRole userRole) {
        return createToken(userId, userRole, ACCESS_TOKEN_EXPIRE_TIME);
    }
    public String createRefreshToken(Long userId, UserRole userRole) {
        return createToken(userId, userRole, REFRESH_TOKEN_EXPIRE_TIME);
    }

    public String expireToken(String jwtToken) {
        Claims claims = parseClaims(jwtToken);
        return Jwts.builder()
                .setClaims(claims)
                .setExpiration(new Date())
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }

    public String createNewAccessTokenFromRefreshToken(String refreshToken) {
        String payload = new String(Base64.getUrlDecoder().decode(refreshToken.split("\\.")[1]));
        try {
            JsonNode jsonNode = objectMapper.readTree(payload);
            long userId = jsonNode.get(CLAIM_USER_ID).asLong();
            UserRole role = UserRole.valueOf(jsonNode.get(CLAIM_USER_ROLE).asText());
            return createAccessToken(userId, role);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

    }

//    public Authentication getAuthentication(String accessToken) {
//        Claims claims = parseClaims(accessToken);
//        if(claims.get(CLAIM_USER_ROLE)==null || !StringUtils.hasText(
//                claims.get(CLAIM_USER_ROLE).toString())){
//            throw new BusinessException(ErrorCode.AUTHORITY_NOT_FOUND);// 유저 권한 없음.
//        }
//
//        Collection<? extends GrantedAuthority> authorities =
//            Arrays.stream(claims.get(CLAIM_USER_ROLE).toString().split(","))
//                .map(SimpleGrantedAuthority::new)
//                .collect(Collectors.toList());
//        return new JwtAuthenticationToken(claims.get(CLAIM_USER_ID).toString(), authorities);
//
//    }
    public Authentication getAuthentication(String accessToken) {
        Claims claims = parseClaims(accessToken);

        if (claims.get(CLAIM_USER_ROLE) == null || !StringUtils.hasText(claims.get(CLAIM_USER_ROLE).toString())) {
            throw new BusinessException(ErrorCode.AUTHORITY_NOT_FOUND); //유저권한없음
        }

        Collection<? extends GrantedAuthority> authorities = Arrays.stream(claims.get(CLAIM_USER_ROLE).toString().split(","))
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());

        return new UsernamePasswordAuthenticationToken(claims, null, authorities);
    }




    public Claims parseClaims(String accessToken) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(accessToken)
                .getBody();
    }
    public void validAccessToken(String accessToken) {
        try {
            parseClaims(accessToken);
        } catch (ExpiredJwtException e) {
            throw new ExpiredAccessTokenException();
        } catch (Exception e) {
            throw new InvalidTokenException(e);
        }
    }

}
