package com.innovationTech.saudemental.service;

import com.innovationTech.saudemental.domain.entity.Paciente;
import com.innovationTech.saudemental.domain.entity.RegistroDiario;
import com.innovationTech.saudemental.dto.registro.RegistroDiarioRequestDTO;
import com.innovationTech.saudemental.dto.registro.RegistroDiarioResponseDTO;
import com.innovationTech.saudemental.exception.NotFoundException;
import com.innovationTech.saudemental.mapper.RegistroDiarioMapper;
import com.innovationTech.saudemental.repository.PacienteRepository;
import com.innovationTech.saudemental.repository.RegistroDiarioRepository;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class RegistroDiarioService {

    private final RegistroDiarioRepository regRepo;
    private final PacienteRepository pacRepo;

    public RegistroDiarioService(RegistroDiarioRepository regRepo, PacienteRepository pacRepo) {
        this.regRepo = regRepo; this.pacRepo = pacRepo;
    }

    public List<RegistroDiarioResponseDTO> listar() {
        return regRepo.findAll().stream().map(RegistroDiarioMapper::toResponse).toList();
    }

    public RegistroDiarioResponseDTO obter(Long id) {
        RegistroDiario r = regRepo.findById(id).orElseThrow(() -> new NotFoundException("Registro não encontrado"));
        return RegistroDiarioMapper.toResponse(r);
    }

    public RegistroDiarioResponseDTO criar(@Valid RegistroDiarioRequestDTO dto) {
        Paciente p = pacRepo.findById(dto.pacienteId())
                .orElseThrow(() -> new NotFoundException("Paciente não encontrado"));
        RegistroDiario r = RegistroDiarioMapper.toEntity(dto, p);
        return RegistroDiarioMapper.toResponse(regRepo.save(r));
    }

    public RegistroDiarioResponseDTO atualizar(Long id, @Valid RegistroDiarioRequestDTO dto) {
        RegistroDiario r = regRepo.findById(id).orElseThrow(() -> new NotFoundException("Registro não encontrado"));
        Paciente p = pacRepo.findById(dto.pacienteId())
                .orElseThrow(() -> new NotFoundException("Paciente não encontrado"));

        r.setDataRegistro(LocalDate.parse(dto.dataRegistro()));
        r.setNivelHumor(dto.nivelHumor());
        r.setNivelAnsiedade(dto.nivelAnsiedade());
        r.setHorasSono(dto.horasSono());
        r.setPaciente(p);

        return RegistroDiarioMapper.toResponse(regRepo.save(r));
    }

    public void remover(Long id) {
        if (!regRepo.existsById(id)) throw new NotFoundException("Registro não encontrado");
        regRepo.deleteById(id);
    }

    public List<RegistroDiarioResponseDTO> listarPorPaciente(Long pacienteId) {
        if (!pacRepo.existsById(pacienteId)) throw new NotFoundException("Paciente não encontrado");
        return regRepo.findByPacienteId(pacienteId).stream().map(RegistroDiarioMapper::toResponse).toList();
    }
}
