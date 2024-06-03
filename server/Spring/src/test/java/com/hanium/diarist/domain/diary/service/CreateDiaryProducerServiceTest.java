//package com.hanium.diarist.domain.diary.service;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.hanium.diarist.domain.diary.dto.CreateDiaryRequest;
//import com.hanium.diarist.domain.diary.domain.Diary;
//import com.hanium.diarist.domain.diary.repository.DiaryRepository;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//import org.springframework.kafka.core.KafkaTemplate;
//
//import java.time.LocalDate;
//import java.util.Optional;
//
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.Mockito.*;
//
//class CreateDiaryProducerServiceTest {
//
//    @Mock
//    private KafkaTemplate<String, String> kafkaTemplate;
//
//    @Mock
//    private ObjectMapper objectMapper;
//
//    @Mock
//    private DiaryRepository diaryRepository;
//
//    @InjectMocks
//    private CreateDiaryProducerService createDiaryProducerService;
//
//    @BeforeEach
//    void setUp() {
//        MockitoAnnotations.openMocks(this);
//    }
//
//    @Test
//    void testSendCreateDiaryMessage_FirstTimeToday() throws Exception {
//        CreateDiaryRequest request = new CreateDiaryRequest();
//        request.setDate(LocalDate.now());
//
//        when(diaryRepository.findByDate(any(LocalDate.class))).thenReturn(Optional.empty());
//        when(objectMapper.writeValueAsString(any())).thenReturn("testMessage");
//
//        createDiaryProducerService.sendCreateDiaryMessage(request);
//
//        verify(kafkaTemplate, times(1)).send("create-diary", "testMessage");
//        verify(kafkaTemplate, never()).send("reCreate-diary", "testMessage");
//    }
//
//    @Test
//    void testSendCreateDiaryMessage_RecreateToday() throws Exception {
//        CreateDiaryRequest request = new CreateDiaryRequest();
//        request.setDate(LocalDate.now());
//
//        when(diaryRepository.findByDate(any(LocalDate.class))).thenReturn(Optional.of(new Diary()));
//        when(objectMapper.writeValueAsString(any())).thenReturn("testMessage");
//
//        createDiaryProducerService.sendCreateDiaryMessage(request);
//
//        verify(kafkaTemplate, times(1)).send("reCreate-diary", "testMessage");
//        verify(kafkaTemplate, never()).send("create-diary", "testMessage");
//    }
//
//    @Test
//    void testSendCreateDiaryMessage_PastDate() throws Exception {
//        CreateDiaryRequest request = new CreateDiaryRequest();
//        request.setDate(LocalDate.now().minusDays(1));
//
//        when(diaryRepository.findByDate(any(LocalDate.class))).thenReturn(Optional.empty());
//        when(objectMapper.writeValueAsString(any())).thenReturn("testMessage");
//
//        createDiaryProducerService.sendCreateDiaryMessage(request);
//
//        verify(kafkaTemplate, times(1)).send("create-diary", "testMessage");
//        verify(kafkaTemplate, never()).send("reCreate-diary", "testMessage");
//    }
//
//    @Test
//    void testSendCreateDiaryMessage_RecreatePastDate() throws Exception {
//        CreateDiaryRequest request = new CreateDiaryRequest();
//        request.setDate(LocalDate.now().minusDays(1));
//
//        when(diaryRepository.findByDate(any(LocalDate.class))).thenReturn(Optional.of(new Diary()));
//        when(objectMapper.writeValueAsString(any())).thenReturn("testMessage");
//
//        createDiaryProducerService.sendCreateDiaryMessage(request);
//
//        verify(kafkaTemplate, times(1)).send("reCreate-diary", "testMessage");
//        verify(kafkaTemplate, never()).send("create-diary", "testMessage");
//    }
//}
