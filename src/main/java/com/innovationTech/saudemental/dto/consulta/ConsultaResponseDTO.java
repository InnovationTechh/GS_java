package com.innovationTech.saudemental.dto.consulta;

public record ConsultaResponseDTO(
        Long id,
        Long pacienteId,
        Long profissionalId,
        String dataHora,
        String tipoAtendimento,
        String status
) {}
