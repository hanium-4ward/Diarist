package com.hanium.diarist.common.exception;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
@Getter
public enum ErrorCode {

    // Common
    KAFKFA_CONNECT_ERROR(500, "C001", "Kafka 연결 중 오류가 발생했습니다."),
    JSON_PROCESS_ERROR(500, "C003", "JSON 처리 중 오류가 발생했습니다."),

    // User

    // security
    AUTHORITY_NOT_FOUND(404, "S001", "유저 권한이 없습니다."),
    INVALID_TOKEN(400, "S002", "유효하지 않은 토큰입니다."),
    JWT_ACCESS_TOKEN_NOT_FOUND(404, "S003", "jwt access token이 없습니다."),
    JWT_REFRESH_TOKEN_NOT_FOUND(404, "S004", "jwt refresh token이 없습니다."),
    EXPIRED_JWT_ACCESS_TOKEN(400, "S005", "jwt access token이 만료되었습니다."),
    EXPIRED_JWT_REFRESH_TOKEN(400, "S006", "jwt refresh token이 만료되었습니다."),
    AUTH_CODE_NOT_FOUND(404, "S007", "authorization header가 비었습니다."),
    JWT_TOKEN_NOT_FOUND(404, "S008", "jwt token이 없습니다."),




    // Diary
    DIARY_NOT_FOUND(404, "D001", "일기를 찾을 수 없습니다."),
    INVALID_DIARY_ID(400, "D002", "일기 ID 형식이 잘못되었습니다."),

    SSE_ERROR(500, "D004", "SSE 처리 중 오류가 발생했습니다.");

    // Emotion

    // Image

    private final int status;// HTTP 상태코드
    private final String code; // 에러 코드
    private final String message; // 에러 메시지

    ErrorCode(int status, String code, String message) {
        this.status = status;
        this.code = code;
        this.message = message;
    }
}
