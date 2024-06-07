package com.hanium.diarist.domain.diary.exception;

import com.hanium.diarist.common.exception.BusinessException;
import com.hanium.diarist.common.exception.ErrorCode;

public class DiaryNotFoundException extends BusinessException {
    public DiaryNotFoundException() {
        super(ErrorCode.DIARY_NOT_FOUND);
    }

}
