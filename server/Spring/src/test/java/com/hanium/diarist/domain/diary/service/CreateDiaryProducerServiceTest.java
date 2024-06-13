package com.hanium.diarist.domain.diary.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hanium.diarist.domain.diary.domain.Diary;
import com.hanium.diarist.domain.diary.dto.CreateDiaryRequest;
import com.hanium.diarist.domain.diary.exception.JsonProcessException;
import com.hanium.diarist.domain.diary.repository.DiaryRepository;
import com.hanium.diarist.domain.user.domain.SocialCode;
import com.hanium.diarist.domain.user.domain.User;
import com.hanium.diarist.domain.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;

import java.time.LocalDate;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class CreateDiaryProducerServiceTest {

    @Mock
    private KafkaTemplate<String, String> kafkaTemplate;

    @Mock
    private ObjectMapper objectMapper;

    @Mock
    private DiaryRepository diaryRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private CreateDiaryProducerService createDiaryProducerService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void sendCreateDiaryMessage_success() throws JsonProcessingException { // 일기 작성 메시지 전송 성공 여부 ( ad 없는 로직 )
        CreateDiaryRequest request = CreateDiaryRequest.builder()
                .userId(1L)
                .emotionId(1L)
                .artistId(1L)
                .diaryDate(LocalDate.now())
                .content("This is a test diary entry")
                .build(); // 일기 작성 요청 생성
        String message = "testMessage";// 전송 메세지

        when(objectMapper.writeValueAsString(any())).thenReturn(message); // objectMapper.writeValueAsString(any()) 호출 시 message 반환 -> 로직에 있음.
        CompletableFuture<SendResult<String, String>> future = // 완료된 상태의 객체
                CompletableFuture.completedFuture(mock(SendResult.class)); // future 생성
        when(kafkaTemplate.send(anyString(), anyString())).thenReturn(future); // kafkaTemplate.send(anyString(), anyString()) 호출 시 future 반환

        assertDoesNotThrow(() -> createDiaryProducerService.sendCreateDiaryMessage(request)); // 예외를 던지지 않는다면 성공
    }

    @Test
    void sendCreateDiaryMessage_jsonProcessingException() throws JsonProcessException, JsonProcessingException {
        CreateDiaryRequest request = CreateDiaryRequest.builder()
                .userId(1L)
                .emotionId(1L)
                .artistId(1L)
                .diaryDate(LocalDate.now())
                .content("This is a test diary entry")
                .build();

        when(objectMapper.writeValueAsString(any())).thenThrow(JsonProcessException.class); // jsonProcessException 발생하도록 설정

        assertThrows(JsonProcessException.class, () -> createDiaryProducerService.sendCreateDiaryMessage(request)); // 예외 발생
    }

    @Test
    void sendCreateDiaryMessageWithAd_noExistingDiaryAndToday() throws JsonProcessingException { // 오늘의 일기를 작성하는 로직 테스트
        CreateDiaryRequest request = CreateDiaryRequest.builder()
                .userId(1L)
                .emotionId(1L)
                .artistId(1L)
                .diaryDate(LocalDate.now())
                .content("This is a test diary entry")
                .build();

        User user = User.create("test@gmail.com", "test", SocialCode.KAKAO); // 임의의 유저
        String message = "testMessage";

        when(userRepository.findById(anyLong())).thenReturn(Optional.of(user)); // userRepository.findById(anyLong()) 호출 시 테스트 user 반환
        when(diaryRepository.findByUserAndDiaryDate(any(), any())).thenReturn(Optional.empty());// diaryRepository.findByUserAndDiaryDate(any(), any()) 호출 시 empty 반환
        when(objectMapper.writeValueAsString(any())).thenReturn(message);// objectMapper.writeValueAsString(any()) 호출 시 message 반환
        CompletableFuture<SendResult<String, String>> future = CompletableFuture.completedFuture(mock(SendResult.class));// future 생성
        when(kafkaTemplate.send(anyString(), anyString())).thenReturn(future);// kafkaTemplate.send(anyString(), anyString()) 호출 시 future 반환

        boolean result = createDiaryProducerService.sendCreateDiaryMessageWithAd(request);

        assertFalse(result);
        verify(kafkaTemplate).send(eq("create-diary"), eq(message)); // 토픽이 create-diary로 가는지 확인
    }

    @Test
    void sendCreateDiaryMessageWithAd_existingDiaryOrPastDate() throws JsonProcessingException { // 재생성 토픽으로 가는지 확인
        CreateDiaryRequest request = CreateDiaryRequest.builder()
                .userId(1L)
                .emotionId(1L)
                .artistId(1L)
                .diaryDate(LocalDate.now().minusDays(1))
                .content("This is a test diary entry")
                .build();

        User user = User.create("test@gmail.com", "test", SocialCode.KAKAO);
        Diary diary = new Diary(user, null, null, LocalDate.now(), "test", false, null);
        String message = "testMessage";

        when(userRepository.findById(anyLong())).thenReturn(Optional.of(user));
        when(diaryRepository.findByUserAndDiaryDate(any(), any())).thenReturn(Optional.of(diary));
        when(objectMapper.writeValueAsString(any())).thenReturn(message);
        CompletableFuture<SendResult<String, String>> future = CompletableFuture.completedFuture(mock(SendResult.class));
        when(kafkaTemplate.send(anyString(), anyString())).thenReturn(future);

        boolean result = createDiaryProducerService.sendCreateDiaryMessageWithAd(request);

        assertTrue(result);
        verify(kafkaTemplate).send(eq("re-create-diary"), eq(message));
    }


}
