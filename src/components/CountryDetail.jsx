function CountryDetail({ country, onBack }) {
  // Extraemos todos los camos con detalles necesarios para mostrar la información completa del país. Usamos el mismo patrón de acceso seguro con "??" para evitar errores si algún campo falta.
  const name       = country["names.common"] ?? "Sin nombre";
  const official   = country["names.official"] ?? "N/A";
  const flag       = country["flags.svg"] ?? country["flags.png"] ?? "";
  const capital    = country["capitals"]?.[0] ?? "N/A";
  const population = country.population?.toLocaleString("es-ES") ?? "N/A";
  const region     = country.region ?? "N/A";
  const subregion  = country.subregion ?? "N/A";
  const tld        = country["tlds"]?.[0] ?? "N/A";

  // Idiomas (la API devuelve un objeto con códigos como claves, así que los convertimos a una lista legible)
  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "N/A";

  // Monedas
  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((c) => `${c.name} (${c.symbol ?? ""})`)
        .join(", ")
    : "N/A";

  // Nombre nativo
  const nativeNameObj = country["names.native"];
  const nativeName = nativeNameObj
    ? Object.values(nativeNameObj)[0]?.common ?? name
    : name;

  // Paises fronterizos
  const borders = country.borders ?? [];

  return (
    <div className="detail-page">
      <button className="back-btn" onClick={onBack}>
        ← Volver a la lista
      </button>

      <div className="detail-card">
        <div className="detail-flag-section">
          {flag ? (
            <img src={flag} alt={`Bandera de ${name}`} className="detail-flag" />
          ) : (
            <div className="detail-flag-placeholder">🏳️</div>
          )}
        </div>

        <div className="detail-info">
          <h2 className="detail-name">{name}</h2>

          <div className="detail-columns">
            <div className="detail-col">
              <p><span className="detail-label">Nombre oficial:</span> {official}</p>
              <p><span className="detail-label">Nombre nativo:</span> {nativeName}</p>
              <p><span className="detail-label">Capital:</span> {capital}</p>
              <p><span className="detail-label">Población:</span> {population}</p>
            </div>
            <div className="detail-col">
              <p><span className="detail-label">Región:</span> {region}</p>
              <p><span className="detail-label">Subregión:</span> {subregion}</p>
              <p><span className="detail-label">Idiomas:</span> {languages}</p>
              <p><span className="detail-label">Monedas:</span> {currencies}</p>
              <p><span className="detail-label">Dominio (.tld):</span> {tld}</p>
            </div>
          </div>

          {borders.length > 0 && (
            <div className="detail-borders">
              <span className="detail-label">Países fronterizos:</span>
              <div className="borders-list">
                {borders.map((code) => (
                  <span key={code} className="border-tag">
                    {code}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CountryDetail;