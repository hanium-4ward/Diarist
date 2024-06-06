package com.hanium.diarist.domain.diary.exception;

import com.hanium.diarist.common.exception.BusinessException;
import com.hanium.diarist.common.exception.ErrorCode;

public class JsonProcessException extends BusinessException {
    public JsonProcessException() {
        super(ErrorCode.JSON_PROCESS_ERROR);
    }
}
