import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getRegistros, deleteRegistro } from "../api";
import Toast from "./Toast.jsx";

export default function RegistrosList() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [toast, setToast] = useState({ open: false, type: "success", message: "" });

  const load = async () => setItems(await getRegistros());
  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return items;
    return items.filter(r =>
      String(r.id).includes(t) ||
      (r.dataRegistro || "").toLowerCase().includes(t) ||
      String(r.pacienteId).includes(t)
    );
  }, [items, q]);

  const onDelete = async (id) => {
    if (!confirm("Remover este registro?")) return;
    try {
      await deleteRegistro(id);
      setToast({ open: true, type: "success", message: "Registro excluído!" });
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
          <h2>Registros Diários</h2>
          <div className="cluster">
            <input className="input" placeholder="Buscar..." value={q} onChange={e => setQ(e.target.value)} />
            <Link className="btn btn-primary" to="/registros/novo">Novo Registro</Link>
          </div>
        </div>

        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th style={{width:80}}>ID</th>
                <th>Data</th>
                <th>Humor</th>
                <th>Ansiedade</th>
                <th>Sono (h)</th>
                <th>Paciente ID</th>
                <th style={{width:220}}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.dataRegistro}</td>
                  <td>{r.nivelHumor}</td>
                  <td>{r.nivelAnsiedade}</td>
                  <td>{r.horasSono}</td>
                  <td>{r.pacienteId}</td>
                  <td>
                    <div className="cluster">
                      <Link className="btn" to={`/registros/editar/${r.id}`}>Editar</Link>
                      <button className="btn btn-danger" onClick={() => onDelete(r.id)}>Excluir</button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} style={{textAlign:"center", opacity:.7}}>(nenhum resultado)</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
