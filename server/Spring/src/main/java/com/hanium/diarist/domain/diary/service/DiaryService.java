package com.hanium.diarist.domain.diary.service;

import com.hanium.diarist.domain.diary.domain.Diary;
import com.hanium.diarist.domain.diary.domain.Image;
import com.hanium.diarist.domain.diary.dto.BookmarkDiaryResponse;
import com.hanium.diarist.domain.diary.dto.DiaryDetailResponse;
import com.hanium.diarist.domain.diary.exception.DiaryNotFoundException;
import com.hanium.diarist.domain.diary.repository.DiaryRepository;
import com.hanium.diarist.domain.diary.repository.ImageRepository;
import com.hanium.diarist.domain.user.service.ValidateUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DiaryService {
    private final DiaryRepository diaryRepository;
    private final ImageRepository imageRepository;
    private final ValidateUserService validateUserService;
    private final S3Client s3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;



    @Transactional
    public BookmarkDiaryResponse bookmarkDiary(Long diaryId, boolean favorite) {
        Optional<Diary> diary = diaryRepository.findByDiaryId(diaryId);
        if(diary.isEmpty()){
            throw new DiaryNotFoundException();
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


    public DiaryDetailResponse getDiaryDetail(Long diaryId) {
        Optional<Diary> diary = diaryRepository.findByDiaryIdWithDetails(diaryId);
        if(diary.isEmpty()){
            throw new DiaryNotFoundException();
        }
        Diary diaryObject = diary.get(); // optional 객체를 diary 객체로 변환
        return DiaryDetailResponse.of(diaryObject,diaryObject.getEmotion(),diaryObject.getArtist());
    }

    @Transactional
    public void deleteDiary(Long diaryId,Long userId) {
        validateUserService.validateUserById(userId);
        Optional<Diary> diaryOptional = diaryRepository.findByDiaryId(diaryId);
        if(diaryOptional.isEmpty()){
            throw new DiaryNotFoundException();
        }
        Diary diary = diaryOptional.get();
        Image image = diary.getImage();
        String imageUrl = diary.getImage().getImageUrl();
        imageUrl = imageUrl.substring(imageUrl.indexOf("/", imageUrl.indexOf("//") + 2) + 1);

        deleteFileFromS3(bucket,imageUrl);
        diary.deleteDiary();
        imageRepository.delete(image);
    }

    private void deleteFileFromS3(String bucketName, String fileKey) {
        DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                .bucket(bucketName)
                .key(fileKey)
                .build();
        s3Client.deleteObject(deleteObjectRequest);
    }



}




