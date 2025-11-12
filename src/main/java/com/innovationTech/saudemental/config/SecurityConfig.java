package com.innovationTech.saudemental.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // API REST não usa sessão nem formulário; desabilite CSRF
                .csrf(csrf -> csrf.disable())

                // autorizações
                .authorizeHttpRequests(auth -> auth
                        // libera totalmente a API
                        .requestMatchers("/api/**").permitAll()
                        // libera H2 console (dev)
                        .requestMatchers("/h2-console/**").permitAll()
                        // qualquer outra coisa também liberada (ajuste se quiser travar estáticos, etc.)
                        .anyRequest().permitAll()
                )

                // H2 console usa frames
                .headers(headers -> headers.frameOptions(frame -> frame.sameOrigin()))

                // sem login, sem httpBasic/form
                .httpBasic(Customizer.withDefaults());

        return http.build();
    }
}
