import CountryCard from "./CountryCard";

function CountryList({ countries, onSelect }) {
  if (countries.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-icon">🔍</p>
        <p className="empty-text">No se encontraron países con ese filtro.</p>
      </div>
    );
  }

  return (
    <div className="country-grid">
      {countries.map((country) => (
        <CountryCard
          key={country["codes.alpha_3"] ?? country["names.common"]}
          country={country}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

export default CountryList;