import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import SearchBar from '../components/SearchBar'

describe('SearchBar', () => {
  it('renderiza el input de búsqueda', () => {
    render(<SearchBar value="" onChange={() => {}} />)
    expect(screen.getByPlaceholderText('Buscar un país...')).toBeInTheDocument()
  })

  it('muestra el valor actual', () => {
    render(<SearchBar value="Peru" onChange={() => {}} />)
    expect(screen.getByDisplayValue('Peru')).toBeInTheDocument()
  })

  it('llama onChange al escribir', () => {
    const onChange = vi.fn()
    render(<SearchBar value="" onChange={onChange} />)
    fireEvent.change(screen.getByPlaceholderText('Buscar un país...'), {
      target: { value: 'Chile' },
    })
    expect(onChange).toHaveBeenCalledWith('Chile')
  })

  it('muestra botón limpiar cuando hay texto', () => {
    render(<SearchBar value="Chile" onChange={() => {}} />)
    expect(screen.getByText('✕')).toBeInTheDocument()
  })

  it('no muestra botón limpiar cuando está vacío', () => {
    render(<SearchBar value="" onChange={() => {}} />)
    expect(screen.queryByText('✕')).not.toBeInTheDocument()
  })

  it('limpia el input al hacer clic en ✕', () => {
    const onChange = vi.fn()
    render(<SearchBar value="Chile" onChange={onChange} />)
    fireEvent.click(screen.getByText('✕'))
    expect(onChange).toHaveBeenCalledWith('')
  })
})
