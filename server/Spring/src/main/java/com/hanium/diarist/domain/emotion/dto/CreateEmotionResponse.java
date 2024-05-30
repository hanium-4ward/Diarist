package com.hanium.diarist.domain.emotion.dto;

import com.hanium.diarist.domain.emotion.domain.Emotion;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
public class CreateEmotionResponse {
    private final Long emotionId;
    private final String emotionName;
    private final String emotionPicture;

    public static CreateEmotionResponse of(Emotion emotion) {
        return new CreateEmotionResponse(emotion.getEmotionId(), emotion.getEmotionName(), emotion.getEmotionPicture());
    }

}
