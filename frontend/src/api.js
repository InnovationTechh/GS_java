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
