import { useState, useEffect } from "react";

const API_KEY = "rc_live_2c58fe17aceb4d6293f87cd3e18b0e71";
const BASE_URL = "https://api.restcountries.com/countries/v5";

export function useCountries() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCountries = () => {
    setLoading(true);
    setError(null);

    fetch(`${BASE_URL}?limit=250`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo cargar la lista de países.");
        return res.json();
      })
      .then((data) => {
        setCountries(data.data.objects);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return { countries, loading, error, retry: fetchCountries };
}