package com.innovationTech.saudemental.dto.recurso;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RecursoApoioRequestDTO(
        @NotBlank @Size(min = 2, max = 150) String titulo,
        String descricao,
        @NotBlank String tipo, // "ARTIGO" ou "VIDEO"
        @NotBlank String link
) {}
