import { useState } from 'react';

const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin123';

export default function Login({ onLogin }) {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (usuario === ADMIN_USER && password === ADMIN_PASS) {
      onLogin({ usuario, esAdmin: true });
    } else {
      setError('Credencials incorrectes');
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-box">
        <h2>Iniciar sessió</h2>
        <p>Accedeix com a administrador</p>
        <div className="form-group">
          <label>Usuari</label>
          <input value={usuario} onChange={(e) => { setUsuario(e.target.value); setError(''); }} placeholder="admin" />
        </div>
        <div className="form-group">
          <label>Contrasenya</label>
          <input type="password" value={password} onChange={(e) => { setPassword(e.target.value); setError(''); }} placeholder="••••••••" onKeyDown={(e) => e.key === 'Enter' && handleLogin()} />
        </div>
        {error && <p className="form-error">{error}</p>}
        <div className="form-actions">
          <button className="btn-primary" onClick={handleLogin}>Entrar</button>
        </div>
        <p className="form-hint">Admin per defecte: <code>admin / admin123</code></p>
      </div>
    </div>
  );
}
