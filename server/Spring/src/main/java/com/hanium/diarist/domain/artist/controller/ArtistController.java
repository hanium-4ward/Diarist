package com.hanium.diarist.domain.artist.controller;

import com.hanium.diarist.domain.artist.dto.CreateArtistRequest;
import com.hanium.diarist.domain.artist.dto.CreateArtistResponse;
import com.hanium.diarist.domain.artist.service.ArtistService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/artist")
@RequiredArgsConstructor
public class ArtistController {
    private final ArtistService artistService;

    @PostMapping("/create")
    public ResponseEntity<List<CreateArtistResponse>> createArtists(@RequestBody List<CreateArtistRequest> createArtistRequests) {
        List<CreateArtistResponse> artists = artistService.createArtists(createArtistRequests);
        return new ResponseEntity<>(artists, HttpStatus.CREATED);
    }
}
