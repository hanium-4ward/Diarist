package com.hanium.diarist.domain.user.controller;

import com.hanium.diarist.domain.user.domain.SocialCode;
import com.hanium.diarist.domain.user.domain.User;
import com.hanium.diarist.domain.user.dto.UserRegistrationRequest;
import com.hanium.diarist.domain.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
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
    @Operation(summary = "회원가입", description = "유저 등록 API.")
    @ApiResponse(responseCode = "200", description = "유저 등록 성공")
    public ResponseEntity<User> registerUser(@RequestBody UserRegistrationRequest request){
        User user = userService.registerUserTest(request.getEmail(), request.getName(), SocialCode.KAKAO);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }


}
