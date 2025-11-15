package com.innovationTech.saudemental.mapper;

import com.innovationTech.saudemental.domain.entity.ProfissionalSaude;
import com.innovationTech.saudemental.dto.profissional.ProfissionalRequestDTO;
import com.innovationTech.saudemental.dto.profissional.ProfissionalResponseDTO;

public class ProfissionalMapper {

    public static ProfissionalSaude toEntity(ProfissionalRequestDTO dto) {
        ProfissionalSaude p = new ProfissionalSaude();
        p.setNome(dto.nome());
        p.setEspecialidade(dto.especialidade());
        p.setRegistroProfissional(dto.registroProfissional());
        p.setEmail(dto.email());
        p.setTelefone(dto.telefone());
        return p;
    }

    public static ProfissionalResponseDTO toResponse(ProfissionalSaude p) {
        return new ProfissionalResponseDTO(
                p.getId(),
                p.getNome(),
                p.getEspecialidade(),
                p.getRegistroProfissional(),
                p.getEmail(),
                p.getTelefone()
        );
    }
}
