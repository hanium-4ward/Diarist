package com.hanium.diarist.domain.diary.exception;

import com.hanium.diarist.common.exception.BusinessException;
import com.hanium.diarist.common.exception.ErrorCode;

public class DiaryIdInvalidException extends BusinessException {
    public DiaryIdInvalidException() {
        super(ErrorCode.INVALID_DIARY_ID);
    }
}
