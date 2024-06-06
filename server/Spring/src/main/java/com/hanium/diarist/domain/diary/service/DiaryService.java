package com.hanium.diarist.domain.diary.service;

import com.hanium.diarist.domain.diary.domain.Diary;
import com.hanium.diarist.domain.diary.dto.BookmarkDiaryResponse;
import com.hanium.diarist.domain.diary.repository.DiaryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DiaryService {
    private final DiaryRepository diaryRepository;

    @Transactional
    public BookmarkDiaryResponse bookmarkDiary(Long diaryId, boolean favorite) {
        Optional<Diary> diary = diaryRepository.findByDiaryId(diaryId);
        if(!diary.isPresent()){
            throw new IllegalArgumentException("해당 일기가 존재하지 않습니다." + diaryId);
        }
        Diary updateDiary = diary.get();
        updateDiary.setFavorite(favorite);
        Diary saved = diaryRepository.save(updateDiary);
        return new BookmarkDiaryResponse(saved.getDiaryId(),saved.isFavorite());
    }

    @Transactional
    public List<BookmarkDiaryResponse> deleteBookmarkDiary(List<Long> diaryIdList) {
        List<Diary> diaries = diaryRepository.findAllById(diaryIdList);
        diaries.forEach(diary -> diary.setFavorite(false)); // 즐겨 찾기 해제
        List<Diary> updatedDiaries = diaryRepository.saveAll(diaries);
        return updatedDiaries.stream()
                .map(diary -> new BookmarkDiaryResponse(diary.getDiaryId(), diary.isFavorite()))
                .collect(Collectors.toList());
    }


}




