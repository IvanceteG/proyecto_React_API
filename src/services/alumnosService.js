const BASE_URL = 'http://localhost:3000/api/alumnos';

export const alumnosService = {
  getAll: async () => {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error('Error al carregar alumnes');
    return res.json();
  },

  getById: async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error('Alumne no trobat');
    return res.json();
  },

  buscar: async (q) => {
    const res = await fetch(`${BASE_URL}/buscar?q=${encodeURIComponent(q)}`);
    if (!res.ok) throw new Error('Error en la cerca');
    return res.json();
  },

  getByPromocion: async (promocion) => {
    const res = await fetch(`${BASE_URL}/promocion/${encodeURIComponent(promocion)}`);
    if (!res.ok) throw new Error('Error al filtrar per promoció');
    return res.json();
  },

  create: async (alumno) => {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(alumno),
    });
    if (!res.ok) throw new Error('Error al crear alumne');
    return res.json();
  },

  update: async (id, datos) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    });
    if (!res.ok) throw new Error('Error al actualitzar alumne');
    return res.json();
  },

  delete: async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Error al eliminar alumne');
    return true;
  },
};
