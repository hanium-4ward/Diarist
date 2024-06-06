package com.hanium.diarist.domain.diary.exception;

import com.hanium.diarist.common.exception.BusinessException;
import com.hanium.diarist.common.exception.ErrorCode;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.SERVICE_UNAVAILABLE)
public class KafkaConnectException extends BusinessException {
    public KafkaConnectException() {
        super(ErrorCode.KAFKFA_CONNECT_ERROR);
    }
}
