import { useState } from "react";
import { useCountries } from "./hooks/useCountries";
import CountryList from "./components/CountryList";
import CountryDetail from "./components/CountryDetail";
import SearchBar from "./components/SearchBar";
import RegionFilter from "./components/RegionFilter";
import LoadingSpinner from "./components/Loading";
import "./App.css";

function App() {
  const { countries, loading, error, retry } = useCountries();
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  // Filtrado en memoria mas rapidez
  const filtered = countries.filter((country) => {
    const name = country["names.common"]?.toLowerCase() ?? "";
    const matchSearch = name.includes(search.toLowerCase());
    const matchRegion = region ? country.region === region : true;
    return matchSearch && matchRegion;
  });

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="error-screen">
        <div className="error-box">
          <span className="error-icon">⚠️</span>
          <h2>Algo salió mal</h2>
          <p>{error}</p>
          <button className="retry-btn" onClick={retry}>
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (selectedCountry) {
    return (
      <CountryDetail
        country={selectedCountry}
        onBack={() => setSelectedCountry(null)}
      />
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">🌍 Countries Dashboard</h1>
        <p className="app-subtitle">{countries.length} países en total</p>
      </header>

      <div className="controls">
        <SearchBar value={search} onChange={setSearch} />
        <RegionFilter value={region} onChange={setRegion} />
      </div>

      <p className="results-count">
        Mostrando <strong>{filtered.length}</strong> países
      </p>

      <CountryList countries={filtered} onSelect={setSelectedCountry} />
    </div>
  );
}

export default App;