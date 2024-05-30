package com.hanium.diarist.domain.artist.repository;

import com.hanium.diarist.domain.artist.domain.Artist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArtistRepository extends JpaRepository<Artist, Long> {

}
