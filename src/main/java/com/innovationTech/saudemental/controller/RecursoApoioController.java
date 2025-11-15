package com.innovationTech.saudemental.controller;

import com.innovationTech.saudemental.dto.recurso.RecursoApoioRequestDTO;
import com.innovationTech.saudemental.dto.recurso.RecursoApoioResponseDTO;
import com.innovationTech.saudemental.service.RecursoApoioService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recursos")
@CrossOrigin(origins = "*")
public class RecursoApoioController {

    private final RecursoApoioService service;

    public RecursoApoioController(RecursoApoioService service) {
        this.service = service;
    }

    @GetMapping
    public List<RecursoApoioResponseDTO> listar() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public RecursoApoioResponseDTO buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public RecursoApoioResponseDTO criar(@Valid @RequestBody RecursoApoioRequestDTO dto) {
        return service.criar(dto);
    }

    @PutMapping("/{id}")
    public RecursoApoioResponseDTO atualizar(@PathVariable Long id,
                                             @Valid @RequestBody RecursoApoioRequestDTO dto) {
        return service.atualizar(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remover(@PathVariable Long id) {
        service.remover(id);
    }
}
