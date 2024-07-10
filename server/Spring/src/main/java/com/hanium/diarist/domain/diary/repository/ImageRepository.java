package com.hanium.diarist.domain.diary.repository;

import com.hanium.diarist.domain.diary.domain.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long>{
}
