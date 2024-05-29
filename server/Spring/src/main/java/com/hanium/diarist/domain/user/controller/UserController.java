package com.hanium.diarist.domain.user.controller;

import com.hanium.diarist.domain.user.domain.SocialCode;
import com.hanium.diarist.domain.user.domain.User;
import com.hanium.diarist.domain.user.dto.UserRegistrationRequest;
import com.hanium.diarist.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody UserRegistrationRequest request){
        User user = userService.registerUserTest(request.getEmail(), request.getName(), SocialCode.KAKAO);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }


}
