package com.hanium.diarist.domain.user.service;

import com.hanium.diarist.domain.user.domain.SocialCode;
import com.hanium.diarist.domain.user.domain.User;
import com.hanium.diarist.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    // 테스트용 회원가입 메서드
    @Transactional
    public User registerUserTest(String email, String name, SocialCode socialCode){
        User user = userRepository.save(User.create(email, name, socialCode));
        return user;
    }

    @Transactional
    public User registerUser(String email, String name,SocialCode socialCode, String refreshToken){
        User user = userRepository.save(User.create(email,name, socialCode));
//        authRepository.save(Auth.create(user, refreshToken);
        return user;
    }

}
