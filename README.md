# 🌿 Global Solution 2025 — O Futuro do Trabalho  
## Plataforma de Monitoramento de Saúde Mental 🧠  
**Grupo:** InnovationTech

---

## 📘 Contexto

A saúde mental e o bem-estar tornaram-se prioridades globais. O aumento de casos de burnout, ansiedade e estresse exige novas soluções.  
A tecnologia é uma poderosa aliada, permitindo que indivíduos monitorem seu estado emocional, registrem sentimentos e acessem recursos de apoio.  

Dentro da proposta **Global Solution — O Futuro do Trabalho**, este projeto propõe uma **API RESTful** integrada a um **frontend em React**, focada no registro e acompanhamento de pacientes e seus indicadores de bem-estar (humor, ansiedade e sono).

---

## 🎯 Objetivo

Desenvolver uma **plataforma completa** para monitoramento da saúde mental, composta por:

- **Backend (API RESTful)** em **Java + Spring Boot**  
- **Frontend (Interface Web)** em **React + Vite**  
- **Banco de Dados**: MySQL  
- **Arquitetura em camadas:** Controller → Service → Repository  
- **Validações:** Bean Validation  
- **Persistência:** Spring Data JPA  
- **Tema alinhado à ODS 3 e ODS 8**

---
### 🔹 Backend
- Java 17  
- Spring Boot 3.3.4  
- Spring Web  
- Spring Data JPA  
- Bean Validation  
- MySQL Connector  
- Lombok  
- Spring Security (para liberação de endpoints via `SecurityConfig`)

### 🔹 Frontend
- React + Vite  
- Tailwind CSS + CSS customizado  
- Toasts personalizados para feedback ao usuário

### 🔹 Banco de Dados
- MySQL (persistência real)  
  - Base: `saudemental`  
  - Tabelas: `pacientes`, `registros_diarios`

---

## 🧠 Entidades Principais

### 🧍‍♂️ Paciente
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | Long | Identificador |
| nome | String | Nome do paciente |
| email | String | E-mail com validação |
| dataNascimento | Date | Data de nascimento |

### 📅 Registro Diário
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | Long | Identificador |
| dataRegistro | Date | Data do registro |
| nivelHumor | Integer | Escala de 1 a 5 |
| nivelAnsiedade | Integer | Escala de 0 a 5 |
| horasSono | Integer | Quantidade de horas dormidas |
| paciente | Paciente | Relacionamento @ManyToOne |

---

## 🚀 Como Executar

### ✅ Pré-requisitos
- [Java 17+](https://www.oracle.com/java/technologies/javase-jdk17-downloads.html)  
- [Maven](https://maven.apache.org/download.cgi)  
- [Node.js 18+](https://nodejs.org/)  
- [MySQL 8+](https://dev.mysql.com/downloads/)

---

### 📡 Endpoints Principais

#### 🧍 Pacientes
| Método | Endpoint | Descrição |
|---------|-----------|-----------|
| GET | `/api/pacientes` | Lista todos os pacientes |
| GET | `/api/pacientes/{id}` | Busca paciente por ID |
| POST | `/api/pacientes` | Cadastra um novo paciente |
| PUT | `/api/pacientes/{id}` | Atualiza dados de um paciente |
| DELETE | `/api/pacientes/{id}` | Remove um paciente |

#### 🧾 Registros Diários
| Método | Endpoint | Descrição |
|---------|-----------|-----------|
| GET | `/api/registros` | Lista todos os registros |
| GET | `/api/registros/{id}` | Busca registro por ID |
| POST | `/api/registros` | Cadastra um novo registro |
| PUT | `/api/registros/{id}` | Atualiza dados de um registro |
| DELETE | `/api/registros/{id}` | Remove um registro |

---

### 👥 Integrantes do Grupo — InnovationTech
| Nome | RM |
|------|----|
| Arthur Galvão Alves | RM554462 |
| Felipe Braunstein e Silva | RM554483 |
| Felipe do Nascimento Fernandes | RM554598 |
| Henrique Ignacio Bartalo | RM555274 |
| Gustavo Henrique Martins | RM556956 |


---
## 🏁 Conclusão

A plataforma InnovationTech — Saúde Mental representa uma solução digital moderna e eficiente, conectando pacientes e profissionais de forma humanizada, segura e sustentável, contribuindo para o futuro do trabalho com foco no bem-estar emocional.

---

## API disponível em:
👉 http://localhost:8080/api/pacientes

👉 http://localhost:8080/api/registros
