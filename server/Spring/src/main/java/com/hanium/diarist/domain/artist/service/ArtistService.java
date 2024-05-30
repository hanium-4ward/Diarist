package com.hanium.diarist.domain.artist.service;

import com.hanium.diarist.domain.artist.domain.Artist;
import com.hanium.diarist.domain.artist.dto.CreateArtistRequest;
import com.hanium.diarist.domain.artist.dto.CreateArtistResponse;
import com.hanium.diarist.domain.artist.repository.ArtistRepository;
import com.hanium.diarist.domain.emotion.domain.Emotion;
import com.hanium.diarist.domain.emotion.dto.CreateEmotionRequest;
import com.hanium.diarist.domain.emotion.dto.CreateEmotionResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ArtistService {

    private final ArtistRepository artistRepository;

    @Transactional
    public List<CreateArtistResponse> createArtists(List<CreateArtistRequest> createArtistRequests) {
        ArrayList<CreateArtistResponse> artistResponses = new ArrayList<>();
        for (CreateArtistRequest request : createArtistRequests) {
            Artist artist = request.toArtistEntity();// request를 화가 객체로 변환
            Artist save = artistRepository.save(artist);// artist DB에 저장
            artistResponses.add(CreateArtistResponse.of(save));// 저장된 객체를 response로 변환
        }
        return artistResponses;


    }
}
