import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getPacientes,
  getProfissionais,
  createConsulta,
  getConsultas,
  updateConsulta
} from "../api";
import Toast from "./Toast.jsx";

export default function ConsultaForm({ edit }) {
  const nav = useNavigate();
  const { id } = useParams();

  const [pacientes, setPacientes] = useState([]);
  const [profissionais, setProfissionais] = useState([]);
  const [toast, setToast] = useState({
    open: false,
    type: "success",
    message: ""
  });

  const [form, setForm] = useState({
    pacienteId: "",
    profissionalId: "",
    data: "",
    hora: "",
    tipoAtendimento: "ONLINE"
  });

  // Carrega pacientes e profissionais
  useEffect(() => {
    getPacientes().then(setPacientes);
    getProfissionais().then(setProfissionais);
  }, []);

  // Carrega dados da consulta quando estiver editando
  useEffect(() => {
    if (edit && id) {
      (async () => {
        const lista = await getConsultas();
        const c = lista.find((x) => String(x.id) === String(id));
        if (c) {
          const [data, hora] = c.dataHora.split("T");
          setForm({
            pacienteId: c.pacienteId,
            profissionalId: c.profissionalId,
            data,
            hora,
            tipoAtendimento: c.tipoAtendimento
          });
        }
      })();
    }
  }, [edit, id]);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!form.pacienteId || !form.profissionalId || !form.data || !form.hora) {
      setToast({
        open: true,
        type: "error",
        message: "Preencha todos os campos obrigatórios"
      });
      return;
    }

    const dataHora = `${form.data}T${form.hora}`;

    try {
      if (edit) {
        await updateConsulta(id, {
          pacienteId: Number(form.pacienteId),
          profissionalId: Number(form.profissionalId),
          dataHora,
          tipoAtendimento: form.tipoAtendimento
        });
        setToast({
          open: true,
          type: "success",
          message: "Consulta atualizada com sucesso"
        });
      } else {
        await createConsulta({
          pacienteId: Number(form.pacienteId),
          profissionalId: Number(form.profissionalId),
          dataHora,
          tipoAtendimento: form.tipoAtendimento
        });
        setToast({
          open: true,
          type: "success",
          message: "Consulta agendada com sucesso"
        });
      }

      setTimeout(() => nav("/consultas"), 600);
    } catch (err) {
      setToast({
        open: true,
        type: "error",
        message: err.message || "Erro ao salvar consulta"
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

      <div className="card stack">
        <h2>{edit ? "Editar consulta" : "Agendar nova consulta"}</h2>

        <form className="stack" onSubmit={onSubmit}>
          {/* Paciente + Profissional */}
          <div className="grid grid-2">
            <div className="field">
              <div className="label">Paciente</div>
              <select
                className="input"
                value={form.pacienteId}
                onChange={(e) =>
                  setForm({ ...form, pacienteId: e.target.value })
                }
                required
              >
                <option value="">Selecione...</option>
                {pacientes.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <div className="label">Profissional</div>
              <select
                className="input"
                value={form.profissionalId}
                onChange={(e) =>
                  setForm({ ...form, profissionalId: e.target.value })
                }
                required
              >
                <option value="">Selecione...</option>
                {profissionais.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nome} — {p.especialidade}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Data + Hora + Tipo */}
          <div className="grid grid-3">
            <div className="field">
              <div className="label">Data</div>
              <input
                type="date"
                className="input"
                value={form.data}
                onChange={(e) =>
                  setForm({ ...form, data: e.target.value })
                }
                required
              />
            </div>

            <div className="field">
              <div className="label">Hora</div>
              <input
                type="time"
                className="input"
                value={form.hora}
                onChange={(e) =>
                  setForm({ ...form, hora: e.target.value })
                }
                required
              />
            </div>

            <div className="field">
              <div className="label">Tipo de atendimento</div>
              <select
                className="input"
                value={form.tipoAtendimento}
                onChange={(e) =>
                  setForm({ ...form, tipoAtendimento: e.target.value })
                }
              >
                <option value="ONLINE">Online</option>
                <option value="PRESENCIAL">Presencial</option>
              </select>
            </div>
          </div>

          <div className="cluster">
            <button className="btn btn-primary" type="submit">
              {edit ? "Salvar alterações" : "Agendar"}
            </button>
            <button
              className="btn"
              type="button"
              onClick={() => nav("/consultas")}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
