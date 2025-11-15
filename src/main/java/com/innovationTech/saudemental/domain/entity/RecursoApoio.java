package com.innovationTech.saudemental.domain.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "recursos_apoio")
public class RecursoApoio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(min = 2, max = 150)
    private String titulo;

    @Size(max = 500)
    private String descricao;

    @NotBlank
    private String tipo; // "ARTIGO" ou "VIDEO"

    @NotBlank
    private String link; // URL do vídeo ou artigo

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }

    public String getLink() { return link; }
    public void setLink(String link) { this.link = link; }
}
