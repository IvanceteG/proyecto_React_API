import { useState, useEffect } from 'react';

const CICLES = ['DAW', 'SMX', 'ARI', 'IEA'];
const PROMOCIONS = ['2024/2025', '2023/2024', '2022/2023'];
const emptyForm = { nombre: '', apellidos: '', promocion: '2024/2025', ciclo: 'DAW', urlImagen: '' };

export default function FormularioAlumno({ alumno, onSubmit, onCancel }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    setForm(alumno ? { ...alumno } : emptyForm);
  }, [alumno]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (!form.nombre.trim() || !form.apellidos.trim() || !form.urlImagen.trim()) return;
    onSubmit(form);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>{alumno ? 'Editar alumne' : 'Nou alumne'}</h2>
        <div className="form-group">
          <label>Nom</label>
          <input name="nombre" value={form.nombre} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Cognoms</label>
          <input name="apellidos" value={form.apellidos} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Promoció</label>
          <select name="promocion" value={form.promocion} onChange={handleChange}>
            {PROMOCIONS.map((p) => <option key={p}>{p}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Cicle</label>
          <select name="ciclo" value={form.ciclo} onChange={handleChange}>
            {CICLES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>URL Imatge</label>
          <input name="urlImagen" value={form.urlImagen} onChange={handleChange} placeholder="https://..." />
        </div>
        <div className="form-actions">
          <button className="btn-ghost" onClick={onCancel}>Cancel·lar</button>
          <button className="btn-primary" onClick={handleSubmit}>{alumno ? 'Guardar' : 'Crear'}</button>
        </div>
      </div>
    </div>
  );
}