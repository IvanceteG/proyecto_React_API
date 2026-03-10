export default function Avatar({ urlImagen, nombre }) {
  return (
    <img
      className="avatar"
      src={urlImagen}
      alt={nombre}
      onError={(e) => { e.target.src = 'https://i.pravatar.cc/150?img=0'; }}
    />
  );
}
