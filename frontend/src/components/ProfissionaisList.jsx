import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getProfissionais, deleteProfissional } from "../api";
import Toast from "./Toast.jsx";

export default function ProfissionaisList() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [toast, setToast] = useState({ open: false, type: "success", message: "" });

  const load = async () => setItems(await getProfissionais());
  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return items;
    return items.filter(p =>
      String(p.id).includes(t) ||
      (p.nome || "").toLowerCase().includes(t) ||
      (p.especialidade || "").toLowerCase().includes(t) ||
      (p.email || "").toLowerCase().includes(t)
    );
  }, [items, q]);

  const onDelete = async (id) => {
    if (!confirm("Deseja realmente excluir este profissional?")) return;
    try {
      await deleteProfissional(id);
      setToast({ open: true, type: "success", message: "Profissional removido com sucesso" });
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
        <h2>Profissionais de Saúde</h2>
        <Link className="btn btn-primary" to="/profissionais/novo">Novo profissional</Link>
      </div>

      <div className="card stack">
        <div className="spread">
          <div>
            <div className="label">Buscar</div>
            <input
              className="input"
              placeholder="Filtrar por ID, nome, especialidade ou e-mail"
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
                <th>Nome</th>
                <th>Especialidade</th>
                <th>Registro</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th style={{ width: 140 }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.nome}</td>
                  <td>{p.especialidade}</td>
                  <td>{p.registroProfissional}</td>
                  <td>{p.email}</td>
                  <td>{p.telefone}</td>
                  <td>
                    <div className="cluster">
                      <Link className="btn btn-ghost" to={`/profissionais/editar/${p.id}`}>Editar</Link>
                      <button className="btn btn-danger" type="button" onClick={() => onDelete(p.id)}>Excluir</button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", opacity: .7 }}>(nenhum resultado)</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
