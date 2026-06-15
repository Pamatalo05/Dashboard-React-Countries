import { useState, useMemo } from "react";
import { useCountries } from "./hooks/useCountries";
import CountryList from "./components/CountryList";
import CountryDetail from "./components/CountryDetail";
import SearchBar from "./components/SearchBar";
import RegionFilter from "./components/RegionFilter";
import Loading from "./components/Loading";

export default function App() {
  const { countries, loading, error, retry } = useCountries();
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("Todas");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("favorites") || "[]");
    } catch { return []; }
  });
  const [showFavorites, setShowFavorites] = useState(false);

  const toggleFavorite = (country) => {
    setFavorites((prev) => {
      const exists = prev.find((f) => f.uuid === country.uuid);
      const next = exists
        ? prev.filter((f) => f.uuid !== country.uuid)
        : [...prev, { uuid: country.uuid, name: country.name.common, flags: country.flags }];
      localStorage.setItem("favorites", JSON.stringify(next));
      return next;
    });
  };

  const isFavorite = (country) => favorites.some((f) => f.uuid === country.uuid);

  const filtered = useMemo(() => {
    let list = showFavorites
      ? countries.filter((c) => favorites.some((f) => f.uuid === c.uuid))
      : countries;

    list = list.filter((c) => {
      const matchSearch = c.name.common.toLowerCase().includes(search.toLowerCase());
      const matchRegion = region === "Todas" || c.region === region;
      return matchSearch && matchRegion;
    });

    list = [...list].sort((a, b) => {
      if (sortBy === "name") return a.name.common.localeCompare(b.name.common);
      if (sortBy === "population") return b.population - a.population;
      if (sortBy === "area") return (b.area || 0) - (a.area || 0);
      return 0;
    });

    return list;
  }, [countries, search, region, sortBy, favorites, showFavorites]);

  if (selectedCountry) {
    return (
      <div className={`app ${darkMode ? "dark" : ""}`}>
        <header className="app-header">
          <span className="app-title">🌍 Countries Dashboard</span>
          <button className="dark-toggle" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀️ Claro" : "🌙 Oscuro"}
          </button>
        </header>
        <main>
          <CountryDetail
            country={selectedCountry}
            onBack={() => setSelectedCountry(null)}
            isFavorite={isFavorite(selectedCountry)}
            onToggleFavorite={() => toggleFavorite(selectedCountry)}
          />
        </main>
      </div>
    );
  }

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <header className="app-header">
        <span className="app-title">🌍 Countries Dashboard</span>
        <button className="dark-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Claro" : "🌙 Oscuro"}
        </button>
      </header>

      <main>
        {loading && <Loading />}

        {error && (
          <div className="error-screen">
            <div className="error-box">
              <span className="error-icon">⚠️</span>
              <h2>Error al cargar</h2>
              <p>{error}</p>
              <button className="retry-btn" onClick={retry}>🔄 Reintentar</button>
            </div>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="controls">
              <SearchBar value={search} onChange={setSearch} />
              <RegionFilter value={region} onChange={setRegion} />
              <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="name">Ordenar: Nombre</option>
                <option value="population">Ordenar: Población</option>
                <option value="area">Ordenar: Área</option>
              </select>
              <button
                className={`fav-toggle ${showFavorites ? "active" : ""}`}
                onClick={() => setShowFavorites(!showFavorites)}
              >
                ⭐ Favoritos ({favorites.length})
              </button>
            </div>
            <p className="results-count">{filtered.length} países encontrados</p>
            <CountryList
              countries={filtered}
              onSelect={setSelectedCountry}
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
            />
          </>
        )}
      </main>
    </div>
  );
}