export default function SelectorPromocion({ promociones, promocionSeleccionada, onChange }) {
  return (
    <div className="filter-row">
      <label>Promoció</label>
      <select value={promocionSeleccionada} onChange={(e) => onChange(e.target.value)}>
        <option value="">Totes</option>
        {promociones.map((p) => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>
    </div>
  );
}
