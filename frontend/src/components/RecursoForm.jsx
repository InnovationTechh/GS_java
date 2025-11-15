import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRecursos, createRecurso, updateRecurso } from "../api";
import Toast from "./Toast.jsx";

export default function RecursoForm({ edit }) {
  const nav = useNavigate();
  const { id } = useParams();
  const [toast, setToast] = useState({ open: false, type: "success", message: "" });

  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    tipo: "ARTIGO",
    link: ""
  });

  useEffect(() => {
    if (edit && id) {
      (async () => {
        const lista = await getRecursos();
        const r = lista.find(x => String(x.id) === String(id));
        if (r) {
          setForm({
            titulo: r.titulo || "",
            descricao: r.descricao || "",
            tipo: r.tipo || "ARTIGO",
            link: r.link || ""
          });
        }
      })();
    }
  }, [edit, id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (edit) {
        await updateRecurso(id, form);
        setToast({ open: true, type: "success", message: "Recurso atualizado com sucesso" });
      } else {
        await createRecurso(form);
        setToast({ open: true, type: "success", message: "Recurso cadastrado com sucesso" });
      }
      setTimeout(() => nav("/recursos"), 600);
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
        <h2>{edit ? "Editar recurso de apoio" : "Novo recurso de apoio"}</h2>

        <form className="stack" onSubmit={onSubmit}>
          <div className="field">
            <div className="label">Título</div>
            <input
              className="input"
              value={form.titulo}
              onChange={e => setForm({ ...form, titulo: e.target.value })}
              required
            />
          </div>

          <div className="field">
            <div className="label">Descrição</div>
            <textarea
              className="input"
              rows={3}
              value={form.descricao}
              onChange={e => setForm({ ...form, descricao: e.target.value })}
            />
          </div>

          <div className="grid grid-2">
            <div className="field">
              <div className="label">Tipo</div>
              <select
                className="input"
                value={form.tipo}
                onChange={e => setForm({ ...form, tipo: e.target.value })}
              >
                <option value="ARTIGO">Artigo</option>
                <option value="VIDEO">Vídeo</option>
              </select>
            </div>
            <div className="field">
              <div className="label">Link</div>
              <input
                className="input"
                value={form.link}
                onChange={e => setForm({ ...form, link: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="cluster">
            <button className="btn btn-primary" type="submit">
              {edit ? "Salvar" : "Cadastrar"}
            </button>
            <button className="btn" type="button" onClick={() => nav("/recursos")}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
