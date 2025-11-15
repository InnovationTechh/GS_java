package com.innovationTech.saudemental.dto.recurso;

public record RecursoApoioResponseDTO(
        Long id,
        String titulo,
        String descricao,
        String tipo,
        String link
) {}
