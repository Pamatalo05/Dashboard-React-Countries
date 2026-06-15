import CountryCard from "./CountryCard";

export default function CountryList({ countries, onSelect, isFavorite, onToggleFavorite }) {
  if (countries.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🔍</div>
        <p className="empty-text">No se encontraron países con ese filtro.</p>
      </div>
    );
  }

  return (
    <div className="country-grid">
      {countries.map((country) => (
        <CountryCard
          key={country.uuid}
          country={country}
          onClick={onSelect}
          isFavorite={isFavorite(country)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}