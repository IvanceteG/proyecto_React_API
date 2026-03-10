const BASE_URL = 'http://localhost:3000/api/alumnos';

export const alumnosService = {
  getAll: async () => {
    const res = await fetch(BASE_URL);
    return res.json();
  },

  create: async (alumno) => {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(alumno),
    });
    return res.json();
  },

  update: async (id, datos) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    });
    return res.json();
  },

  delete: async (id) => {
    await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  },
};