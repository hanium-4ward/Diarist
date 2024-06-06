package com.hanium.diarist.domain.diary.repository;

import com.hanium.diarist.domain.diary.domain.Diary;
import com.hanium.diarist.domain.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.Optional;

public interface DiaryRepository extends JpaRepository<Diary, Long> {

    Optional<Diary> findByUserAndDiaryDate(User user, LocalDate diaryDate);
    Optional<Diary> findByDiaryId(long diaryId);

    @Query("select d from Diary d join fetch d.emotion join fetch d.artist join fetch d.image where d.diaryId = :diaryId")
    Optional<Diary> findByDiaryIdWithDetails(long diaryId);

}
