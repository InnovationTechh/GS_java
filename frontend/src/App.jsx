import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import PacientesList from "./components/PacientesList.jsx";
import PacienteForm from "./components/PacienteForm.jsx";
import RegistrosList from "./components/RegistrosList.jsx";
import RegistroForm from "./components/RegistroForm.jsx";

export default function App(){
  return (
    <>
      <Navbar />
      <main className="container stack">
        {/* HERO */}
        <section className="hero stack">
          <div className="spread">
            <div>
              <h1 className="m0" style={{fontSize:28,fontWeight:900}}>Plataforma de Bem-Estar e Saúde Mental</h1>
              <p className="card-sub" style={{maxWidth:720}}>
                Monitore <b>humor</b>, <b>ansiedade</b> e <b>sono</b>. Cadastre pacientes e seus registros diários.
                Voltada ao <b>Futuro do Trabalho</b> e conectada à <b>ODS 3</b>.
              </p>
              <div className="cluster">
                <Link className="btn btn-primary" to="/pacientes">Gerenciar Pacientes</Link>
                <Link className="btn" to="/registros">Gerenciar Registros</Link>
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

        {/* CARDS AUXILIARES */}
        <section className="grid">
          <article className="card">
            <h3 className="card-header">Comece por aqui</h3>
            <p className="card-sub">Crie pacientes e, em seguida, adicione registros diários.</p>
            <div className="cluster">
              <Link className="btn" to="/pacientes/novo">+ Novo Paciente</Link>
              <Link className="btn" to="/registros/novo">+ Novo Registro</Link>
            </div>
          </article>

          <article className="card">
            <h3 className="card-header">Futuro do Trabalho</h3>
            <p className="card-sub">Saúde mental como pilar de produtividade e engajamento.</p>
            <a className="btn btn-ghost" href="https://odsbrasil.gov.br/" target="_blank">Saiba mais</a>
          </article>
        </section>

        <Routes>
          <Route path="/pacientes" element={<PacientesList />} />
          <Route path="/pacientes/novo" element={<PacienteForm />} />
          <Route path="/pacientes/editar/:id" element={<PacienteForm edit />} />

          <Route path="/registros" element={<RegistrosList />} />
          <Route path="/registros/novo" element={<RegistroForm />} />
          <Route path="/registros/editar/:id" element={<RegistroForm edit />} />

          <Route path="/" element={<div />} />
        </Routes>

        <footer className="footer">
          innovationTech • Global Solution 2025 — Saúde Mental no Trabalho
        </footer>
      </main>
    </>
  );
}
