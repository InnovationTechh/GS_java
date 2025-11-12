package com.innovationTech.saudemental.dto.registro;

import jakarta.validation.constraints.*;

public record RegistroDiarioRequestDTO(
        @NotBlank String dataRegistro, // "YYYY-MM-DD"
        @Min(1) @Max(5) int nivelHumor,
        @Min(0) @Max(5) int nivelAnsiedade,
        @Min(0) @Max(24) int horasSono,
        @NotNull Long pacienteId
) {}
