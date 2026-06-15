import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import RegionFilter from '../components/RegionFilter'

describe('RegionFilter', () => {
  it('renderiza el select', () => {
    render(<RegionFilter value="Todas" onChange={() => {}} />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('muestra todas las regiones', () => {
    render(<RegionFilter value="Todas" onChange={() => {}} />)
    expect(screen.getByText('Todas las regiones')).toBeInTheDocument()
    expect(screen.getByText('Africa')).toBeInTheDocument()
    expect(screen.getByText('Americas')).toBeInTheDocument()
    expect(screen.getByText('Asia')).toBeInTheDocument()
    expect(screen.getByText('Europe')).toBeInTheDocument()
    expect(screen.getByText('Oceania')).toBeInTheDocument()
  })

  it('llama onChange al seleccionar región', () => {
    const onChange = vi.fn()
    render(<RegionFilter value="Todas" onChange={onChange} />)
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Asia' } })
    expect(onChange).toHaveBeenCalledWith('Asia')
  })
})
