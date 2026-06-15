export default function CountryCard({ country, onClick }) {
  const { name, flags } = country;
  const flagUrl = flags.svg || flags.png;

  return (
    <div className="country-card" onClick={() => onClick(country)}>
      <div className="card-flag-wrapper">
        {flagUrl
          ? <img className="card-flag" src={flagUrl} alt={`Bandera de ${name.common}`} />
          : <div className="card-flag-placeholder">🏳️</div>
        }
      </div>
      <div className="card-body">
        <h2 className="card-name">{name.common}</h2>
      </div>
    </div>
  );
}