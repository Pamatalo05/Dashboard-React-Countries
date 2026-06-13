function CountryCard({ country, onSelect }) {
    
  const name = country["names.common"] ?? "Sin nombre";
  const flag = country["flags.svg"] ?? country["flags.png"] ?? "";
  const capital = country["capitals"]?.[0] ?? "N/A";
  const population = country.population?.toLocaleString("es-ES") ?? "N/A";
  const region = country.region ?? "N/A";

  return (
    <div className="country-card" onClick={() => onSelect(country)}>
      <div className="card-flag-wrapper">
        {flag ? (
          <img src={flag} alt={`Bandera de ${name}`} className="card-flag" />
        ) : (
          <div className="card-flag-placeholder">🏳️</div>
        )}
      </div>
      <div className="card-body">
        <h3 className="card-name">{name}</h3>
        <p className="card-info">
          <span className="card-label">Capital:</span> {capital}
        </p>
        <p className="card-info">
          <span className="card-label">Población:</span> {population}
        </p>
        <p className="card-info">
          <span className="card-label">Región:</span> {region}
        </p>
      </div>
    </div>
  );
}

export default CountryCard;