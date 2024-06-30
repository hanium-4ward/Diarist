package com.hanium.diarist.common.security.jwt.exception;

import com.hanium.diarist.common.exception.BusinessException;
import com.hanium.diarist.common.exception.ErrorCode;

public class TokenException extends BusinessException {
    public TokenException(ErrorCode errorCode) {
        super(errorCode);
    }
    public TokenException(ErrorCode errorCode, Throwable throwable) {
        super(errorCode, throwable);
    }
}
