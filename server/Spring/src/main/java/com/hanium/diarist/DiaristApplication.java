package com.hanium.diarist;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;


@EnableJpaAuditing
//@EnableScheduling
@SpringBootApplication
public class DiaristApplication {

    public static void main(String[] args) {
        Dotenv dotenv = Dotenv.load();
        System.setProperty("DB_HOST", dotenv.get("DB_HOST"));
        System.setProperty("DB_PORT", dotenv.get("DB_PORT"));
        System.setProperty("DB_USERNAME", dotenv.get("DB_USERNAME"));
        System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));
        System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));
        System.setProperty("KAFKA_BOOTSTRAP_SERVERS", dotenv.get("KAFKA_BOOTSTRAP_SERVERS"));


        SpringApplication.run(DiaristApplication.class, args);
    }

}
