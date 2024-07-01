package com.hanium.diarist.domain.user.repository;

import com.hanium.diarist.domain.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUserId(Long userId); // ID로 유저 찾기

    List<User> findAllByEmail(String email);// Email로 유저 찾기


}

