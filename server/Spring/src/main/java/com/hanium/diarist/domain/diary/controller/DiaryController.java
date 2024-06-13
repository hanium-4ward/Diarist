package com.hanium.diarist.domain.diary.controller;

import com.hanium.diarist.common.response.ErrorResponse;
import com.hanium.diarist.common.response.SuccessResponse;
import com.hanium.diarist.domain.diary.domain.Diary;
import com.hanium.diarist.domain.diary.dto.*;
import com.hanium.diarist.domain.diary.service.CreateDiaryConsumerService;
import com.hanium.diarist.domain.diary.service.CreateDiaryProducerService;
import com.hanium.diarist.domain.diary.service.DiaryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;

@RestController
@RequestMapping("/api/v1/diary")
@Tag(name = "Diary", description = "일기 API")
@Validated
@RequiredArgsConstructor
public class DiaryController {

    private final CreateDiaryProducerService createDiaryProducerService;
    private final CreateDiaryConsumerService createDiaryConsumerService;
    private final DiaryService diaryService;

    @PostMapping("create/no_ad")
    @Operation(summary = "일기 생성 요청, 광고 없음", description = "일기 생성 요청 API.")
    @ApiResponse(responseCode = "200", description = "일기 생성 요청 메세지큐에 등록 완료")
    public ResponseEntity<SuccessResponse<String>> createDiary(@Valid @RequestBody CreateDiaryRequest createDiaryRequest) {
        createDiaryProducerService.sendCreateDiaryMessage(createDiaryRequest);
        return SuccessResponse.of("일기 생성 요청 메세지큐에 등록 완료").asHttp(HttpStatus.CREATED);// 광고 시청 여부 반환
    }

    @PostMapping("create/ad")
    @Operation(summary = "일기 생성 요청 및 광고 시청", description = "일기 생성 요청 및 광고 시청 API.")
    @ApiResponse(responseCode = "200", description = "일기 생성 요청 메세지큐에 등록 완료")
    public ResponseEntity<SuccessResponse<AdResponse>> createDiaryWithAd(@Valid @RequestBody CreateDiaryRequest createDiaryRequest) {
        boolean adRequired = createDiaryProducerService.sendCreateDiaryMessageWithAd(createDiaryRequest);
        return SuccessResponse.of(new AdResponse(adRequired)).asHttp(HttpStatus.CREATED);// 광고 시청 여부 반환
    }




    @GetMapping(value = "/kafka-response", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    @Operation(summary = "일기 생성 요청 응답", description = "일기 생성 완료 요청을 클라이언트에 던져주는 API.")
    @ApiResponse(responseCode = "200", description = "일기 생성 완료 요청을 클라이언트에 던져주는 API", content = @Content(array = @ArraySchema(schema = @Schema(implementation = CreateDiaryResponse.class))))
    public SseEmitter kafkaResponse() {
        // kafka consumer 가 emitter 에 데이터를 보내면 emitter 가 클라이언트에게 데이터를 보냄
        return createDiaryConsumerService.addEmitter();
    }

    @PostMapping("/bookmark")
    @Operation(summary = "일기 즐겨찾기 (1개)", description = "일기 즐겨찾기 API.")
    @ApiResponse(responseCode = "200", description = "일기 즐겨찾기 성공")
    public ResponseEntity<SuccessResponse<BookmarkDiaryResponse>> bookmarkDiary(@RequestBody BookmarkDiaryRequest request) {
        BookmarkDiaryResponse response = diaryService.bookmarkDiary(request.getDiaryId(), request.isFavorite());
        return SuccessResponse.of(response).asHttp(HttpStatus.OK);
    }

    @PostMapping("/bookmark/delete")
    @Operation(summary = "일기 즐겨찾기 해제", description = "앨범페이지 일기 즐겨찾기 해제 API")
    @ApiResponse(responseCode = "200",description = "일기 즐겨찾기 해제 성공")
    public ResponseEntity<SuccessResponse<List<BookmarkDiaryResponse>>> deleteBookmarkDiary(@RequestBody List<Long> diaryIdList) {
        List<BookmarkDiaryResponse> bookmarkDiaryResponses = diaryService.deleteBookmarkDiary(diaryIdList);
        return SuccessResponse.of(bookmarkDiaryResponses).asHttp(HttpStatus.OK);
    }


}
