const REGIONS = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

function RegionFilter({ value, onChange }) {
  return (
    <div className="region-wrapper">
      <select
        className="region-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Todas las regiones</option>
        {REGIONS.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
}

export default RegionFilter;