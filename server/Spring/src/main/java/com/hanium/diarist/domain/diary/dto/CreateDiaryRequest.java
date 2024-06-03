package com.hanium.diarist.domain.diary.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import com.hanium.diarist.common.validator.ValidDiaryDate;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Schema(description = "일기 생성 요청")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class CreateDiaryRequest {

    @NotNull
    @Schema(description = "유저 ID")
    private Long userId;

    @NotNull
    @Schema(description = "감정 ID")
    private Long emotionId;

    @NotNull
    @Schema(description = "화가 ID")
    private Long artistId;

    @NotNull
    @ValidDiaryDate
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @JsonSerialize(using = LocalDateSerializer.class)
    @JsonDeserialize(using = LocalDateDeserializer.class)
    @Schema(description = "일기 날짜")
    private LocalDate diaryDate;

    @NotNull
    @Schema(description = "일기 내용")
    private String content;



}
