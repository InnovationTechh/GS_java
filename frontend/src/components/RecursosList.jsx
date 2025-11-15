import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getRecursos, deleteRecurso } from "../api";
import Toast from "./Toast.jsx";

export default function RecursosList() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [toast, setToast] = useState({ open: false, type: "success", message: "" });

  const load = async () => setItems(await getRecursos());
  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return items;
    return items.filter(r =>
      String(r.id).includes(t) ||
      (r.titulo || "").toLowerCase().includes(t) ||
      (r.tipo || "").toLowerCase().includes(t)
    );
  }, [items, q]);

  const onDelete = async (id) => {
    if (!confirm("Deseja realmente excluir este recurso?")) return;
    try {
      await deleteRecurso(id);
      setToast({ open: true, type: "success", message: "Recurso excluído" });
      await load();
    } catch (e) {
      setToast({ open: true, type: "error", message: e.message || "Erro ao excluir" });
    }
  };

  return (
    <section className="stack">
      <Toast
        open={toast.open}
        type={toast.type}
        message={toast.message}
        onClose={() => setToast({ ...toast, open: false })}
      />

      <div className="spread">
        <h2>Recursos de apoio (artigos e vídeos)</h2>
        <Link className="btn btn-primary" to="/recursos/novo">Novo recurso</Link>
      </div>

      <div className="card stack">
        <div className="spread">
          <div>
            <div className="label">Buscar</div>
            <input
              className="input"
              placeholder="Filtrar por título, tipo..."
              value={q}
              onChange={e => setQ(e.target.value)}
            />
          </div>
        </div>

        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Tipo</th>
                <th>Link</th>
                <th style={{ width: 140 }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.titulo}</td>
                  <td>{r.tipo}</td>
                  <td>
                    <a href={r.link} target="_blank" rel="noreferrer">
                      Abrir
                    </a>
                  </td>
                  <td>
                    <div className="cluster">
                      <Link className="btn btn-ghost" to={`/recursos/editar/${r.id}`}>Editar</Link>
                      <button className="btn btn-danger" type="button" onClick={() => onDelete(r.id)}>Excluir</button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", opacity: .7 }}>(nenhum recurso cadastrado)</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
