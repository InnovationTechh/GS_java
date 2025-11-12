package com.innovationTech.saudemental.dto.paciente;

public record PacienteResponseDTO(
        Long id,
        String nome,
        String email,
        String dataNascimento
) {}
