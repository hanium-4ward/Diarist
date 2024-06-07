package com.hanium.diarist.domain.diary.domain;

import com.hanium.diarist.common.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Image extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long imageId;

    @NotNull
    @OneToOne(mappedBy = "image",fetch = FetchType.LAZY)
    private Diary diary;

    @NotNull
    @Column(nullable = false)
    private String imageUrl;

    // 프롬프트 일단 생략





}
