package com.hanium.diarist.domain.diary.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@Schema(description = "일기 즐겨찾기 응답값")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class BookmarkDiaryResponse {

        @Schema(description = "일기 ID")
        private Long diaryId;

        @Schema(description = "즐겨찾기 여부")
        private boolean favorite;




}
