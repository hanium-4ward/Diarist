package com.hanium.diarist.domain.user.domain;

import com.hanium.diarist.common.entity.BaseEntityWithUpdate;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Where;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Where(clause = "deleted_at is null") // deleted_at 이 null 인 것만 조회
@Table(name = "users")
public class User extends BaseEntityWithUpdate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private SocialCode socialCode;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private UserRole userRole;

    private LocalDateTime deletedAt;

    @Builder(access = AccessLevel.PRIVATE)// private 생성자를 만들어줌
    public User(String name, String email, SocialCode socialCode) {
        this.name = name;
        this.email = email;
        this.socialCode = socialCode;
        this.userRole = UserRole.USER;
    }

    public static User create(String email, String name, SocialCode socialCode) {
        return User.builder()
                .email(email)
                .name(name)
                .socialCode(socialCode)
                .build();
    }// 유저 생성자. 이메일과 소셜코드를 받아서 유저를 생성함

    public void setEmail(String email) {
        this.email = email;
    }// 이메일을 변경함

    public void deleteUser() {
        this.deletedAt = LocalDateTime.now();
    }// 유저를 삭제함

}
