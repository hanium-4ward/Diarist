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
