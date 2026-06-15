const REGIONS = ["Todas", "Africa", "Americas", "Asia", "Europe", "Oceania"];

export default function RegionFilter({ value, onChange }) {
  return (
    <div className="region-wrapper">
      <select className="region-select" value={value} onChange={(e) => onChange(e.target.value)}>
        {REGIONS.map((r) => (
          <option key={r} value={r}>{r === "Todas" ? "Todas las regiones" : r}</option>
        ))}
      </select>
    </div>
  );
}