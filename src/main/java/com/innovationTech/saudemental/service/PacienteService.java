package com.innovationTech.saudemental.service;

import com.innovationTech.saudemental.domain.entity.Paciente;
import com.innovationTech.saudemental.dto.paciente.PacienteRequestDTO;
import com.innovationTech.saudemental.dto.paciente.PacienteResponseDTO;
import com.innovationTech.saudemental.exception.NotFoundException;
import com.innovationTech.saudemental.mapper.PacienteMapper;
import com.innovationTech.saudemental.repository.PacienteRepository;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class PacienteService {

    private final PacienteRepository repo;

    public PacienteService(PacienteRepository repo) { this.repo = repo; }

    public List<PacienteResponseDTO> listar() {
        return repo.findAll().stream().map(PacienteMapper::toResponse).toList();
    }

    public PacienteResponseDTO obter(Long id) {
        Paciente p = repo.findById(id).orElseThrow(() -> new NotFoundException("Paciente não encontrado"));
        return PacienteMapper.toResponse(p);
    }

    public PacienteResponseDTO criar(@Valid PacienteRequestDTO dto) {
        if (repo.existsByEmail(dto.email())) throw new IllegalArgumentException("Email já cadastrado");
        Paciente p = PacienteMapper.toEntity(dto);
        return PacienteMapper.toResponse(repo.save(p));
    }

    public PacienteResponseDTO atualizar(Long id, @Valid PacienteRequestDTO dto) {
        Paciente p = repo.findById(id).orElseThrow(() -> new NotFoundException("Paciente não encontrado"));
        p.setNome(dto.nome());
        p.setEmail(dto.email());
        p.setDataNascimento(dto.dataNascimento()!=null && !dto.dataNascimento().isBlank()
                ? LocalDate.parse(dto.dataNascimento()) : null);
        return PacienteMapper.toResponse(repo.save(p));
    }

    public void remover(Long id) {
        if (!repo.existsById(id)) throw new NotFoundException("Paciente não encontrado");
        repo.deleteById(id);
    }
}
