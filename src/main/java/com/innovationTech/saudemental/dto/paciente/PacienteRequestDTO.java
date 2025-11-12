package com.innovationTech.saudemental.dto.paciente;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record PacienteRequestDTO(
        @NotBlank @Size(min=2, max=100) String nome,
        @NotBlank @Email String email,
        String dataNascimento // "YYYY-MM-DD"
) {}
