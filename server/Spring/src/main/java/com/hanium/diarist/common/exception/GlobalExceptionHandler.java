package com.hanium.diarist.common.exception;

import com.hanium.diarist.common.response.ErrorResponse;
import com.hanium.diarist.domain.diary.exception.KafkaConnectException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<Object> handleBusinessException(BusinessException e) {
        ErrorCode errorCode = e.getErrorCode();
        if (errorCode.getStatus() == HttpStatus.INTERNAL_SERVER_ERROR.value()) {
            log.error("handleBusinessException", e);
        }else{
            log.warn("handleBusinessException", e);
        }
        return handleExceptionInternal(errorCode);
    }


    @ExceptionHandler(KafkaConnectException.class)
    public ResponseEntity<Object> handleKafkaConnectException(KafkaConnectException e) {
        log.error("handleKafkaConnectException", e);
        return new ResponseEntity<>(e.getMessage(), HttpStatus.SERVICE_UNAVAILABLE);
    }


    @ExceptionHandler(MethodArgumentNotValidException.class) // 메서드 인자가 잘못됐을 때 발생하는 예외 (valid 어노테이션을 사용했을 때)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage()));// 에러가 뜨면 에러가 난 필드에 에러 메세지를 넣어서 return 함
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Object> handleHttpMessageNotReadableException(HttpMessageNotReadableException e) { // JSON 형식이 잘못됐을 때 발생하는 예외
        log.error("handleHttpMessageNotReadableException", e);
        ErrorCode errorCode = ErrorCode.JSON_PROCESS_ERROR;
        return handleExceptionInternal(errorCode);
    }


    /// 에러 코드를 받아서 에러 메세지를 반환하는 함수
    private ResponseEntity<Object> handleExceptionInternal(ErrorCode errorCode) {
        return ResponseEntity.status(errorCode.getStatus())
                .body(makeErrorResponse(errorCode));
    }


    // errorResponse를 만드는 함수
    private ErrorResponse makeErrorResponse(ErrorCode errorCode) {
        return ErrorResponse.builder()
                .code(errorCode.getCode())
                .message(errorCode.getMessage())
                .build();
    }

}
