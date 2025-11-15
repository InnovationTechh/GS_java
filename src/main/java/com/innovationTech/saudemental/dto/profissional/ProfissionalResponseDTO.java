package com.innovationTech.saudemental.dto.profissional;

public record ProfissionalResponseDTO(
        Long id,
        String nome,
        String especialidade,
        String registroProfissional,
        String email,
        String telefone
) {}
