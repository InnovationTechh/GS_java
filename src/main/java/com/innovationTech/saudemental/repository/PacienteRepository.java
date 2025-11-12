package com.innovationTech.saudemental.repository;

import com.innovationTech.saudemental.domain.entity.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PacienteRepository extends JpaRepository<Paciente, Long> {
    boolean existsByEmail(String email);
}
