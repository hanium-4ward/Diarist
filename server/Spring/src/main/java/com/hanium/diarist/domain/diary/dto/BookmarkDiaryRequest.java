package com.hanium.diarist.domain.diary.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BookmarkDiaryRequest {

        private Long diaryId;
        private boolean favorite;
}
