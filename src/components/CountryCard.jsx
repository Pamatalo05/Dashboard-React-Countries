export default function CountryCard({ country, onClick }) {
  const { name, capital, population, region, flags } = country;

  return (
    <div className="country-card" onClick={() => onClick(country)}>
      <div className="card-flag">
        {flags.png
          ? <img src={flags.png} alt={`Bandera de ${name.common}`} />
          : <div className="flag-placeholder">🏳️</div>
        }
      </div>
      <div className="card-body">
        <h2 className="card-name">{name.common}</h2>
        <p><span>Población:</span> {population.toLocaleString()}</p>
        <p><span>Región:</span> {region || "N/A"}</p>
        <p><span>Capital:</span> {capital?.[0] ?? "N/A"}</p>
      </div>
    </div>
  );
}