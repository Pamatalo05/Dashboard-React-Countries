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

  const filtered = useMemo(() => {
    return countries.filter((c) => {
      const matchSearch = c.name.common
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchRegion = region === "Todas" || c.region === region;
      return matchSearch && matchRegion;
    });
  }, [countries, search, region]);

  if (selectedCountry) {
    return (
      <div className="app">
        <header className="app-header">
          <h1>🌍 Countries Dashboard</h1>
        </header>
        <main>
          <CountryDetail
            country={selectedCountry}
            onBack={() => setSelectedCountry(null)}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🌍 Countries Dashboard</h1>
      </header>

      <main>
        {loading && <Loading />}

        {error && (
          <div className="error-container">
            <p>⚠️ {error}</p>
            <button className="retry-btn" onClick={retry}>
              🔄 Reintentar
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="controls">
              <SearchBar value={search} onChange={setSearch} />
              <RegionFilter value={region} onChange={setRegion} />
            </div>
            <p className="results-count">{filtered.length} países encontrados</p>
            <CountryList
              countries={filtered}
              onSelect={(c) => setSelectedCountry(c)}
            />
          </>
        )}
      </main>
    </div>
  );
}