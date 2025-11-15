package com.innovationTech.saudemental.service;

import com.innovationTech.saudemental.domain.entity.ProfissionalSaude;
import com.innovationTech.saudemental.dto.profissional.ProfissionalRequestDTO;
import com.innovationTech.saudemental.dto.profissional.ProfissionalResponseDTO;
import com.innovationTech.saudemental.exception.NotFoundException;
import com.innovationTech.saudemental.mapper.ProfissionalMapper;
import com.innovationTech.saudemental.repository.ProfissionalSaudeRepository;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfissionalSaudeService {

    private final ProfissionalSaudeRepository repo;

    public ProfissionalSaudeService(ProfissionalSaudeRepository repo) {
        this.repo = repo;
    }

    public List<ProfissionalResponseDTO> listarTodos() {
        return repo.findAll().stream().map(ProfissionalMapper::toResponse).toList();
    }

    public ProfissionalResponseDTO buscarPorId(Long id) {
        ProfissionalSaude p = repo.findById(id)
                .orElseThrow(() -> new NotFoundException("Profissional de saúde não encontrado"));
        return ProfissionalMapper.toResponse(p);
    }

    public ProfissionalResponseDTO criar(@Valid ProfissionalRequestDTO dto) {
        ProfissionalSaude p = ProfissionalMapper.toEntity(dto);
        return ProfissionalMapper.toResponse(repo.save(p));
    }

    public ProfissionalResponseDTO atualizar(Long id, @Valid ProfissionalRequestDTO dto) {
        ProfissionalSaude p = repo.findById(id)
                .orElseThrow(() -> new NotFoundException("Profissional de saúde não encontrado"));
        p.setNome(dto.nome());
        p.setEspecialidade(dto.especialidade());
        p.setRegistroProfissional(dto.registroProfissional());
        p.setEmail(dto.email());
        p.setTelefone(dto.telefone());
        return ProfissionalMapper.toResponse(repo.save(p));
    }

    public void remover(Long id) {
        if (!repo.existsById(id)) {
            throw new NotFoundException("Profissional de saúde não encontrado");
        }
        repo.deleteById(id);
    }
}
