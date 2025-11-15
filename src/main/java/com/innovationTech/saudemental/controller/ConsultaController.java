package com.innovationTech.saudemental.controller;

import com.innovationTech.saudemental.dto.consulta.ConsultaRequestDTO;
import com.innovationTech.saudemental.dto.consulta.ConsultaResponseDTO;
import com.innovationTech.saudemental.service.ConsultaService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/consultas")
@CrossOrigin(origins = "*")
public class ConsultaController {

    private final ConsultaService service;

    public ConsultaController(ConsultaService service) {
        this.service = service;
    }

    @GetMapping
    public List<ConsultaResponseDTO> listarTodas() {
        return service.listarTodas();
    }

    @GetMapping("/paciente/{pacienteId}")
    public List<ConsultaResponseDTO> listarPorPaciente(@PathVariable Long pacienteId) {
        return service.listarPorPaciente(pacienteId);
    }

    @GetMapping("/profissional/{profissionalId}")
    public List<ConsultaResponseDTO> listarPorProfissional(@PathVariable Long profissionalId) {
        return service.listarPorProfissional(profissionalId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ConsultaResponseDTO criar(@Valid @RequestBody ConsultaRequestDTO dto) {
        return service.criar(dto);
    }

    @PutMapping("/{id}")
    public ConsultaResponseDTO atualizar(@PathVariable Long id,
                                         @Valid @RequestBody ConsultaRequestDTO dto) {
        return service.atualizar(id, dto);
    }

    @PatchMapping("/{id}/status")
    public ConsultaResponseDTO atualizarStatus(@PathVariable Long id,
                                               @RequestParam String status) {
        return service.atualizarStatus(id, status);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remover(@PathVariable Long id) {
        service.remover(id);
    }
}
