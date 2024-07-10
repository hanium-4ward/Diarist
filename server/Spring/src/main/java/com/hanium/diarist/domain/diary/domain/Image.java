package com.hanium.diarist.domain.diary.domain;

import com.hanium.diarist.common.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Where;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Where(clause = "image_url != 'deleted'") // image_url 이 "deleted" 아닌 것만 조회
public class Image extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long imageId;

    @OneToOne(mappedBy = "image",fetch = FetchType.LAZY)
    private Diary diary;

    @NotNull
    @Column(nullable = false,length = 500)
    private String imageUrl;

    // 프롬프트 일단 생략


    public Image(Diary diary, String imageUrl) {
        this.diary = diary;
        this.imageUrl = imageUrl;
    }

    @Deprecated
    public void deleteImage(){
        this.imageUrl = "deleted";
    }
}
