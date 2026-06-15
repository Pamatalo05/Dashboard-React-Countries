import { useState, useEffect } from "react";

const BASE_URL = import.meta.env.PROD ? "/api/countries" : "http://localhost:3001/api";

function normalize(c) {
  return {
    uuid: c.uuid,
    name: {
      common: c.names?.common ?? "",
      official: c.names?.official ?? "",
      nativeName: c.names?.native ?? {},
    },
    capital: c.capitals?.map((cap) => cap.name) ?? [],
    population: c.population ?? 0,
    region: c.region ?? "",
    subregion: c.subregion ?? "",
    flags: {
      png: c.flag?.url_png ?? "",
      svg: c.flag?.url_svg ?? "",
    },
    languages: c.languages?.reduce((acc, l) => {
      acc[l.iso639_3] = l.name;
      return acc;
    }, {}) ?? {},
    currencies: c.currencies?.reduce((acc, cur) => {
      acc[cur.code] = { name: cur.name, symbol: cur.symbol };
      return acc;
    }, {}) ?? {},
    borders: c.borders ?? [],
    tld: c.tlds ?? [],
    timezones: c.timezones ?? [],
  };
}

async function fetchAllCountries() {
  const LIMIT = 25;
  let offset = 0;
  let allCountries = [];
  let more = true;

  while (more) {
    const res = await fetch(`${BASE_URL}?limit=${LIMIT}&offset=${offset}`);
    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
    const json = await res.json();
    const objects = json?.data?.objects ?? [];
    allCountries = [...allCountries, ...objects];
    more = json?.data?.meta?.more ?? false;
    offset += LIMIT;
  }

  return allCountries;
}

export function useCountries() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCountries = () => {
    setLoading(true);
    setError(null);

    fetchAllCountries()
      .then((raw) => {
        const normalized = raw.map(normalize);
        const sorted = normalized.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sorted);
        setLoading(false);
      })
      .catch((err) => {
        setError("No se pudo cargar la lista de países. " + err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return { countries, loading, error, retry: fetchCountries };
}