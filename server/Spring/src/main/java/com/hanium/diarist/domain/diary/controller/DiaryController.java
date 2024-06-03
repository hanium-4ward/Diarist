package com.hanium.diarist.domain.diary.controller;

import com.hanium.diarist.domain.diary.dto.AdResponse;
import com.hanium.diarist.domain.diary.dto.CreateDiaryRequest;
import com.hanium.diarist.domain.diary.service.CreateDiaryConsumerService;
import com.hanium.diarist.domain.diary.service.CreateDiaryProducerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.concurrent.Executors;

@RestController
@RequestMapping("/api/v1/diary")
@Tag(name = "Diary", description = "일기 API")
@Validated
@RequiredArgsConstructor
public class DiaryController {

    private final CreateDiaryProducerService createDiaryProducerService;
    private final CreateDiaryConsumerService createDiaryConsumerService;

    @PostMapping("/create")
    @Operation(summary = "일기 생성 요청", description = "일기 생성 요청 API.")
    @ApiResponse(responseCode = "200", description = "일기 생성 요청 메세지큐에 등록 완료")
    @ApiResponse(responseCode = "400", description = "잘못된 요청")
    public ResponseEntity<String> createDiary(@Valid @RequestBody CreateDiaryRequest createDiaryRequest) {
        createDiaryProducerService.sendCreateDiaryMessage(createDiaryRequest);
        return new ResponseEntity<>("일기 생성 요청 메세지큐에 등록 완료", HttpStatus.OK);
    }

    @PostMapping
    @Operation(summary = "광고 시청", description = "광고 시청 API.")
    public AdResponse createDiaryWithAd(@Valid @RequestBody CreateDiaryRequest createDiaryRequest) {
        boolean adRequired = createDiaryProducerService.sendCreateDiaryMessageWithAd(createDiaryRequest);
        return new AdResponse(adRequired); // 광고 시청 필요 여부 반환
    }


    @GetMapping(value = "/kafka-response",produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter kafkaResponse() {
        // kafka consumer 가 emitter 에 데이터를 보내면 emitter 가 클라이언트에게 데이터를 보냄
        return createDiaryConsumerService.addEmitter();
    }

    @GetMapping(value = "/test-sse", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter testSse() {
        SseEmitter emitter = new SseEmitter(3600000L);
        Executors.newSingleThreadExecutor().execute(() -> {
            try {
                for (int i = 0; i < 10; i++) {
                    emitter.send(SseEmitter.event().data("Test message " + i));
                    Thread.sleep(1000);
                }
                emitter.complete();
            } catch (Exception e) {
                emitter.completeWithError(e);
            }
        });
        return emitter;
    }








}
