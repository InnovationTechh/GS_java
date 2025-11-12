package com.innovationTech.saudemental.seed;

import com.innovationTech.saudemental.domain.entity.Paciente;
import com.innovationTech.saudemental.domain.entity.RegistroDiario;
import com.innovationTech.saudemental.repository.PacienteRepository;
import com.innovationTech.saudemental.repository.RegistroDiarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final PacienteRepository pacRepo;
    private final RegistroDiarioRepository regRepo;

    public DataSeeder(PacienteRepository pacRepo, RegistroDiarioRepository regRepo) {
        this.pacRepo = pacRepo; this.regRepo = regRepo;
    }

    @Override
    public void run(String... args) {
        if (pacRepo.count() > 0) return;

        Paciente a = new Paciente(); a.setNome("Ana Silva"); a.setEmail("ana@ex.com"); a.setDataNascimento(LocalDate.of(1995,5,10));
        Paciente b = new Paciente(); b.setNome("Bruno Souza"); b.setEmail("bruno@ex.com"); b.setDataNascimento(LocalDate.of(1990,1,20));
        pacRepo.saveAll(List.of(a,b));

        RegistroDiario r1 = new RegistroDiario();
        r1.setDataRegistro(LocalDate.now());
        r1.setNivelHumor(3); r1.setNivelAnsiedade(2); r1.setHorasSono(7); r1.setPaciente(a);

        RegistroDiario r2 = new RegistroDiario();
        r2.setDataRegistro(LocalDate.now().minusDays(1));
        r2.setNivelHumor(4); r2.setNivelAnsiedade(1); r2.setHorasSono(8); r2.setPaciente(b);

        regRepo.saveAll(List.of(r1,r2));
    }
}
