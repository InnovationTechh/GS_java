const API = '/api'; // <<< usa proxy do Vite

async function fetchJson(url, options) {
  const r = await fetch(url, options);
  if (!r.ok) {
    // tenta ler mensagem do backend; se não der, lança genérica
    let msg = `HTTP ${r.status}`;
    try {
      const data = await r.json();
      msg = data?.message || data?.error || JSON.stringify(data) || msg;
    } catch {}
    throw new Error(msg);
  }
  // DELETE normalmente não tem JSON
  if (r.status === 204) return null;
  return r.json();
}

// =======================
// Pacientes
// =======================
export async function getPacientes() {
  return fetchJson(`${API}/pacientes`);
}

export async function createPaciente(data) {
  return fetchJson(`${API}/pacientes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}

export async function updatePaciente(id, data) {
  return fetchJson(`${API}/pacientes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}

export async function deletePaciente(id) {
  return fetchJson(`${API}/pacientes/${id}`, { method: 'DELETE' });
}

// =======================
// Registros diários
// =======================
export async function getRegistros() {
  return fetchJson(`${API}/registros`);
}

export async function createRegistro(data) {
  return fetchJson(`${API}/registros`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}

export async function updateRegistro(id, data) {
  return fetchJson(`${API}/registros/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}

export async function deleteRegistro(id) {
  return fetchJson(`${API}/registros/${id}`, { method: 'DELETE' });
}

// =======================
// Profissionais de Saúde
// =======================
export async function getProfissionais() {
  return fetchJson(`${API}/profissionais`);
}

export async function createProfissional(data) {
  return fetchJson(`${API}/profissionais`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}

export async function updateProfissional(id, data) {
  return fetchJson(`${API}/profissionais/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}

export async function deleteProfissional(id) {
  return fetchJson(`${API}/profissionais/${id}`, { method: 'DELETE' });
}

// =======================
// Consultas
// =======================
export async function getConsultas() {
  return fetchJson(`${API}/consultas`);
}

export async function createConsulta(data) {
  // data: { pacienteId, profissionalId, dataHora: '2025-11-15T14:30', tipoAtendimento: 'ONLINE' }
  return fetchJson(`${API}/consultas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}

export async function updateConsulta(id, data) {
  // data com mesmo formato do create
  return fetchJson(`${API}/consultas/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}

export async function updateConsultaStatus(id, status) {
  return fetchJson(`${API}/consultas/${id}/status?status=${encodeURIComponent(status)}`, {
    method: 'PATCH'
  });
}

export async function deleteConsulta(id) {
  return fetchJson(`${API}/consultas/${id}`, {
    method: 'DELETE'
  });
}

// =======================
// Recursos de apoio
// =======================
export async function getRecursos() {
  return fetchJson(`${API}/recursos`);
}

export async function createRecurso(data) {
  return fetchJson(`${API}/recursos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}

export async function updateRecurso(id, data) {
  return fetchJson(`${API}/recursos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}

export async function deleteRecurso(id) {
  return fetchJson(`${API}/recursos/${id}`, { method: 'DELETE' });
}
