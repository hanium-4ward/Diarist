package com.hanium.diarist.domain.artist.dto;

import com.hanium.diarist.domain.artist.domain.Artist;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CreateArtistResponse {
    private final Long artistId;
    private final String artistName;
    private final String artistPicture;
    private final String description;

    public static CreateArtistResponse of(Artist artist) {
        return new CreateArtistResponse(artist.getArtistId(), artist.getArtistName(), artist.getArtistPicture(), artist.getDescription());
    }


}
