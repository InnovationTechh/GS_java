# 🌿 Global Solution 2025 — O Futuro do Trabalho  
## Plataforma de Monitoramento de Saúde Mental 🧠  
**Grupo:** InnovationTech

---

## 📘 Contexto

A saúde mental e o bem-estar tornaram-se prioridades globais. O aumento de casos de burnout, ansiedade e estresse exige novas soluções.  
A tecnologia é uma poderosa aliada, permitindo que indivíduos monitorem seu estado emocional, registrem sentimentos e acessem recursos de apoio.  

Dentro da proposta **Global Solution — O Futuro do Trabalho**, este projeto propõe uma **API RESTful** integrada a um **frontend em React**, focada no registro e acompanhamento de pacientes e seus indicadores de bem-estar (humor, ansiedade e sono).

---

## 📌 Objetivo do Projeto
Fornecer uma plataforma que possibilite:

- Cadastro de **pacientes**
- Registro de **humor, ansiedade e qualidade do sono**
- Cadastro de **profissionais de saúde (psicólogos/psiquiatras)**
- Agendamento e gerenciamento de **consultas**
- Disponibilização de **recursos de apoio** (artigos e vídeos)

---
## 🛠 Tecnologias Utilizadas

### 🔹 Backend
- Java 17
- Spring Boot
- Spring Web
- Spring Data JPA
- Hibernate
- MySQL

### 🔹 Frontend
- React
- Vite
- Fetch API

---
### 👤 Pacientes
- Cadastro, edição, listagem e exclusão de pacientes
- Dados básicos (nome, contato etc.)
- Interface em React para gerenciamento

### 📓 Registros Diários
- Registro de humor, nível de ansiedade, qualidade do sono e observações
- Histórico por paciente
- Visualização e edição de registros

### 🩺 Profissionais de Saúde
- Cadastro de psicólogos, psiquiatras e demais profissionais
- Campos como: nome, especialidade, registro profissional (CRM/CRP), e-mail, telefone
- Listagem, edição e exclusão via interface web

### 📅 Consultas
- Agendamento de consultas entre **pacientes** e **profissionais de saúde**
- Campos: paciente, profissional, data/hora, tipo de atendimento (online/presencial)
- Atualização de status da consulta: **AGENDADA, REALIZADA, CANCELADA**
- Edição e exclusão de consultas

### 📚 Recursos de Apoio (Artigos/Vídeos)
- Cadastro de conteúdos de apoio em saúde mental
- Tipos: **ARTIGO** ou **VÍDEO**
- Campos: título, descrição, tipo, link (YouTube, blog, etc.)
- Listagem, edição, exclusão e acesso direto ao link

---
---
## ✅ Pré-requisitos
- [Java 17+](https://www.oracle.com/java/technologies/javase-jdk17-downloads.html)  
- [Maven](https://maven.apache.org/download.cgi)  
- [Node.js 18+](https://nodejs.org/)  
- [MySQL 8+](https://dev.mysql.com/downloads/)

---
## 🗄️ Configuração do Banco de Dados

### 🔹 Banco utilizado: **MySQL**

O projeto usa **persistência real** com MySQL.  
O banco é criado automaticamente pelo Hibernate.

### 🔹 Nome do banco
saudemental

pgsql
Copiar código

### 🔹 Tabelas utilizadas
| Tabela               | Finalidade |
|----------------------|-----------|
| pacientes            | Dados gerais dos pacientes |
| registros_diarios    | Humor/ansiedade/sono |
| profissionais        | CRM/CRP, especialidade, contato |
| consultas            | Agendamento entre paciente x profissional |
| recursos             | Artigos e vídeos de apoio |

### 🔹 application.properties (configuração real)

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/saudemental?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=America/Sao_Paulo
spring.datasource.username=root
spring.datasource.password=123456
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

spring.h2.console.enabled=false
server.port=8080
````
---
## 🚀 Como executar o projeto localmente

### 1️⃣ Clonar o repositório
```bash
https://github.com/InnovationTechh/GS_java.git
```
### 2️⃣ Criar o banco no MySQL
```bash
CREATE DATABASE saudemental CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
### 3️⃣ Executar o backend (API)
```bash
mvn spring-boot:run
```
### 4️⃣ Executar o frontend (React)
```bash
cd frontend
npm install
npm run dev
```
A interface estará disponível em:
```bash
http://localhost:5173
```
---
## 📡 Endpoints Principais

---

#### 🧍 Pacientes
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/pacientes` | Lista todos os pacientes |
| GET | `/api/pacientes/{id}` | Busca paciente por ID |
| POST | `/api/pacientes` | Cadastra um novo paciente |
| PUT | `/api/pacientes/{id}` | Atualiza dados de um paciente |
| DELETE | `/api/pacientes/{id}` | Remove um paciente |

---

#### 🧾 Registros Diários
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/registros` | Lista todos os registros |
| GET | `/api/registros/{id}` | Busca registro por ID |
| POST | `/api/registros` | Cadastra um novo registro diário |
| PUT | `/api/registros/{id}` | Atualiza dados de um registro |
| DELETE | `/api/registros/{id}` | Remove um registro |

---

#### 🩺 Profissionais de Saúde
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/profissionais` | Lista todos os profissionais |
| GET | `/api/profissionais/{id}` | Busca profissional por ID |
| POST | `/api/profissionais` | Cadastra um profissional de saúde |
| PUT | `/api/profissionais/{id}` | Atualiza dados de um profissional |
| DELETE | `/api/profissionais/{id}` | Remove um profissional |

---

#### 📅 Consultas
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/consultas` | Lista todas as consultas |
| GET | `/api/consultas/paciente/{id}` | Lista consultas de um paciente |
| GET | `/api/consultas/profissional/{id}` | Lista consultas de um profissional |
| POST | `/api/consultas` | Agenda uma nova consulta |
| PUT | `/api/consultas/{id}` | Atualiza os dados de uma consulta |
| PATCH | `/api/consultas/{id}/status?status=...` | Atualiza o status (AGENDADA/REALIZADA/CANCELADA) |
| DELETE | `/api/consultas/{id}` | Remove uma consulta |

---

#### 📚 Recursos de Apoio (Artigos/Vídeos)
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/recursos` | Lista todos os recursos |
| GET | `/api/recursos/{id}` | Busca recurso por ID |
| POST | `/api/recursos` | Cadastra um novo recurso (artigo ou vídeo) |
| PUT | `/api/recursos/{id}` | Atualiza os dados de um recurso |
| DELETE | `/api/recursos/{id}` | Remove um recurso |

---

### 👥 Integrantes do Grupo — InnovationTech
| Nome | RM |
|------|----|
| Felipe do Nascimento Fernandes | RM554598 |
| Gustavo Henrique Martins | RM556956 |
| Henrique Ignacio Bartalo | RM555274 |



---
## 🏁 Conclusão

A plataforma InnovationTech — Saúde Mental representa uma solução digital moderna e eficiente, conectando pacientes e profissionais de forma humanizada, segura e sustentável, contribuindo para o futuro do trabalho com foco no bem-estar emocional.

---

## API disponível em:
👉 http://localhost:8080/api/pacientes

👉 http://localhost:8080/api/registros

👉 http://localhost:8080/api/pacientes

👉 http://localhost:8080/api/registros

👉 http://localhost:8080/api/profissionais

👉 http://localhost:8080/api/consultas

👉 http://localhost:8080/api/recursos
