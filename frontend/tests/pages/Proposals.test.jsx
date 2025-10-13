import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Proposals } from '../../src/pages/Proposals'

// Mock components
vi.mock('../../src/components/StatsCard', () => ({
  StatsCard: ({ title, value }) => (
    <div data-testid="stats-card">
      <span>{title}</span>
      <span>{value}</span>
    </div>
  )
}))

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('Proposals Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Layout and Header', () => {
    it('debe renderizar título y descripción', () => {
      renderWithRouter(<Proposals />)

      expect(screen.getByText('Propuestas')).toBeInTheDocument()
      expect(screen.getByText('Gestiona propuestas automáticas generadas por IA')).toBeInTheDocument()
    })

    it('debe mostrar estadísticas de propuestas', () => {
      renderWithRouter(<Proposals />)

      const statsCards = screen.getAllByTestId('stats-card')
      expect(statsCards).toHaveLength(4)

      expect(screen.getByText('Propuestas Enviadas')).toBeInTheDocument()
      expect(screen.getByText('Aceptadas')).toBeInTheDocument()
      expect(screen.getByText('Tasa de Aceptación')).toBeInTheDocument()
      expect(screen.getByText('Valor Total')).toBeInTheDocument()
    })
  })

  describe('Coming Soon Section', () => {
    it('debe mostrar sección principal de coming soon', () => {
      renderWithRouter(<Proposals />)

      expect(screen.getByText('Generación Automática de Propuestas')).toBeInTheDocument()
      expect(screen.getByText(/Próximamente podrás generar propuestas personalizadas/)).toBeInTheDocument()
    })

    it('debe mostrar features preview con iconos', () => {
      renderWithRouter(<Proposals />)

      expect(screen.getByText('Generación Automática')).toBeInTheDocument()
      expect(screen.getByText('Personalización')).toBeInTheDocument()
      expect(screen.getByText('Tracking de ROI')).toBeInTheDocument()
    })

    it('debe mostrar descripciones de features', () => {
      renderWithRouter(<Proposals />)

      expect(screen.getByText('IA crea propuestas basadas en las conversaciones del lead')).toBeInTheDocument()
      expect(screen.getByText('Cada propuesta adaptada a las necesidades específicas')).toBeInTheDocument()
      expect(screen.getByText('Seguimiento completo de propuestas y conversiones')).toBeInTheDocument()
    })

    it('debe mostrar botón deshabilitado', () => {
      renderWithRouter(<Proposals />)

      const ctaButton = screen.getByText('Disponible Pronto')
      expect(ctaButton).toBeDisabled()
      expect(ctaButton).toHaveClass('disabled:opacity-50', 'disabled:cursor-not-allowed')
    })

    it('debe mostrar mensaje de redirección', () => {
      renderWithRouter(<Proposals />)

      expect(screen.getByText('Mientras tanto, puedes gestionar tus leads en la sección correspondiente')).toBeInTheDocument()
    })
  })

  describe('Roadmap Section', () => {
    it('debe mostrar hoja de ruta', () => {
      renderWithRouter(<Proposals />)

      expect(screen.getByText('Hoja de Ruta - Propuestas')).toBeInTheDocument()
    })

    it('debe mostrar todas las fases del roadmap', () => {
      renderWithRouter(<Proposals />)

      expect(screen.getByText('Plantillas de Propuestas')).toBeInTheDocument()
      expect(screen.getByText('Generación con IA')).toBeInTheDocument()
      expect(screen.getByText('Firma Digital y Pagos')).toBeInTheDocument()
    })

    it('debe mostrar descripciones de cada fase', () => {
      renderWithRouter(<Proposals />)

      expect(screen.getByText('Crear y gestionar plantillas personalizables para diferentes tipos de servicios')).toBeInTheDocument()
      expect(screen.getByText('Integración con GPT para generar propuestas basadas en conversaciones')).toBeInTheDocument()
      expect(screen.getByText('Integración con plataformas de firma digital y procesamiento de pagos')).toBeInTheDocument()
    })

    it('debe mostrar números de fase', () => {
      renderWithRouter(<Proposals />)

      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByText('2')).toBeInTheDocument()
      expect(screen.getByText('3')).toBeInTheDocument()
    })

    it('debe tener estilos diferentes para cada fase', () => {
      renderWithRouter(<Proposals />)

      const phase1 = screen.getByText('1').closest('div')
      const phase2 = screen.getByText('2').closest('div')
      const phase3 = screen.getByText('3').closest('div')

      expect(phase1).toHaveClass('bg-blue-100')
      expect(phase2).toHaveClass('bg-yellow-100')
      expect(phase3).toHaveClass('bg-gray-100')
    })
  })

  describe('Visual Elements', () => {
    it('debe tener gradient en sección principal', () => {
      renderWithRouter(<Proposals />)

      const gradientSection = screen.getByText('Generación Automática de Propuestas').closest('.bg-gradient-to-r')
      expect(gradientSection).toHaveClass('from-blue-50', 'to-indigo-100')
    })

    it('debe mostrar iconos SVG', () => {
      renderWithRouter(<Proposals />)

      // Check for SVG elements
      const svgElements = document.querySelectorAll('svg')
      expect(svgElements.length).toBeGreaterThan(3)
    })

    it('debe tener tarjetas de features con sombra', () => {
      renderWithRouter(<Proposals />)

      const featureCards = document.querySelectorAll('.shadow-sm')
      expect(featureCards.length).toBe(3)
    })
  })

  describe('Statistics Display', () => {
    it('debe mostrar valores correctos en estadísticas', () => {
      renderWithRouter(<Proposals />)

      expect(screen.getByText('45')).toBeInTheDocument() // Propuestas Enviadas
      expect(screen.getByText('12')).toBeInTheDocument() // Aceptadas
      expect(screen.getByText('26.7%')).toBeInTheDocument() // Tasa de Aceptación
      expect(screen.getByText('$48.5K')).toBeInTheDocument() // Valor Total
    })
  })

  describe('Responsive Design', () => {
    it('debe tener grid responsivo en estadísticas', () => {
      renderWithRouter(<Proposals />)

      const statsGrid = screen.getAllByTestId('stats-card')[0].closest('.grid')
      expect(statsGrid).toHaveClass('grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-4')
    })

    it('debe tener grid responsivo en features', () => {
      renderWithRouter(<Proposals />)

      const featuresGrid = screen.getByText('Generación Automática').closest('.grid')
      expect(featuresGrid).toHaveClass('grid-cols-1', 'md:grid-cols-3')
    })
  })

  describe('Content Structure', () => {
    it('debe tener estructura semántica correcta', () => {
      renderWithRouter(<Proposals />)

      const mainHeading = screen.getByRole('heading', { level: 1 })
      expect(mainHeading).toHaveTextContent('Propuestas')

      const secondaryHeading = screen.getByRole('heading', { level: 2 })
      expect(secondaryHeading).toHaveTextContent('Generación Automática de Propuestas')
    })

    it('debe tener espacio entre secciones', () => {
      renderWithRouter(<Proposals />)

      const mainContainer = screen.getByText('Propuestas').closest('.space-y-6')
      expect(mainContainer).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('debe tener botón con atributos de accesibilidad', () => {
      renderWithRouter(<Proposals />)

      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
      expect(button).toHaveClass('transition-colors')
    })
  })
})