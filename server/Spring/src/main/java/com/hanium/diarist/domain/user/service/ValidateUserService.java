package com.hanium.diarist.domain.user.service;

import com.hanium.diarist.domain.user.domain.User;
import com.hanium.diarist.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class ValidateUserService {
    private final UserRepository userRepository;

    public User validateRegisteredUserByEmail(String email) {
        return userRepository.findAllByEmail(email).stream().findFirst().orElse(null);
    }

}
