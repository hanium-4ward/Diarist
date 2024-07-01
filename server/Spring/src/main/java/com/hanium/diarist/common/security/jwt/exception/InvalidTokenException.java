package com.hanium.diarist.common.security.jwt.exception;

import com.hanium.diarist.common.exception.ErrorCode;

public class InvalidTokenException extends TokenException{

    public InvalidTokenException(Throwable e) {
        super(ErrorCode.INVALID_TOKEN,e);
    }

    public InvalidTokenException() {
        super(ErrorCode.INVALID_TOKEN);
    }
}
