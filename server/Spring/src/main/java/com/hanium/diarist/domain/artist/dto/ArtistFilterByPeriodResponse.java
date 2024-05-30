package com.hanium.diarist.domain.artist.dto;

import com.hanium.diarist.domain.artist.domain.Artist;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ArtistFilterByPeriodResponse {
    private final String artistName;
    private final String artistPicture;
    private final String description;


    public static ArtistFilterByPeriodResponse of(Artist artist) {
        return new ArtistFilterByPeriodResponse(artist.getArtistName(), artist.getArtistPicture(), artist.getDescription());
    }

}





