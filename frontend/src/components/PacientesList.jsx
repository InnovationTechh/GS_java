import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getPacientes, deletePaciente } from "../api";
import Toast from "./Toast.jsx";

export default function PacientesList() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [toast, setToast] = useState({ open: false, type: "success", message: "" });

  const load = async () => setItems(await getPacientes());
  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return items;
    return items.filter(p =>
      String(p.id).includes(t) ||
      (p.nome || "").toLowerCase().includes(t) ||
      (p.email || "").toLowerCase().includes(t)
    );
  }, [items, q]);

  const onDelete = async (id) => {
    if (!confirm("Remover este paciente?")) return;
    try {
      await deletePaciente(id);
      setToast({ open: true, type: "success", message: "Paciente excluído!" });
      load();
    } catch (e) {
      setToast({ open: true, type: "error", message: `Erro ao excluir: ${e.message}` });
    }
  };

  return (
    <section className="stack">
      <Toast open={toast.open} type={toast.type} message={toast.message}
             onClose={() => setToast(s => ({ ...s, open: false }))} />

      <div className="card">
        <div className="card-header-row">
          <h2>Pacientes</h2>
          <div className="cluster">
            <input className="input" placeholder="Buscar..." value={q} onChange={e => setQ(e.target.value)} />
            <Link className="btn btn-primary" to="/pacientes/novo">Novo Paciente</Link>
          </div>
        </div>

        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th style={{width:80}}>ID</th>
                <th>Nome</th>
                <th>Email</th>
                <th style={{width:220}}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.nome}</td>
                  <td>{p.email}</td>
                  <td>
                    <div className="cluster">
                      <Link className="btn" to={`/pacientes/editar/${p.id}`}>Editar</Link>
                      <button className="btn btn-danger" onClick={() => onDelete(p.id)}>Excluir</button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={4} style={{textAlign:"center", opacity:.7}}>(nenhum resultado)</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
