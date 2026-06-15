import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import CountryCard from '../components/CountryCard'

const mockCountry = {
  uuid: '123',
  name: { common: 'Colombia', official: 'República de Colombia', nativeName: {} },
  capital: ['Bogotá'],
  population: 50882891,
  region: 'Americas',
  flags: { svg: 'https://flagcdn.com/co.svg', png: '' },
  languages: {},
  currencies: {},
  borders: [],
  tld: [],
}

describe('CountryCard', () => {
  it('muestra el nombre del país', () => {
    render(<CountryCard country={mockCountry} onClick={() => {}} isFavorite={false} onToggleFavorite={() => {}} />)
    expect(screen.getByText('Colombia')).toBeInTheDocument()
  })

  it('muestra la capital', () => {
    render(<CountryCard country={mockCountry} onClick={() => {}} isFavorite={false} onToggleFavorite={() => {}} />)
    expect(screen.getByText(/Bogotá/)).toBeInTheDocument()
  })

  it('muestra la población', () => {
    render(<CountryCard country={mockCountry} onClick={() => {}} isFavorite={false} onToggleFavorite={() => {}} />)
    expect(screen.getByText(/50/)).toBeInTheDocument()
  })

  it('muestra la región', () => {
    render(<CountryCard country={mockCountry} onClick={() => {}} isFavorite={false} onToggleFavorite={() => {}} />)
    expect(screen.getByText(/Americas/)).toBeInTheDocument()
  })

  it('llama onClick al hacer clic en la tarjeta', () => {
    const onClick = vi.fn()
    render(<CountryCard country={mockCountry} onClick={onClick} isFavorite={false} onToggleFavorite={() => {}} />)
    fireEvent.click(screen.getByText('Colombia'))
    expect(onClick).toHaveBeenCalledWith(mockCountry)
  })

  it('muestra estrella vacía si no es favorito', () => {
    render(<CountryCard country={mockCountry} onClick={() => {}} isFavorite={false} onToggleFavorite={() => {}} />)
    expect(screen.getByText('☆')).toBeInTheDocument()
  })

  it('muestra estrella llena si es favorito', () => {
    render(<CountryCard country={mockCountry} onClick={() => {}} isFavorite={true} onToggleFavorite={() => {}} />)
    expect(screen.getByText('⭐')).toBeInTheDocument()
  })

  it('llama onToggleFavorite al hacer clic en favorito', () => {
    const onToggle = vi.fn()
    render(<CountryCard country={mockCountry} onClick={() => {}} isFavorite={false} onToggleFavorite={onToggle} />)
    fireEvent.click(screen.getByText('☆'))
    expect(onToggle).toHaveBeenCalled()
  })
})
