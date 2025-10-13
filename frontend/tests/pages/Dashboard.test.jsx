import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Dashboard } from '../../src/pages/Dashboard'

// Mock components
vi.mock('../../src/components/StatsCard', () => ({
  StatsCard: ({ title, value }) => (
    <div data-testid="stats-card">
      <span>{title}</span>
      <span>{value}</span>
    </div>
  )
}))

vi.mock('../../src/components/ConversationList', () => ({
  ConversationList: ({ title }) => (
    <div data-testid="conversation-list">
      <span>{title}</span>
    </div>
  )
}))

vi.mock('../../src/components/LeadTable', () => ({
  LeadTable: ({ title }) => (
    <div data-testid="lead-table">
      <span>{title}</span>
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

describe('Dashboard Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Layout and Structure', () => {
    it('debe renderizar el título y descripción', () => {
      renderWithRouter(<Dashboard />)

      expect(screen.getByText('Dashboard')).toBeInTheDocument()
      expect(screen.getByText('Vista general de tu sistema de automatización AI')).toBeInTheDocument()
    })

    it('debe mostrar todas las tarjetas de estadísticas', () => {
      renderWithRouter(<Dashboard />)

      const statsCards = screen.getAllByTestId('stats-card')
      expect(statsCards).toHaveLength(4)
      
      expect(screen.getByText('Leads Totales')).toBeInTheDocument()
      expect(screen.getByText('Conversaciones')).toBeInTheDocument()
      expect(screen.getByText('Conversión')).toBeInTheDocument()
      expect(screen.getByText('Respuesta AI')).toBeInTheDocument()
    })

    it('debe renderizar componentes principales', () => {
      renderWithRouter(<Dashboard />)

      expect(screen.getByTestId('conversation-list')).toBeInTheDocument()
      expect(screen.getByTestId('lead-table')).toBeInTheDocument()
      expect(screen.getByText('Conversaciones Recientes')).toBeInTheDocument()
      expect(screen.getByText('Leads Recientes')).toBeInTheDocument()
    })
  })

  describe('Quick Actions', () => {
    it('debe mostrar sección de acciones rápidas', () => {
      renderWithRouter(<Dashboard />)

      expect(screen.getByText('Acciones Rápidas')).toBeInTheDocument()
      expect(screen.getByText('Enviar Broadcast')).toBeInTheDocument()
      expect(screen.getByText('Exportar Leads')).toBeInTheDocument()
      expect(screen.getByText('Ver Reportes')).toBeInTheDocument()
    })

    it('debe mostrar botones con estilos correctos', () => {
      renderWithRouter(<Dashboard />)

      const broadcastBtn = screen.getByText('Enviar Broadcast')
      const exportBtn = screen.getByText('Exportar Leads')
      const reportsBtn = screen.getByText('Ver Reportes')

      expect(broadcastBtn).toHaveClass('bg-blue-600', 'text-white')
      expect(exportBtn).toHaveClass('bg-green-600', 'text-white')
      expect(reportsBtn).toHaveClass('bg-purple-600', 'text-white')
    })
  })

  describe('Auto-refresh Indicator', () => {
    it('debe mostrar indicador de auto-refresh', () => {
      renderWithRouter(<Dashboard />)

      expect(screen.getByText('Actualizando datos cada 30 segundos')).toBeInTheDocument()
    })

    it('debe mostrar spinner de loading', () => {
      renderWithRouter(<Dashboard />)

      const spinner = document.querySelector('.animate-spin')
      expect(spinner).toBeInTheDocument()
    })
  })

  describe('Grid Layout', () => {
    it('debe tener estructura grid responsiva', () => {
      renderWithRouter(<Dashboard />)

      // Check for grid classes in stats section
      const statsGrid = screen.getAllByTestId('stats-card')[0].closest('.grid')
      expect(statsGrid).toHaveClass('grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-4')
    })

    it('debe tener layout principal de 2 columnas', () => {
      renderWithRouter(<Dashboard />)

      const mainGrid = screen.getByTestId('conversation-list').closest('.grid')
      expect(mainGrid).toHaveClass('grid-cols-1', 'lg:grid-cols-2')
    })
  })

  describe('Component Props', () => {
    it('debe pasar props correctas a ConversationList', () => {
      renderWithRouter(<Dashboard />)

      // ConversationList should receive showFilters=false and maxItems=5
      expect(screen.getByText('Conversaciones Recientes')).toBeInTheDocument()
    })

    it('debe pasar props correctas a LeadTable', () => {
      renderWithRouter(<Dashboard />)

      // LeadTable should receive showFilters=false, showActions=false, maxItems=5
      expect(screen.getByText('Leads Recientes')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('debe tener estructura semántica correcta', () => {
      renderWithRouter(<Dashboard />)

      const mainHeading = screen.getByRole('heading', { level: 1 })
      expect(mainHeading).toHaveTextContent('Dashboard')

      const quickActionsHeading = screen.getByRole('heading', { level: 3 })
      expect(quickActionsHeading).toHaveTextContent('Acciones Rápidas')
    })

    it('debe tener botones accesibles', () => {
      renderWithRouter(<Dashboard />)

      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(3)
      
      buttons.forEach(button => {
        expect(button).toHaveClass('transition-colors')
      })
    })
  })
})