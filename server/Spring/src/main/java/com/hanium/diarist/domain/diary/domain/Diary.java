package com.hanium.diarist.domain.diary.domain;


import com.hanium.diarist.common.entity.BaseEntityWithUpdate;
import com.hanium.diarist.domain.artist.domain.Artist;
import com.hanium.diarist.domain.emotion.domain.Emotion;
import com.hanium.diarist.domain.user.domain.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Where;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Where(clause = "deleted_at is null") // deleted_at 이 null 인 것만 조회
public class Diary extends BaseEntityWithUpdate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long diaryId;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "user_id",nullable = false)
    private User user;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "emotion_id",nullable = false)
    private Emotion emotion;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "artist_id",nullable = false)
    private Artist artist;

    @Column(nullable = false)
    private LocalDate diaryDate;

    @Column(length = 8013)
    private String content;

    private LocalDateTime deletedAt;

    @NotNull
    private boolean favorite;

    @OneToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinColumn(name = "image_id")
    private Image image;


    public Diary(User user, Emotion emotion, Artist artist, LocalDate diaryDate, String content, boolean favorite, Image image) {
        this.user = user;
        this.emotion = emotion;
        this.artist = artist;
        this.diaryDate = diaryDate;
        this.content = content;
        this.favorite = favorite;
        this.image = null;
    }

    public void setEmotion(Emotion emotion) {
        this.emotion = emotion;
    }

    public void setArtist(Artist artist) {
        this.artist = artist;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setDeletedAt(LocalDateTime deletedAt) {
        this.deletedAt = deletedAt;
    }

    public void setFavorite(boolean favorite) {
        this.favorite = favorite;
    }

    public void setImage(Image image) {
        this.image = image;
    }
}
