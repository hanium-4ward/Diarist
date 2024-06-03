package com.hanium.diarist.domain.diary.service;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hanium.diarist.domain.diary.domain.Diary;
import com.hanium.diarist.domain.diary.dto.CreateDiaryResponse;
import com.hanium.diarist.domain.diary.repository.DiaryRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class CreateDiaryConsumerService {

    private final DiaryRepository diaryRepository;
    private final ObjectMapper objectMapper;
    private final CopyOnWriteArrayList<SseEmitter> emitters = new CopyOnWriteArrayList<>();// 클라이언트와 sse 연결을 관리하는 리스트

    // 클라이언트가 sse 연결을 요청할 때 새로운 sseEmitter를 생성해 반환함
    public SseEmitter addEmitter() {
        SseEmitter emitter = new SseEmitter(60000L);// 타임아웃 시간 60초
        this.emitters.add(emitter);
        emitter.onCompletion(() -> this.emitters.remove(emitter));// 연결 완료시 리스트에서 제거
        emitter.onTimeout(() -> this.emitters.remove(emitter));// 타임아웃시 리스트에서 제거
        emitter.onError(e -> this.emitters.remove(emitter));// 에러시 리스트에서 제거


        return emitter;
    }

    // 모든 클라이언트에게 메세지를 전송함.
    private void sendEmitters(CreateDiaryResponse diaryResponse){
        for (SseEmitter emitter : emitters) {
            try {
                String jsonResponse = objectMapper.writeValueAsString(diaryResponse);
                //System.out.println("Sending to emitter: " + jsonResponse);
                emitter.send(SseEmitter.event().data(jsonResponse));
            } catch (Exception e) {
                this.emitters.remove(emitter);
            }
        }
    }



    // kafka 의 create-diary-response 토픽에서 메세지를 수신해서 처리함
    @KafkaListener(topics = "create-diary-response", groupId = "diary")
    public void consumeCreateDiaryResponse(HashMap<String,Integer> message) {
        try {
            Integer diaryId = Integer.parseInt(String.valueOf(message.get("diaryId")));
            Diary diary = diaryRepository.findByDiaryId(diaryId).orElseThrow(() -> new RuntimeException("일기가 없습니다."));
            CreateDiaryResponse createDiaryResponse = new CreateDiaryResponse(diary.getEmotion().getEmotionName(),diary.getEmotion().getEmotionPicture(),diary.getContent(),diary.getArtist().getArtistName(),diary.getArtist().getArtistPicture(),diary.getDiaryDate(),diary.getImage().getImageUrl());
//            System.out.println(createDiaryResponse);
            sendEmitters(createDiaryResponse);// json 형식으로 변경
        } catch (Exception e) {
            System.err.println("Error while consuming message: " + e.getMessage());
            throw new RuntimeException(e);
        }
    }


}
