import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPacientes, createPaciente, updatePaciente } from "../api";
import Toast from "./Toast.jsx";

export default function PacienteForm({ edit }) {
  const nav = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({ nome: "", email: "", dataNascimento: "" });
  const [toast, setToast] = useState({ open: false, type: "success", message: "" });

  useEffect(() => {
    if (edit && id) {
      (async () => {
        const lista = await getPacientes();
        const p = lista.find(x => String(x.id) === String(id));
        if (p) setForm({ nome: p.nome || "", email: p.email || "", dataNascimento: p.dataNascimento || "" });
      })();
    }
  }, [edit, id]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (edit) {
        await updatePaciente(id, form);
        setToast({ open: true, type: "success", message: "Paciente atualizado!" });
      } else {
        await createPaciente(form);
        setToast({ open: true, type: "success", message: "Paciente cadastrado!" });
      }
      setTimeout(() => nav("/pacientes"), 800);
    } catch (err) {
      setToast({ open: true, type: "error", message: `Erro: ${err.message}` });
    }
  };

  return (
    <section className="stack">
      <Toast open={toast.open} type={toast.type} message={toast.message}
             onClose={() => setToast(s => ({ ...s, open: false }))} />
      <div className="card">
        <h2 className="card-header">{edit ? "Editar Paciente" : "Novo Paciente"}</h2>
        <form className="form" onSubmit={submit}>
          <div className="form-grid">
            <div>
              <div className="label">Nome</div>
              <input className="input" value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} required />
            </div>
            <div>
              <div className="label">Email</div>
              <input className="input" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div>
              <div className="label">Data de Nascimento</div>
              <input className="input" type="date" value={form.dataNascimento} onChange={e => setForm({ ...form, dataNascimento: e.target.value })} />
            </div>
          </div>

          <div className="cluster">
            <button className="btn btn-primary" type="submit">{edit ? "Salvar" : "Cadastrar"}</button>
            <button className="btn" type="button" onClick={() => nav("/pacientes")}>Cancelar</button>
          </div>
        </form>
      </div>
    </section>
  );
}
