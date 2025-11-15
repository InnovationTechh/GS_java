package com.innovationTech.saudemental.dto.profissional;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ProfissionalRequestDTO(
        @NotBlank @Size(min = 2, max = 100) String nome,
        @NotBlank @Size(min = 2, max = 100) String especialidade,
        @NotBlank @Size(min = 3, max = 50) String registroProfissional,
        @Email String email,
        String telefone
) {}
