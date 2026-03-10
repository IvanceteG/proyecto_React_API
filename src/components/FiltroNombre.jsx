export default function FiltroNombre({ value, onChange }) {
  return (
    <div className="filter-row">
      <label>Cerca</label>
      <input
        type="text"
        value={value}
        placeholder="Filtrar per nom o cognoms..."
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
