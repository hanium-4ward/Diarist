package com.hanium.diarist.domain.diary.service;

import com.hanium.diarist.domain.artist.domain.Artist;
import com.hanium.diarist.domain.artist.domain.Period;
import com.hanium.diarist.domain.diary.domain.Diary;
import com.hanium.diarist.domain.diary.dto.BookmarkDiaryResponse;
import com.hanium.diarist.domain.diary.exception.DiaryNotFoundException;
import com.hanium.diarist.domain.diary.repository.DiaryRepository;
import com.hanium.diarist.domain.emotion.domain.Emotion;
import com.hanium.diarist.domain.user.domain.SocialCode;
import com.hanium.diarist.domain.user.domain.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class DiaryServiceTest {
    @InjectMocks
    private DiaryService diaryService;

    @Mock
    private DiaryRepository diaryRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }


    @Test
    void bookmarkDiary() {
        //given
        User user = User.create("a@gmail.com","test", SocialCode.KAKAO );
        Artist artist = Artist.create("test1","test", Period.Contemporary, "test","test.png");
        Emotion emotion = Emotion.create("test", "testPrompt", "test.png");

        boolean favorite=true;
        Diary testdiary = new Diary(user, emotion,artist, LocalDate.now(), "test", favorite,null);

        //when
        when(diaryRepository.findByDiaryId(1L)).thenReturn(Optional.of(testdiary));
        when(diaryRepository.save(any(Diary.class))).thenReturn(testdiary);

        BookmarkDiaryResponse response = diaryService.bookmarkDiary(1L, favorite);
        //then
        assertNotNull(response);
        assertEquals(response.getDiaryId(), testdiary.getDiaryId());
        assertTrue(response.isFavorite());

        verify(diaryRepository).findByDiaryId(1L);
        verify(diaryRepository, times(1)).save(testdiary);
    }

    @Test
    void BookmarkDiary_DiaryNotFound(){
        // given
        User user = User.create("a@gmail.com","test", SocialCode.KAKAO );
        Artist artist = Artist.create("test1","test", Period.Contemporary, "test","test.png");
        Emotion emotion = Emotion.create("test", "testPrompt", "test.png");

        boolean favorite=true;
        Diary testdiary = new Diary(user, emotion,artist, LocalDate.now(), "test", favorite,null);
        testdiary.setDiaryId(1L);

        //when
        when(diaryRepository.findByDiaryId(testdiary.getDiaryId())).thenReturn(Optional.empty()); // 없을 경우를 가정


        //then
        assertThrows(DiaryNotFoundException.class, () -> diaryService.bookmarkDiary(testdiary.getDiaryId(), favorite));

        verify(diaryRepository, times(1)).findByDiaryId(testdiary.getDiaryId());
        verify(diaryRepository, times(0)).save(any(Diary.class));
    }

    @Test
    void deleteBookmarkDiary() {
        List<Long> diaryIdList = Arrays.asList(1L, 2L, 3L);
        User user = User.create("a@gmail.com","test", SocialCode.KAKAO );
        Artist artist = Artist.create("test1","test", Period.Contemporary, "test","test.png");
        Emotion emotion = Emotion.create("test", "testPrompt", "test.png");

        boolean favorite=true;
        Diary diary1 = new Diary(user, emotion,artist, LocalDate.now(), "test1", favorite,null);
        Diary diary2 = new Diary(user, emotion,artist, LocalDate.now(), "test2", favorite,null);
        Diary diary3 = new Diary(user, emotion,artist, LocalDate.now(), "test3", favorite,null);



        List<Diary> diaries = Arrays.asList(diary1, diary2, diary3);

        when(diaryRepository.findAllById(diaryIdList)).thenReturn(diaries);
        when(diaryRepository.saveAll(anyList())).thenReturn(diaries);

        List<BookmarkDiaryResponse> response = diaryService.deleteBookmarkDiary(diaryIdList);

        assertNotNull(response);
        assertEquals(3, response.size());// 해제한 갯수 3개
        assertFalse(response.get(0).isFavorite());// 즐겨찾기 해제
        assertFalse(response.get(1).isFavorite());// 즐겨찾기 해제
        assertFalse(response.get(2).isFavorite());// 즐겨찾기 해제

        verify(diaryRepository, times(1)).findAllById(diaryIdList);
        verify(diaryRepository, times(1)).saveAll(diaries);
    }



}