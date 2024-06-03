package com.hanium.diarist.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig  implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173", // 리액트 웹 애플리케이션
                        "http://10.0.2.2:8081", // 리액트 네이티브 에뮬레이터 (안드로이드)
                        "http://localhost:8081", // 리액트 네이티브 에뮬레이터 (iOS)
//                        "http://<YOUR_DEVICE_IP>:8081", // 실제 디바이스의 IP 주소와 포트
                        "http://localhost:8000", // 장고 서버
                        "http://localhost:8080/swagger-ui/index.html",
//                        "http://<YOUR_DJANGO_SERVER_IP>:8000" // 장고 서버 IP 주소
                        "http://localhost:9092", // kafka 서버
                        "http://localhost:2181" // zookeeper 서버
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*")
                .allowCredentials(true);

    }
}
