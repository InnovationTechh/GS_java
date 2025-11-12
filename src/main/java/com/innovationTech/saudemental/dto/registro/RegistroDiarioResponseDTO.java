package com.innovationTech.saudemental.dto.registro;

public record RegistroDiarioResponseDTO(
        Long id,
        String dataRegistro,
        int nivelHumor,
        int nivelAnsiedade,
        int horasSono,
        Long pacienteId
) {}
