package com.innovationTech.saudemental.mapper;

import com.innovationTech.saudemental.domain.entity.Consulta;
import com.innovationTech.saudemental.domain.entity.Paciente;
import com.innovationTech.saudemental.domain.entity.ProfissionalSaude;
import com.innovationTech.saudemental.dto.consulta.ConsultaRequestDTO;
import com.innovationTech.saudemental.dto.consulta.ConsultaResponseDTO;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class ConsultaMapper {

    // Aceita formato vindo do front: "yyyy-MM-dd'T'HH:mm"
    private static final DateTimeFormatter FORMATTER =
            DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");

    private static LocalDateTime parseDataHora(String value) {
        // se vier com segundos (yyyy-MM-ddTHH:mm:ss), corta para HH:mm
        if (value != null && value.length() == 19 && value.charAt(10) == 'T') {
            // exemplo: 2025-11-15T14:30:00 -> 2025-11-15T14:30
            value = value.substring(0, 16);
        }
        return LocalDateTime.parse(value, FORMATTER);
    }

    public static Consulta toEntity(ConsultaRequestDTO dto, Paciente paciente, ProfissionalSaude prof) {
        Consulta c = new Consulta();
        c.setPaciente(paciente);
        c.setProfissional(prof);
        c.setDataHora(parseDataHora(dto.dataHora()));
        c.setTipoAtendimento(dto.tipoAtendimento());
        c.setStatus("AGENDADA");
        return c;
    }

    public static void updateEntity(Consulta c, ConsultaRequestDTO dto, Paciente paciente, ProfissionalSaude prof) {
        c.setPaciente(paciente);
        c.setProfissional(prof);
        c.setDataHora(parseDataHora(dto.dataHora()));
        c.setTipoAtendimento(dto.tipoAtendimento());
        // status permanece o que já estava (AGENDADA / REALIZADA / CANCELADA)
    }

    public static ConsultaResponseDTO toResponse(Consulta c) {
        return new ConsultaResponseDTO(
                c.getId(),
                c.getPaciente().getId(),
                c.getProfissional().getId(),
                c.getDataHora().toString(), // volta como "yyyy-MM-ddTHH:mm:ss"
                c.getTipoAtendimento(),
                c.getStatus()
        );
    }
}
