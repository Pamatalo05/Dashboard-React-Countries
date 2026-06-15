import confetti from 'canvas-confetti'

export default function CountryCard({ country, onClick, isFavorite, onToggleFavorite }) {
  const { name, flags, capital, population, region } = country;
  const flagUrl = flags.svg || flags.png;

  const handleFavorite = (e) => {
    e.stopPropagation();
    if (!isFavorite) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#fbbf24', '#f59e0b', '#ef4444', '#3b82f6', '#10b981'],
      });
    }
    onToggleFavorite(country);
  };

  return (
    <div className="country-card" onClick={() => onClick(country)}>
      <div className="card-flag-wrapper">
        {flagUrl
          ? <img className="card-flag" src={flagUrl} alt={`Bandera de ${name.common}`} />
          : <div className="card-flag-placeholder">🏳️</div>
        }
        <button
          className={`fav-btn ${isFavorite ? "fav-active" : ""}`}
          onClick={handleFavorite}
          title={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          {isFavorite ? "⭐" : "☆"}
        </button>
      </div>
      <div className="card-body">
        <h2 className="card-name">{name.common}</h2>
        <p className="card-info"><span className="card-label">Capital:</span> {capital?.[0] ?? "N/A"}</p>
        <p className="card-info"><span className="card-label">Población:</span> {population.toLocaleString()}</p>
        <p className="card-info"><span className="card-label">Región:</span> {region || "N/A"}</p>
      </div>
    </div>
  );
}