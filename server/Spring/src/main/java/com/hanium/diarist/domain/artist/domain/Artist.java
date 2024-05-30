package com.hanium.diarist.domain.artist.domain;

import com.hanium.diarist.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Artist extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long artistId;

    @Column(nullable = false)
    private String artistName;

    @Column(nullable = false)
    private String artistPrompt;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING) // Enum 값을 String으로 바꿔서 DB에 저장
    private Period period;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String artistPicture;


    @Builder(access = AccessLevel.PRIVATE)
    public Artist(String artistName, String artistPrompt, Period period, String description, String artistPicture) {
        this.artistName = artistName;
        this.artistPrompt = artistPrompt;
        this.period = period;
        this.description = description;
        this.artistPicture = artistPicture;
    }

    public static Artist create(String artistName, String artistPrompt, Period period, String description, String artistPicture) {
        return Artist.builder()
                .artistName(artistName)
                .artistPrompt(artistPrompt)
                .period(period)
                .description(description)
                .artistPicture(artistPicture)
                .build();
    }


}
