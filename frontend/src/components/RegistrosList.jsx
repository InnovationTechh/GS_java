import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getRegistros, deleteRegistro } from "../api";

export default function RegistrosList(){
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");

  const load = async () => setItems(await getRegistros());
  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return items;
    return items.filter(r =>
      String(r.id).includes(term) ||
      (r.dataRegistro || "").toLowerCase().includes(term) ||
      String(r.pacienteId).includes(term)
    );
  }, [items, q]);

  const onDelete = async (id) => {
    if (confirm("Remover este registro?")) {
      await deleteRegistro(id);
      load();
    }
  };

  return (
    <section className="stack">
      <div className="spread">
        <h2 className="m0">Registros Diários</h2>
        <Link className="btn btn-primary" to="/registros/novo">+ Novo</Link>
      </div>

      <div className="table-wrap">
        <div className="table-toolbar">
          <input className="input search" placeholder="Buscar por data, id do registro ou paciente..."
                 value={q} onChange={(e)=>setQ(e.target.value)} />
          <div className="cluster">
            <span className="badge">{filtered.length} resultado(s)</span>
          </div>
        </div>

        <table className="table">
          <thead>
          <tr>
            <th>ID</th><th>Data</th><th>Humor</th><th>Ansiedade</th><th>Sono (h)</th><th>PacienteId</th><th style={{width:210}}>Ações</th>
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
              <td className="cluster">
                <Link className="btn" to={`/registros/editar/${r.id}`}>Editar</Link>
                <button className="btn btn-danger" onClick={()=>onDelete(r.id)}>Excluir</button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr><td colSpan="7">Nenhum registro encontrado.</td></tr>
          )}
        </tbody>
        </table>
      </div>
    </section>
  );
}
