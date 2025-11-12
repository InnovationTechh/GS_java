package com.innovationTech.saudemental.controller;

import com.innovationTech.saudemental.dto.registro.RegistroDiarioRequestDTO;
import com.innovationTech.saudemental.dto.registro.RegistroDiarioResponseDTO;
import com.innovationTech.saudemental.service.RegistroDiarioService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/registros")
@CrossOrigin(origins = "*") // << aqui!
public class RegistroDiarioController {

    private final RegistroDiarioService service;

    public RegistroDiarioController(RegistroDiarioService service) {
        this.service = service;
    }

    @GetMapping
    public List<RegistroDiarioResponseDTO> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public RegistroDiarioResponseDTO obter(@PathVariable("id") Long id) {
        return service.obter(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public RegistroDiarioResponseDTO criar(@Valid @RequestBody RegistroDiarioRequestDTO dto) {
        return service.criar(dto);
    }

    @PutMapping("/{id}")
    public RegistroDiarioResponseDTO atualizar(@PathVariable("id") Long id,
                                               @Valid @RequestBody RegistroDiarioRequestDTO dto) {
        return service.atualizar(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remover(@PathVariable("id") Long id) {
        service.remover(id);
    }

    @GetMapping("/paciente/{pacienteId}")
    public List<RegistroDiarioResponseDTO> listarPorPaciente(@PathVariable("pacienteId") Long pacienteId) {
        return service.listarPorPaciente(pacienteId);
    }
}
