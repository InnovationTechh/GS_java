import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPacientes, createPaciente, updatePaciente } from "../api";

export default function PacienteForm({ edit }){
  const nav = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({ nome:"", email:"", dataNascimento:"" });

  useEffect(() => {
    const carregar = async () => {
      if (edit && id){
        const lista = await getPacientes();
        const p = lista.find(x => String(x.id) === String(id));
        if (p) setForm({ nome:p.nome, email:p.email, dataNascimento: p.dataNascimento || "" });
      }
    };
    carregar();
  }, [edit, id]);

  const submit = async (e) => {
    e.preventDefault();
    if (edit) await updatePaciente(id, form);
    else await createPaciente(form);
    nav("/pacientes");
  };

  return (
    <section className="stack">
      <div className="card">
        <h2 className="card-header">{edit ? "Editar Paciente" : "Novo Paciente"}</h2>
        <p className="card-sub">Cadastre informações básicas do paciente.</p>

        <form className="form" onSubmit={submit}>
          <div className="form-grid">
            <div>
              <div className="label">Nome</div>
              <input className="input" placeholder="Nome" value={form.nome}
                     onChange={e=>setForm({...form, nome:e.target.value})} required />
              <div className="hint">Nome completo do paciente.</div>
            </div>

            <div>
              <div className="label">Email</div>
              <input className="input" type="email" placeholder="email@exemplo.com" value={form.email}
                     onChange={e=>setForm({...form, email:e.target.value})} required />
              <div className="hint">Usado para contato e histórico.</div>
            </div>

            <div>
              <div className="label">Data de Nascimento</div>
              <input className="input" type="date" value={form.dataNascimento || ""}
                     onChange={e=>setForm({...form, dataNascimento:e.target.value})} />
              <div className="hint">Opcional, mas recomendado.</div>
            </div>
          </div>

          <div className="cluster">
            <button className="btn btn-primary" type="submit">{edit ? "Salvar" : "Criar"}</button>
            <button className="btn" type="button" onClick={()=>nav("/pacientes")}>Cancelar</button>
          </div>
        </form>
      </div>
    </section>
  );
}
