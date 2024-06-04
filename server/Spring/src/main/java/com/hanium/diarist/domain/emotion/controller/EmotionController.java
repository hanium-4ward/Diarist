package com.hanium.diarist.domain.emotion.controller;

import com.hanium.diarist.domain.emotion.dto.CreateEmotionRequest;
import com.hanium.diarist.domain.emotion.dto.CreateEmotionResponse;
import com.hanium.diarist.domain.emotion.service.EmotionService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/emotion")
@Tag(name = "Emotion", description = "감정 API")
@RequiredArgsConstructor
public class EmotionController {
    private final EmotionService emotionService;

    @PostMapping("/create")
    public ResponseEntity<List<CreateEmotionResponse>> createEmotions(@RequestBody List<CreateEmotionRequest> createEmotionRequests) {
        List<CreateEmotionResponse> emotions = emotionService.createEmotions(createEmotionRequests);
        return new ResponseEntity<>(emotions, HttpStatus.CREATED);
    }

}
