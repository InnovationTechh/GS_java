package com.innovationTech.saudemental.service;

import com.innovationTech.saudemental.domain.entity.RecursoApoio;
import com.innovationTech.saudemental.dto.recurso.RecursoApoioRequestDTO;
import com.innovationTech.saudemental.dto.recurso.RecursoApoioResponseDTO;
import com.innovationTech.saudemental.exception.NotFoundException;
import com.innovationTech.saudemental.mapper.RecursoApoioMapper;
import com.innovationTech.saudemental.repository.RecursoApoioRepository;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecursoApoioService {

    private final RecursoApoioRepository repo;

    public RecursoApoioService(RecursoApoioRepository repo) {
        this.repo = repo;
    }

    public List<RecursoApoioResponseDTO> listarTodos() {
        return repo.findAll().stream().map(RecursoApoioMapper::toResponse).toList();
    }

    public RecursoApoioResponseDTO buscarPorId(Long id) {
        RecursoApoio r = repo.findById(id)
                .orElseThrow(() -> new NotFoundException("Recurso de apoio não encontrado"));
        return RecursoApoioMapper.toResponse(r);
    }

    public RecursoApoioResponseDTO criar(@Valid RecursoApoioRequestDTO dto) {
        RecursoApoio r = RecursoApoioMapper.toEntity(dto);
        return RecursoApoioMapper.toResponse(repo.save(r));
    }

    public RecursoApoioResponseDTO atualizar(Long id, @Valid RecursoApoioRequestDTO dto) {
        RecursoApoio r = repo.findById(id)
                .orElseThrow(() -> new NotFoundException("Recurso de apoio não encontrado"));
        r.setTitulo(dto.titulo());
        r.setDescricao(dto.descricao());
        r.setTipo(dto.tipo());
        r.setLink(dto.link());
        return RecursoApoioMapper.toResponse(repo.save(r));
    }

    public void remover(Long id) {
        if (!repo.existsById(id)) {
            throw new NotFoundException("Recurso de apoio não encontrado");
        }
        repo.deleteById(id);
    }
}
