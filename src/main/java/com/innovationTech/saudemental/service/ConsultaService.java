package com.innovationTech.saudemental.service;

import com.innovationTech.saudemental.domain.entity.Consulta;
import com.innovationTech.saudemental.domain.entity.Paciente;
import com.innovationTech.saudemental.domain.entity.ProfissionalSaude;
import com.innovationTech.saudemental.dto.consulta.ConsultaRequestDTO;
import com.innovationTech.saudemental.dto.consulta.ConsultaResponseDTO;
import com.innovationTech.saudemental.exception.NotFoundException;
import com.innovationTech.saudemental.mapper.ConsultaMapper;
import com.innovationTech.saudemental.repository.ConsultaRepository;
import com.innovationTech.saudemental.repository.PacienteRepository;
import com.innovationTech.saudemental.repository.ProfissionalSaudeRepository;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConsultaService {

    private final ConsultaRepository consultaRepo;
    private final PacienteRepository pacienteRepo;
    private final ProfissionalSaudeRepository profissionalRepo;

    public ConsultaService(ConsultaRepository consultaRepo,
                           PacienteRepository pacienteRepo,
                           ProfissionalSaudeRepository profissionalRepo) {
        this.consultaRepo = consultaRepo;
        this.pacienteRepo = pacienteRepo;
        this.profissionalRepo = profissionalRepo;
    }

    public List<ConsultaResponseDTO> listarTodas() {
        return consultaRepo.findAll().stream()
                .map(ConsultaMapper::toResponse)
                .toList();
    }

    public List<ConsultaResponseDTO> listarPorPaciente(Long pacienteId) {
        return consultaRepo.findByPacienteId(pacienteId).stream()
                .map(ConsultaMapper::toResponse)
                .toList();
    }

    public List<ConsultaResponseDTO> listarPorProfissional(Long profissionalId) {
        return consultaRepo.findByProfissionalId(profissionalId).stream()
                .map(ConsultaMapper::toResponse)
                .toList();
    }

    public ConsultaResponseDTO criar(@Valid ConsultaRequestDTO dto) {
        Paciente p = pacienteRepo.findById(dto.pacienteId())
                .orElseThrow(() -> new NotFoundException("Paciente não encontrado"));
        ProfissionalSaude prof = profissionalRepo.findById(dto.profissionalId())
                .orElseThrow(() -> new NotFoundException("Profissional de saúde não encontrado"));

        Consulta c = ConsultaMapper.toEntity(dto, p, prof);
        return ConsultaMapper.toResponse(consultaRepo.save(c));
    }

    public ConsultaResponseDTO atualizar(Long id, @Valid ConsultaRequestDTO dto) {
        Consulta c = consultaRepo.findById(id)
                .orElseThrow(() -> new NotFoundException("Consulta não encontrada"));

        Paciente p = pacienteRepo.findById(dto.pacienteId())
                .orElseThrow(() -> new NotFoundException("Paciente não encontrado"));
        ProfissionalSaude prof = profissionalRepo.findById(dto.profissionalId())
                .orElseThrow(() -> new NotFoundException("Profissional de saúde não encontrado"));

        ConsultaMapper.updateEntity(c, dto, p, prof);
        return ConsultaMapper.toResponse(consultaRepo.save(c));
    }

    public ConsultaResponseDTO atualizarStatus(Long id, String status) {
        Consulta c = consultaRepo.findById(id)
                .orElseThrow(() -> new NotFoundException("Consulta não encontrada"));
        c.setStatus(status);
        return ConsultaMapper.toResponse(consultaRepo.save(c));
    }

    public void remover(Long id) {
        if (!consultaRepo.existsById(id)) {
            throw new NotFoundException("Consulta não encontrada");
        }
        consultaRepo.deleteById(id);
    }
}
