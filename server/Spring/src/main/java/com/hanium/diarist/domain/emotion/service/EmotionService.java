package com.hanium.diarist.domain.emotion.service;

import com.hanium.diarist.domain.emotion.domain.Emotion;
import com.hanium.diarist.domain.emotion.dto.CreateEmotionRequest;
import com.hanium.diarist.domain.emotion.dto.CreateEmotionResponse;
import com.hanium.diarist.domain.emotion.repository.EmotionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class EmotionService {
    private final EmotionRepository emotionRepository;

    @Transactional
    public List<CreateEmotionResponse> createEmotions(List<CreateEmotionRequest> createEmotionRequests) {

        ArrayList<CreateEmotionResponse> emotions = new ArrayList<>();
        for (CreateEmotionRequest request : createEmotionRequests) {
            Emotion emotion = request.toEmotionEntity();// request를 감정 객체로 변환
            emotionRepository.save(emotion);// emotion DB에 저장
            emotions.add(CreateEmotionResponse.of(emotion));
        }
        return emotions;
    }
}
