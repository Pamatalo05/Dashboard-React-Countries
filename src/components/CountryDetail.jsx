import { useState, useEffect } from "react";
import { fetchCountryByUUID } from "../hooks/useCountries";
import Loading from "./Loading";

export default function CountryDetail({ country, onBack }) {
  // Recibe el objeto country completo directamente (ya normalizado)
  if (!country) return null;

  const nativeName = country.name.nativeName
    ? Object.values(country.name.nativeName)[0]?.common
    : country.name.common;

  const languages = Object.values(country.languages ?? {}).join(", ") || "N/A";

  const currencies = Object.values(country.currencies ?? {})
    .map((c) => `${c.name} (${c.symbol ?? ""})`)
    .join(", ") || "N/A";

  return (
    <div className="detail-container">
      <button className="back-btn" onClick={onBack}>← Volver</button>

      <div className="detail-content">
        <div className="detail-flag">
          {country.flags.svg || country.flags.png
            ? <img src={country.flags.svg || country.flags.png} alt={`Bandera de ${country.name.common}`} />
            : <div className="flag-placeholder-lg">🏳️</div>
          }
        </div>

        <div className="detail-info">
          <h1>{country.name.common}</h1>

          <div className="detail-columns">
            <div>
              <p><span>Nombre oficial:</span> {country.name.official}</p>
              <p><span>Nombre nativo:</span> {nativeName ?? "N/A"}</p>
              <p><span>Población:</span> {country.population.toLocaleString()}</p>
              <p><span>Región:</span> {country.region || "N/A"}</p>
              <p><span>Subregión:</span> {country.subregion || "N/A"}</p>
              <p><span>Capital:</span> {country.capital?.[0] ?? "N/A"}</p>
            </div>
            <div>
              <p><span>Dominio:</span> {country.tld?.join(", ") || "N/A"}</p>
              <p><span>Monedas:</span> {currencies}</p>
              <p><span>Idiomas:</span> {languages}</p>
            </div>
          </div>

          {country.borders?.length > 0 && (
            <div className="borders-section">
              <span>Países fronterizos:</span>
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