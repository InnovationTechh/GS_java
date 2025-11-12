package com.innovationTech.saudemental.domain.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

@Entity
@Table(name = "registros_diarios")
public class RegistroDiario {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private LocalDate dataRegistro;

    @Min(1) @Max(5)
    private int nivelHumor;

    @Min(0) @Max(5)
    private int nivelAnsiedade;

    @Min(0) @Max(24)
    private int horasSono;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "paciente_id")
    private Paciente paciente;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public LocalDate getDataRegistro() { return dataRegistro; }
    public void setDataRegistro(LocalDate dataRegistro) { this.dataRegistro = dataRegistro; }
    public int getNivelHumor() { return nivelHumor; }
    public void setNivelHumor(int nivelHumor) { this.nivelHumor = nivelHumor; }
    public int getNivelAnsiedade() { return nivelAnsiedade; }
    public void setNivelAnsiedade(int nivelAnsiedade) { this.nivelAnsiedade = nivelAnsiedade; }
    public int getHorasSono() { return horasSono; }
    public void setHorasSono(int horasSono) { this.horasSono = horasSono; }
    public Paciente getPaciente() { return paciente; }
    public void setPaciente(Paciente paciente) { this.paciente = paciente; }
}
