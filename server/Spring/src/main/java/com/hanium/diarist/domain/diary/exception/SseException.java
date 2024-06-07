package com.hanium.diarist.domain.diary.exception;

import com.hanium.diarist.common.exception.BusinessException;
import com.hanium.diarist.common.exception.ErrorCode;

public class SseException extends BusinessException {
    public SseException() {
        super(ErrorCode.SSE_ERROR);
    }
}
