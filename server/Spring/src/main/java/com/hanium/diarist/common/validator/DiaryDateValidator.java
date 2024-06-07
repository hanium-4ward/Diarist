package com.hanium.diarist.common.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDate;

public class DiaryDateValidator implements ConstraintValidator<ValidDiaryDate, LocalDate>{
    private static final Logger logger = LoggerFactory.getLogger(DiaryDateValidator.class);

    @Override
    public void initialize(ValidDiaryDate constraintAnnotation) {

    }

    @Override
    public boolean isValid(LocalDate diaryDate, ConstraintValidatorContext context) {
        if (diaryDate == null) {
            return true;
        }
        LocalDate serverDate = LocalDate.now();
        boolean isValid = !diaryDate.isAfter(serverDate);
        logger.debug("DiaryDateValidator date ={}, isValid: {}",diaryDate,isValid);
        return isValid;
    }
}
