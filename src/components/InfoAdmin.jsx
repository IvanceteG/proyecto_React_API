export default function InfoAdmin({ usuario, esAdmin, onLogout, onShowLogin }) {
  if (!usuario) {
    return <button className="btn-ghost" onClick={onShowLogin}>🔐 Iniciar sessió</button>;
  }
  return (
    <div className="info-admin">
      <span className="badge-admin">{esAdmin ? '👑 Admin' : usuario}</span>
      <button className="btn-ghost" onClick={onLogout}>Logout</button>
    </div>
  );
}
