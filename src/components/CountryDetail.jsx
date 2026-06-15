import CountryTime from "./CountryTime";

export default function CountryDetail({ country, onBack, isFavorite, onToggleFavorite }) {
  if (!country) return null;

  const nativeName = country.name.nativeName
    ? Object.values(country.name.nativeName)[0]?.common
    : country.name.common;

  const languages = Object.values(country.languages ?? {}).join(", ") || "N/A";

  const currencies = Object.values(country.currencies ?? {})
    .map((c) => `${c.name} (${c.symbol ?? ""})`)
    .join(", ") || "N/A";

  const flagUrl = country.flags.svg || country.flags.png;

  return (
    <div className="detail-page">
      <div className="detail-top-bar">
        <button className="back-btn" onClick={onBack}>← Volver</button>
        <button
          className={`fav-btn-detail ${isFavorite ? "fav-active" : ""}`}
          onClick={onToggleFavorite}
        >
          {isFavorite ? "⭐ En favoritos" : "☆ Agregar a favoritos"}
        </button>
      </div>

      <div className="detail-card">
        <div className="detail-flag-section">
          {flagUrl
            ? <img className="detail-flag" src={flagUrl} alt={`Bandera de ${country.name.common}`} />
            : <div className="detail-flag-placeholder">🏳️</div>
          }
        </div>

        <div className="detail-info">
          <h1 className="detail-name">{country.name.common}</h1>

          <div className="detail-columns">
            <div className="detail-col">
              <p><span className="detail-label">Nombre oficial:</span> {country.name.official}</p>
              <p><span className="detail-label">Nombre nativo:</span> {nativeName ?? "N/A"}</p>
              <p><span className="detail-label">Población:</span> {country.population.toLocaleString()}</p>
              <p><span className="detail-label">Región:</span> {country.region || "N/A"}</p>
              <p><span className="detail-label">Subregión:</span> {country.subregion || "N/A"}</p>
              <p><span className="detail-label">Capital:</span> {country.capital?.[0] ?? "N/A"}</p>
            </div>
            <div className="detail-col">
              <p><span className="detail-label">Dominio:</span> {country.tld?.join(", ") || "N/A"}</p>
              <p><span className="detail-label">Monedas:</span> {currencies}</p>
              <p><span className="detail-label">Idiomas:</span> {languages}</p>
            </div>
          </div>

          <CountryTime timezones={country.timezones} />

          {country.borders?.length > 0 && (
            <div className="detail-borders" style={{ marginTop: '16px' }}>
              <span className="detail-label">Países fronterizos:</span>
              <div className="borders-list">
                {country.borders.map((code) => (
                  <span key={code} className="border-tag">{code}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}