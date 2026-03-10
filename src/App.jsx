import { useState, useEffect } from 'react';
import './App.css';
import Alumno from './components/Alumno';
import Avatar from './components/Avatar';
import SelectorPromocion from './components/SelectorPromocion';
import FiltroNombre from './components/FiltroNombre';
import FormularioAlumno from './components/FormularioAlumno';
import Login from './components/Login';
import InfoAdmin from './components/InfoAdmin';
import { alumnosService } from './services/alumnosService';

export default function App() {
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [promocion, setPromocion] = useState('');
  const [filtroNombre, setFiltroNombre] = useState('');
  const [esAdmin, setEsAdmin] = useState(() => localStorage.getItem('esAdmin') === 'true');
  const [usuario, setUsuario] = useState(() => localStorage.getItem('usuario') || null);
  const [showLogin, setShowLogin] = useState(false);
  const [formularioAbierto, setFormularioAbierto] = useState(false);
  const [alumnoEditando, setAlumnoEditando] = useState(null);

  useEffect(() => {
    alumnosService.getAll()
      .then(setAlumnos)
      .catch(() => setError("No s'ha pogut connectar amb l'API."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    localStorage.setItem('esAdmin', esAdmin);
    localStorage.setItem('usuario', usuario || '');
  }, [esAdmin, usuario]);

  const promociones = [...new Set(alumnos.map((a) => a.promocion))].sort().reverse();

  const alumnosFiltrados = alumnos.filter((a) => {
    const matchPromo = promocion === '' || a.promocion === promocion;
    const texto = filtroNombre.toLowerCase();
    const matchNombre = texto === '' || a.nombre.toLowerCase().includes(texto) || a.apellidos.toLowerCase().includes(texto);
    return matchPromo && matchNombre;
  });

  const handleLogin = ({ usuario: u, esAdmin: admin }) => {
    setUsuario(u);
    setEsAdmin(admin);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setUsuario(null);
    setEsAdmin(false);
  };

  const handleCreate = async (datos) => {
    try {
      const nuevo = await alumnosService.create(datos);
      setAlumnos([...alumnos, nuevo]);
      setFormularioAbierto(false);
    } catch {
      alert("Error al crear l'alumne");
    }
  };

  const handleEdit = async (datos) => {
    try {
      const actualizado = await alumnosService.update(alumnoEditando.id, { ...datos, id: alumnoEditando.id });
      setAlumnos(alumnos.map((a) => (a.id === actualizado.id ? actualizado : a)));
      setFormularioAbierto(false);
      setAlumnoEditando(null);
    } catch {
      alert("Error al actualitzar l'alumne");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Segur que vols eliminar aquest alumne?')) return;
    try {
      await alumnosService.delete(id);
      setAlumnos(alumnos.filter((a) => a.id !== id));
    } catch {
      alert("Error al eliminar l'alumne");
    }
  };

  return (
    <>
      <header className="header">
        <InfoAdmin usuario={usuario} esAdmin={esAdmin} onLogout={handleLogout} onShowLogin={() => setShowLogin(true)} />
      </header>

      <main className="main">
        <div className="filters-panel">
          <SelectorPromocion promociones={promociones} promocionSeleccionada={promocion} onChange={setPromocion} />
          <FiltroNombre value={filtroNombre} onChange={setFiltroNombre} />
        </div>

        <div className="toolbar">
          <p className="count-label">Mostrant <strong>{alumnosFiltrados.length}</strong> alumnes</p>
          {esAdmin && (
            <button className="btn-primary" onClick={() => { setAlumnoEditando(null); setFormularioAbierto(true); }}>
              + Nou alumne
            </button>
          )}
        </div>

        {loading && (
          <div className="state-box">
            <div className="state-icon">⏳</div>
            <p>Carregant alumnes...</p>
          </div>
        )}

        {error && (
          <div className="error-box">
            <p>⚠️ {error}</p>
            <code>npm run api</code>
          </div>
        )}

        {!loading && !error && (
          <div className="alumnos-grid">
            {alumnosFiltrados.map((alumno) => (
              <Alumno
                key={alumno.id}
                nombre={alumno.nombre}
                apellidos={alumno.apellidos}
                promo={alumno.promocion}
                ciclo={alumno.ciclo}
                esAdmin={esAdmin}
                onEdit={() => { setAlumnoEditando(alumno); setFormularioAbierto(true); }}
                onDelete={() => handleDelete(alumno.id)}
              >
                <Avatar urlImagen={alumno.urlImagen} nombre={alumno.nombre} />
              </Alumno>
            ))}
          </div>
        )}
      </main>

      {showLogin && <Login onLogin={handleLogin} />}
      {formularioAbierto && (
        <FormularioAlumno
          alumno={alumnoEditando}
          onSubmit={alumnoEditando ? handleEdit : handleCreate}
          onCancel={() => { setFormularioAbierto(false); setAlumnoEditando(null); }}
        />
      )}
    </>
  );
}
