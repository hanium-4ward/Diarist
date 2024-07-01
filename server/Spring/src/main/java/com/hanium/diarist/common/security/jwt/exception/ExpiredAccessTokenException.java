package com.hanium.diarist.common.security.jwt.exception;

import com.hanium.diarist.common.exception.ErrorCode;

public class ExpiredAccessTokenException extends TokenException{
    public ExpiredAccessTokenException() {
        super(ErrorCode.EXPIRED_JWT_ACCESS_TOKEN);
    }
}
