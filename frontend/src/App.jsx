import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import PacientesList from "./components/PacientesList.jsx";
import PacienteForm from "./components/PacienteForm.jsx";
import RegistrosList from "./components/RegistrosList.jsx";
import RegistroForm from "./components/RegistroForm.jsx";
import ProfissionaisList from "./components/ProfissionaisList.jsx";
import ProfissionalForm from "./components/ProfissionalForm.jsx";
import ConsultasList from "./components/ConsultasList.jsx";
import ConsultaForm from "./components/ConsultaForm.jsx";
import RecursosList from "./components/RecursosList.jsx";
import RecursoForm from "./components/RecursoForm.jsx";

export default function App(){
  return (
    <>
      <Navbar />
      <main className="container stack">
        {/* HERO */}
        <section className="hero stack">
          <div className="spread">
            <div>
              <h1 className="m0" style={{fontSize:28,fontWeight:900}}>
                Plataforma de Bem-Estar e Saúde Mental
              </h1>
              <p className="card-sub" style={{maxWidth:720}}>
                Monitore <b>humor</b>, <b>ansiedade</b> e <b>sono</b>, cadastre <b>pacientes</b>,
                gerencie <b>profissionais de saúde</b>, <b>consultas</b> e disponibilize
                <b> recursos de apoio</b> (artigos e vídeos). Voltada ao <b>Futuro do Trabalho</b>
                e conectada à <b>ODS 3</b>.
              </p>
              <div className="cluster">
                <Link className="btn btn-primary" to="/pacientes">Gerenciar Pacientes</Link>
                <Link className="btn" to="/registros">Registros Diários</Link>
                <Link className="btn" to="/profissionais">Profissionais</Link>
                <Link className="btn" to="/consultas">Consultas</Link>
                <Link className="btn" to="/recursos">Recursos de Apoio</Link>
              </div>
            </div>
            <div className="kpis" style={{minWidth:340}}>
              <div className="kpi">
                <div className="title">Status</div>
                <div className="value cluster"><span className="badge ok">API online</span></div>
              </div>
              <div className="kpi">
                <div className="title">Objetivo</div>
                <div className="value">Bem-estar no trabalho</div>
              </div>
              <div className="kpi">
                <div className="title">ODS</div>
                <div className="value">ODS 3 (Saúde)</div>
              </div>
            </div>
          </div>
        </section>

        {/* ROTAS */}
        <Routes>
          {/* Pacientes */}
          <Route path="/pacientes" element={<PacientesList />} />
          <Route path="/pacientes/novo" element={<PacienteForm />} />
          <Route path="/pacientes/editar/:id" element={<PacienteForm edit />} />

          {/* Registros diários */}
          <Route path="/registros" element={<RegistrosList />} />
          <Route path="/registros/novo" element={<RegistroForm />} />
          <Route path="/registros/editar/:id" element={<RegistroForm edit />} />

          {/* Profissionais de Saúde */}
          <Route path="/profissionais" element={<ProfissionaisList />} />
          <Route path="/profissionais/novo" element={<ProfissionalForm />} />
          <Route path="/profissionais/editar/:id" element={<ProfissionalForm edit />} />

          {/* Consultas */}
          <Route path="/consultas" element={<ConsultasList />} />
          <Route path="/consultas/nova" element={<ConsultaForm />} />
          <Route path="/consultas/editar/:id" element={<ConsultaForm edit />} />


          {/* Recursos de apoio */}
          <Route path="/recursos" element={<RecursosList />} />
          <Route path="/recursos/novo" element={<RecursoForm />} />
          <Route path="/recursos/editar/:id" element={<RecursoForm edit />} />

          {/* Home “vazia” só para manter layout */}
          <Route path="/" element={<div />} />
        </Routes>

        <footer className="footer">
          innovationTech • Global Solution 2025 — Saúde Mental no Trabalho
        </footer>
      </main>
    </>
  );
}
