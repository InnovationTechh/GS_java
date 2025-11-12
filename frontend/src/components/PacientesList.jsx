import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getPacientes, deletePaciente } from "../api";

export default function PacientesList(){
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");

  const load = async () => setItems(await getPacientes());
  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return items;
    return items.filter(p =>
      String(p.id).includes(term) ||
      (p.nome || "").toLowerCase().includes(term) ||
      (p.email || "").toLowerCase().includes(term)
    );
  }, [items, q]);

  const onDelete = async (id) => {
      if (!confirm("Remover este paciente?")) return;
      try {
        await deletePaciente(id);
        setToast({ open:true, type:"success", message:"Paciente excluído!" });
        load();
      } catch (e) {
        setToast({ open:true, type:"error", message:`Erro ao excluir: ${e.message}` });
      }
    };

  return (
    <section className="stack">
      <div className="spread">
        <h2 className="m0">Pacientes</h2>
        <Link className="btn btn-primary" to="/pacientes/novo">+ Novo</Link>
      </div>

      <div className="table-wrap">
        <div className="table-toolbar">
          <input className="input search" placeholder="Buscar por nome, email ou ID..."
                 value={q} onChange={(e)=>setQ(e.target.value)} />
          <div className="cluster">
            <span className="badge">{filtered.length} resultado(s)</span>
          </div>
        </div>

        <table className="table">
          <thead>
          <tr>
            <th>ID</th><th>Nome</th><th>Email</th><th>Nascimento</th><th style={{width:210}}>Ações</th>
          </tr>
          </thead>
          <tbody>
          {filtered.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nome}</td>
              <td>{p.email}</td>
              <td>{p.dataNascimento || "-"}</td>
              <td className="cluster">
                <Link className="btn" to={`/pacientes/editar/${p.id}`}>Editar</Link>
                <button className="btn btn-danger" onClick={()=>onDelete(p.id)}>Excluir</button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr><td colSpan="5">Nenhum paciente encontrado.</td></tr>
          )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
