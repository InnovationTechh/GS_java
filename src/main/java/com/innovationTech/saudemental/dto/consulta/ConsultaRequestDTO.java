package com.innovationTech.saudemental.dto.consulta;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ConsultaRequestDTO(
        @NotNull Long pacienteId,
        @NotNull Long profissionalId,
        @NotBlank String dataHora,       // Ex.: "2025-11-15T14:30"
        @NotBlank String tipoAtendimento // "ONLINE" ou "PRESENCIAL"
) {}
