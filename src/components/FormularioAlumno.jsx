import { useState, useEffect } from 'react';

const CICLES = ['DAW', 'SMX', 'ARI', 'IEA'];
const PROMOCIONS = ['2024/2025', '2023/2024', '2022/2023'];
const emptyForm = { nombre: '', apellidos: '', promocion: '2024/2025', ciclo: 'DAW', urlImagen: '' };

export default function FormularioAlumno({ alumno, onSubmit, onCancel }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(alumno ? { ...alumno } : emptyForm);
    setErrors({});
  }, [alumno]);

  const validate = () => {
    const e = {};
    if (!form.nombre.trim()) e.nombre = 'Obligatori';
    if (!form.apellidos.trim()) e.apellidos = 'Obligatori';
    if (!form.urlImagen.trim()) e.urlImagen = 'Obligatori';
    return e;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }
    onSubmit(form);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>{alumno ? 'Editar alumne' : 'Nou alumne'}</h2>
        <div className="form-grid">
          <div className="form-group">
            <label>Nom</label>
            <input name="nombre" value={form.nombre} onChange={handleChange} />
            {errors.nombre && <p className="form-error">{errors.nombre}</p>}
          </div>
          <div className="form-group">
            <label>Cognoms</label>
            <input name="apellidos" value={form.apellidos} onChange={handleChange} />
            {errors.apellidos && <p className="form-error">{errors.apellidos}</p>}
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
          <div className="form-group form-full">
            <label>URL Imatge</label>
            <input name="urlImagen" value={form.urlImagen} onChange={handleChange} placeholder="https://..." />
            {errors.urlImagen && <p className="form-error">{errors.urlImagen}</p>}
          </div>
        </div>
        <div className="form-actions">
          <button className="btn-ghost" onClick={onCancel}>Cancel·lar</button>
          <button className="btn-primary" onClick={handleSubmit}>{alumno ? 'Guardar' : 'Crear'}</button>
        </div>
      </div>
    </div>
  );
}
