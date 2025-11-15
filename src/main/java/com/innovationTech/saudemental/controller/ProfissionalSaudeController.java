package com.innovationTech.saudemental.controller;

import com.innovationTech.saudemental.dto.profissional.ProfissionalRequestDTO;
import com.innovationTech.saudemental.dto.profissional.ProfissionalResponseDTO;
import com.innovationTech.saudemental.service.ProfissionalSaudeService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/profissionais")
@CrossOrigin(origins = "*")
public class ProfissionalSaudeController {

    private final ProfissionalSaudeService service;

    public ProfissionalSaudeController(ProfissionalSaudeService service) {
        this.service = service;
    }

    @GetMapping
    public List<ProfissionalResponseDTO> listar() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public ProfissionalResponseDTO buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProfissionalResponseDTO criar(@Valid @RequestBody ProfissionalRequestDTO dto) {
        return service.criar(dto);
    }

    @PutMapping("/{id}")
    public ProfissionalResponseDTO atualizar(@PathVariable Long id,
                                             @Valid @RequestBody ProfissionalRequestDTO dto) {
        return service.atualizar(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remover(@PathVariable Long id) {
        service.remover(id);
    }
}
