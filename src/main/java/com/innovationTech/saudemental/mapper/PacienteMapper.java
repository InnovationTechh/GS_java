package com.innovationTech.saudemental.mapper;

import com.innovationTech.saudemental.domain.entity.Paciente;
import com.innovationTech.saudemental.dto.paciente.PacienteRequestDTO;
import com.innovationTech.saudemental.dto.paciente.PacienteResponseDTO;

import java.time.LocalDate;

public class PacienteMapper {
    public static Paciente toEntity(PacienteRequestDTO dto){
        Paciente p = new Paciente();
        p.setNome(dto.nome());
        p.setEmail(dto.email());
        if (dto.dataNascimento()!=null && !dto.dataNascimento().isBlank())
            p.setDataNascimento(LocalDate.parse(dto.dataNascimento()));
        return p;
    }
    public static PacienteResponseDTO toResponse(Paciente p){
        String dn = p.getDataNascimento()!=null ? p.getDataNascimento().toString() : null;
        return new PacienteResponseDTO(p.getId(), p.getNome(), p.getEmail(), dn);
    }
}
