package com.innovationTech.saudemental.mapper;

import com.innovationTech.saudemental.domain.entity.Paciente;
import com.innovationTech.saudemental.domain.entity.RegistroDiario;
import com.innovationTech.saudemental.dto.registro.RegistroDiarioRequestDTO;
import com.innovationTech.saudemental.dto.registro.RegistroDiarioResponseDTO;

import java.time.LocalDate;

public class RegistroDiarioMapper {
    public static RegistroDiario toEntity(RegistroDiarioRequestDTO dto, Paciente paciente){
        RegistroDiario r = new RegistroDiario();
        r.setDataRegistro(LocalDate.parse(dto.dataRegistro()));
        r.setNivelHumor(dto.nivelHumor());
        r.setNivelAnsiedade(dto.nivelAnsiedade());
        r.setHorasSono(dto.horasSono());
        r.setPaciente(paciente);
        return r;
    }
    public static RegistroDiarioResponseDTO toResponse(RegistroDiario r){
        return new RegistroDiarioResponseDTO(
                r.getId(),
                r.getDataRegistro().toString(),
                r.getNivelHumor(),
                r.getNivelAnsiedade(),
                r.getHorasSono(),
                r.getPaciente().getId()
        );
    }
}
