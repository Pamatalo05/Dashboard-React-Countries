import { describe, it, expect } from 'vitest'

// Utilidad de filtrado — misma lógica que en App.jsx
function filterCountries(countries, search, region) {
  return countries.filter((c) => {
    const matchSearch = c.name.common.toLowerCase().includes(search.toLowerCase())
    const matchRegion = region === 'Todas' || c.region === region
    return matchSearch && matchRegion
  })
}

// Utilidad de ordenamiento
function sortCountries(countries, sortBy) {
  return [...countries].sort((a, b) => {
    if (sortBy === 'name') return a.name.common.localeCompare(b.name.common)
    if (sortBy === 'population') return b.population - a.population
    return 0
  })
}

const mockCountries = [
  { uuid: '1', name: { common: 'Colombia' }, region: 'Americas', population: 50000000 },
  { uuid: '2', name: { common: 'Chile' }, region: 'Americas', population: 19000000 },
  { uuid: '3', name: { common: 'Japón' }, region: 'Asia', population: 125000000 },
  { uuid: '4', name: { common: 'Francia' }, region: 'Europe', population: 67000000 },
]

describe('filterCountries', () => {
  it('devuelve todos cuando búsqueda está vacía y región es Todas', () => {
    expect(filterCountries(mockCountries, '', 'Todas')).toHaveLength(4)
  })

  it('filtra por nombre correctamente', () => {
    const result = filterCountries(mockCountries, 'col', 'Todas')
    expect(result).toHaveLength(1)
    expect(result[0].name.common).toBe('Colombia')
  })

  it('búsqueda es insensible a mayúsculas', () => {
    const result = filterCountries(mockCountries, 'CHILE', 'Todas')
    expect(result).toHaveLength(1)
    expect(result[0].name.common).toBe('Chile')
  })

  it('filtra por región correctamente', () => {
    const result = filterCountries(mockCountries, '', 'Americas')
    expect(result).toHaveLength(2)
  })

  it('combina búsqueda y región', () => {
    const result = filterCountries(mockCountries, 'col', 'Americas')
    expect(result).toHaveLength(1)
    expect(result[0].name.common).toBe('Colombia')
  })

  it('devuelve vacío si no hay coincidencias', () => {
    expect(filterCountries(mockCountries, 'xyz', 'Todas')).toHaveLength(0)
  })
})

describe('sortCountries', () => {
  it('ordena por nombre alfabéticamente', () => {
    const result = sortCountries(mockCountries, 'name')
    expect(result[0].name.common).toBe('Chile')
    expect(result[1].name.common).toBe('Colombia')
  })

  it('ordena por población de mayor a menor', () => {
    const result = sortCountries(mockCountries, 'population')
    expect(result[0].name.common).toBe('Japón')
    expect(result[result.length - 1].name.common).toBe('Chile')
  })
})
