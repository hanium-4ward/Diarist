package com.hanium.diarist.domain.emotion.dto;

import com.hanium.diarist.domain.emotion.domain.Emotion;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class CreateEmotionRequest {

    private String emotionName;
    private String emotionPrompt;
    private String emotionPicture;

    public Emotion toEmotionEntity() {// 감정 객체 만드는 메소드 호출
        return Emotion.create(emotionName, emotionPrompt, emotionPicture);
    }
}
