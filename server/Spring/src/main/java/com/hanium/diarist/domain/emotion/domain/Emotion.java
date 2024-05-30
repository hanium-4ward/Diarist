package com.hanium.diarist.domain.emotion.domain;

import com.hanium.diarist.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Emotion extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long emotionId;

    @Column(nullable = false)
    private String emotionName;

    @Column(nullable = false)
    private String emotionPrompt;

    private String emotionPicture;

    private Emotion(String emotionName, String emotionPrompt, String emotionPicture) {
        this.emotionName = emotionName;
        this.emotionPrompt = emotionPrompt;
        this.emotionPicture = emotionPicture;
    }

    public static Emotion create(String emotionName, String emotionPrompt, String emotionPicture) {
        return new Emotion(emotionName, emotionPrompt, emotionPicture);
    }
}
