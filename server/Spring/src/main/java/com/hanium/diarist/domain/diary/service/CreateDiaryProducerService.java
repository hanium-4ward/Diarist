package com.hanium.diarist.domain.diary.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hanium.diarist.domain.diary.domain.Diary;
import com.hanium.diarist.domain.diary.dto.CreateDiaryRequest;
import com.hanium.diarist.domain.diary.repository.DiaryRepository;
import com.hanium.diarist.domain.user.domain.User;
import com.hanium.diarist.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Objects;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
public class CreateDiaryProducerService {

    private final KafkaTemplate<String,String> kafkaTemplate;
    private final ObjectMapper objectMapper;
    private final DiaryRepository diaryRepository;
    private final UserRepository userRepository;
    private final String CreateTopicName = "create-diary";
    private final String reCreateTopicName = "re-create-diary";


    public void sendCreateDiaryMessage(CreateDiaryRequest createDiaryRequest) {
        try {
            String message = objectMapper.writeValueAsString(createDiaryRequest);
            kafkaTemplate.send(CreateTopicName, message);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to convert CreateDiaryRequest to JSON", e);
        }
    }

    public boolean sendCreateDiaryMessageWithAd(CreateDiaryRequest createDiaryRequest) {
        LocalDate date = createDiaryRequest.getDiaryDate();// 일기 작성 날짜 가져옴
        User user = userRepository.findById(createDiaryRequest.getUserId()).orElseThrow();// 해당 유저 찾음
        Optional<Diary> existingDiary = diaryRepository.findByUserAndDiaryDate(user, date);// 해당 유저의 일기 작성 날짜에 일기가 있는지 확인

        try{
            String message = objectMapper.writeValueAsString(createDiaryRequest);
            if (existingDiary.isPresent()|| !date.isEqual(LocalDate.now())) { // 당시 날짜의 일기가 있거나, 과거의 일기를 작성할 경우
                // 광고 시청 필수
                kafkaTemplate.send(reCreateTopicName, message);
                watchAd();
                return true;
            }else{// 과거 날짜 일기 작성
                 kafkaTemplate.send(CreateTopicName, message);
                 return false;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }


    @Async
    public void watchAd() {
        System.out.println("광고 시청 중");
    }

}
