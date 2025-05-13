package com.tripmate.SpringOAuth2;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
            .authorizeHttpRequests(requests -> requests
                .anyRequest().authenticated()
            )
            // .oauth2Login(oauth2Login -> oauth2Login.defaultSuccessUrl("/"))
            .oauth2Login(oauth2Login -> oauth2Login.defaultSuccessUrl("/showmap", true))
            .build();
    }
}