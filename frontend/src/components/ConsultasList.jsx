import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  getConsultas,
  deleteConsulta,
  updateConsultaStatus,
  getPacientes,
  getProfissionais
} from "../api";
import Toast from "./Toast.jsx";

export default function ConsultasList() {
  const [items, setItems] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [profissionais, setProfissionais] = useState([]);
  const [q, setQ] = useState("");
  const [toast, setToast] = useState({
    open: false,
    type: "success",
    message: ""
  });

  const load = async () => {
    const [cs, ps, pr] = await Promise.all([
      getConsultas(),
      getPacientes(),
      getProfissionais()
    ]);
    setItems(cs);
    setPacientes(ps);
    setProfissionais(pr);
  };

  useEffect(() => {
    load();
  }, []);

  const nomePaciente = (id) =>
    pacientes.find((p) => p.id === id)?.nome || `Paciente #${id}`;
  const nomeProfissional = (id) =>
    profissionais.find((p) => p.id === id)?.nome || `Profissional #${id}`;

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return items;
    return items.filter((c) =>
      String(c.id).includes(t) ||
      String(c.pacienteId).includes(t) ||
      String(c.profissionalId).includes(t) ||
      (c.tipoAtendimento || "").toLowerCase().includes(t) ||
      (c.status || "").toLowerCase().includes(t)
    );
  }, [items, q]);

  const onDelete = async (id) => {
    if (!confirm("Deseja realmente excluir esta consulta?")) return;
    try {
      await deleteConsulta(id);
      setToast({
        open: true,
        type: "success",
        message: "Consulta removida com sucesso"
      });
      await load();
    } catch (e) {
      setToast({
        open: true,
        type: "error",
        message: e.message || "Erro ao excluir consulta"
      });
    }
  };

  const onChangeStatus = async (id, status) => {
    try {
      await updateConsultaStatus(id, status);
      setToast({
        open: true,
        type: "success",
        message: "Status atualizado com sucesso"
      });
      await load();
    } catch (e) {
      setToast({
        open: true,
        type: "error",
        message: e.message || "Erro ao atualizar status"
      });
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
        <h2>Consultas</h2>
        <Link className="btn btn-primary" to="/consultas/nova">
          Agendar nova consulta
        </Link>
      </div>

      <div className="card stack">
        <div className="spread">
          <div>
            <div className="label">Buscar</div>
            <input
              className="input"
              placeholder="Filtrar por ID, paciente, profissional, status..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
        </div>

        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Paciente</th>
                <th>Profissional</th>
                <th>Data/Hora</th>
                <th>Tipo</th>
                <th>Status</th>
                <th style={{ width: 200 }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{nomePaciente(c.pacienteId)}</td>
                  <td>{nomeProfissional(c.profissionalId)}</td>
                  <td>{c.dataHora}</td>
                  <td>{c.tipoAtendimento}</td>
                  <td>
                    <select
                      className="input"
                      value={c.status}
                      onChange={(e) =>
                        onChangeStatus(c.id, e.target.value)
                      }
                    >
                      <option value="AGENDADA">Agendada</option>
                      <option value="REALIZADA">Realizada</option>
                      <option value="CANCELADA">Cancelada</option>
                    </select>
                  </td>
                  <td>
                    <div className="cluster">
                      <Link
                        className="btn btn-ghost"
                        to={`/consultas/editar/${c.id}`}
                      >
                        Editar
                      </Link>
                      <button
                        className="btn btn-danger"
                        type="button"
                        onClick={() => onDelete(c.id)}
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    style={{ textAlign: "center", opacity: 0.7 }}
                  >
                    (nenhuma consulta encontrada)
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
