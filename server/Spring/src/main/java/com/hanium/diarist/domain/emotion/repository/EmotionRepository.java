package com.hanium.diarist.domain.emotion.repository;

import com.hanium.diarist.domain.emotion.domain.Emotion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmotionRepository extends JpaRepository<Emotion, Long>{

}
