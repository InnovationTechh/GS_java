package com.innovationTech.saudemental.mapper;

import com.innovationTech.saudemental.domain.entity.RecursoApoio;
import com.innovationTech.saudemental.dto.recurso.RecursoApoioRequestDTO;
import com.innovationTech.saudemental.dto.recurso.RecursoApoioResponseDTO;

public class RecursoApoioMapper {

    public static RecursoApoio toEntity(RecursoApoioRequestDTO dto) {
        RecursoApoio r = new RecursoApoio();
        r.setTitulo(dto.titulo());
        r.setDescricao(dto.descricao());
        r.setTipo(dto.tipo());
        r.setLink(dto.link());
        return r;
    }

    public static RecursoApoioResponseDTO toResponse(RecursoApoio r) {
        return new RecursoApoioResponseDTO(
                r.getId(),
                r.getTitulo(),
                r.getDescricao(),
                r.getTipo(),
                r.getLink()
        );
    }
}
