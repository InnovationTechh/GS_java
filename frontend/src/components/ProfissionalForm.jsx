import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProfissionais, createProfissional, updateProfissional } from "../api";
import Toast from "./Toast.jsx";

export default function ProfissionalForm({ edit }) {
  const nav = useNavigate();
  const { id } = useParams();
  const [toast, setToast] = useState({ open: false, type: "success", message: "" });

  const [form, setForm] = useState({
    nome: "",
    especialidade: "",
    registroProfissional: "",
    email: "",
    telefone: ""
  });

  useEffect(() => {
    if (edit && id) {
      (async () => {
        const lista = await getProfissionais();
        const p = lista.find(x => String(x.id) === String(id));
        if (p) {
          setForm({
            nome: p.nome || "",
            especialidade: p.especialidade || "",
            registroProfissional: p.registroProfissional || "",
            email: p.email || "",
            telefone: p.telefone || ""
          });
        }
      })();
    }
  }, [edit, id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (edit) {
        await updateProfissional(id, form);
        setToast({ open: true, type: "success", message: "Profissional atualizado com sucesso" });
      } else {
        await createProfissional(form);
        setToast({ open: true, type: "success", message: "Profissional cadastrado com sucesso" });
      }
      setTimeout(() => nav("/profissionais"), 500);
    } catch (err) {
      setToast({ open: true, type: "error", message: err.message || "Erro ao salvar" });
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
        <h2>{edit ? "Editar profissional" : "Novo profissional de saúde"}</h2>

        <form className="stack" onSubmit={onSubmit}>
          <div className="grid grid-2">
            <div className="field">
              <div className="label">Nome</div>
              <input
                className="input"
                value={form.nome}
                onChange={e => setForm({ ...form, nome: e.target.value })}
                required
              />
            </div>
            <div className="field">
              <div className="label">Especialidade</div>
              <input
                className="input"
                placeholder="Psicólogo, Psiquiatra..."
                value={form.especialidade}
                onChange={e => setForm({ ...form, especialidade: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-2">
            <div className="field">
              <div className="label">Registro Profissional (CRM/CRP)</div>
              <input
                className="input"
                value={form.registroProfissional}
                onChange={e => setForm({ ...form, registroProfissional: e.target.value })}
                required
              />
            </div>
            <div className="field">
              <div className="label">E-mail</div>
              <input
                className="input"
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>

          <div className="field">
            <div className="label">Telefone</div>
            <input
              className="input"
              value={form.telefone}
              onChange={e => setForm({ ...form, telefone: e.target.value })}
            />
          </div>

          <div className="cluster">
            <button className="btn btn-primary" type="submit">
              {edit ? "Salvar" : "Cadastrar"}
            </button>
            <button className="btn" type="button" onClick={() => nav("/profissionais")}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
