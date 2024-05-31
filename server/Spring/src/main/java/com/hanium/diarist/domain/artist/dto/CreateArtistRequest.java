package com.hanium.diarist.domain.artist.dto;

import com.hanium.diarist.domain.artist.domain.Artist;
import com.hanium.diarist.domain.artist.domain.Period;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class CreateArtistRequest {
    private String artistName;
    private String artistPicture;
    private String description;
    private Period period;
    private String prompt;

    public Artist toArtistEntity() {
        return Artist.create(artistName, prompt,period, description ,artistPicture);

    }

}
