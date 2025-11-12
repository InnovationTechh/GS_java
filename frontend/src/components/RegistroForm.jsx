import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRegistros, getPacientes, createRegistro, updateRegistro } from "../api";
import Toast from "./Toast.jsx";

export default function RegistroForm({ edit }) {
  const nav = useNavigate();
  const { id } = useParams();
  const [pacientes, setPacientes] = useState([]);
  const [toast, setToast] = useState({ open: false, type: "success", message: "" });

  const [form, setForm] = useState({
    dataRegistro: "",
    nivelHumor: 3,
    nivelAnsiedade: 2,
    horasSono: 7,
    pacienteId: ""
  });

  useEffect(() => {
    getPacientes().then(setPacientes);
    if (edit && id) {
      (async () => {
        const lista = await getRegistros();
        const r = lista.find(x => String(x.id) === String(id));
        if (r) setForm({
          dataRegistro: r.dataRegistro || "",
          nivelHumor: r.nivelHumor ?? 3,
          nivelAnsiedade: r.nivelAnsiedade ?? 2,
          horasSono: r.horasSono ?? 7,
          pacienteId: String(r.pacienteId || "")
        });
      })();
    }
  }, [edit, id]);

  const submit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      nivelHumor: Number(form.nivelHumor),
      nivelAnsiedade: Number(form.nivelAnsiedade),
      horasSono: Number(form.horasSono),
      pacienteId: Number(form.pacienteId)
    };

    try {
      if (edit) {
        await updateRegistro(id, payload);
        setToast({ open: true, type: "success", message: "Registro atualizado!" });
      } else {
        await createRegistro(payload);
        setToast({ open: true, type: "success", message: "Registro cadastrado!" });
      }
      setTimeout(() => nav("/registros"), 800);
    } catch (err) {
      setToast({ open: true, type: "error", message: `Erro: ${err.message}` });
    }
  };

  return (
    <section className="stack">
      <Toast open={toast.open} type={toast.type} message={toast.message}
             onClose={() => setToast(s => ({ ...s, open: false }))} />

      <div className="card">
        <h2 className="card-header">{edit ? "Editar Registro" : "Novo Registro Diário"}</h2>

        <form className="form" onSubmit={submit}>
          <div className="form-grid">
            <div>
              <div className="label">Data</div>
              <input className="input" type="date" value={form.dataRegistro}
                     onChange={e => setForm({ ...form, dataRegistro: e.target.value })} required />
            </div>
            <div>
              <div className="label">Paciente</div>
              <select className="input" value={form.pacienteId}
                      onChange={e => setForm({ ...form, pacienteId: e.target.value })} required>
                <option value="">Selecione...</option>
                {pacientes.map(p => <option key={p.id} value={p.id}>{p.id} — {p.nome}</option>)}
              </select>
            </div>
            <div>
              <div className="label">Humor (1–5)</div>
              <input className="input" type="number" min="1" max="5" value={form.nivelHumor}
                     onChange={e => setForm({ ...form, nivelHumor: e.target.value })} />
            </div>
            <div>
              <div className="label">Ansiedade (0–5)</div>
              <input className="input" type="number" min="0" max="5" value={form.nivelAnsiedade}
                     onChange={e => setForm({ ...form, nivelAnsiedade: e.target.value })} />
            </div>
            <div>
              <div className="label">Sono (0–24h)</div>
              <input className="input" type="number" min="0" max="24" value={form.horasSono}
                     onChange={e => setForm({ ...form, horasSono: e.target.value })} />
            </div>
          </div>

          <div className="cluster">
            <button className="btn btn-primary" type="submit">{edit ? "Salvar" : "Cadastrar"}</button>
            <button className="btn" type="button" onClick={() => nav("/registros")}>Cancelar</button>
          </div>
        </form>
      </div>
    </section>
  );
}
