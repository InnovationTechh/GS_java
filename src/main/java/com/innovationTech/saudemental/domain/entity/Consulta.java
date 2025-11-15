package com.innovationTech.saudemental.domain.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

@Entity
@Table(name = "consultas")
public class Consulta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne
    private Paciente paciente;

    @NotNull
    @ManyToOne
    private ProfissionalSaude profissional;

    @NotNull
    private LocalDateTime dataHora;

    @NotNull
    private String tipoAtendimento; // ONLINE / PRESENCIAL

    @NotNull
    private String status; // AGENDADA / REALIZADA / CANCELADA

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Paciente getPaciente() {
        return paciente;
    }

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
    }

    public ProfissionalSaude getProfissional() {
        return profissional;
    }

    public void setProfissional(ProfissionalSaude profissional) {
        this.profissional = profissional;
    }

    public LocalDateTime getDataHora() {
        return dataHora;
    }

    public void setDataHora(LocalDateTime dataHora) {
        this.dataHora = dataHora;
    }

    public String getTipoAtendimento() {
        return tipoAtendimento;
    }

    public void setTipoAtendimento(String tipoAtendimento) {
        this.tipoAtendimento = tipoAtendimento;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
