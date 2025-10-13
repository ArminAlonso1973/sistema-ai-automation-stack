import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Leads } from '../../src/pages/Leads'

// Mock components
vi.mock('../../src/components/StatsCard', () => ({
  StatsCard: ({ title, value }) => (
    <div data-testid="stats-card">
      <span>{title}</span>
      <span>{value}</span>
    </div>
  )
}))

vi.mock('../../src/components/LeadTable', () => ({
  LeadTable: ({ title, showFilters, showActions }) => (
    <div data-testid="lead-table">
      <span>{title}</span>
      <span data-testid="show-filters">{showFilters ? 'with-filters' : 'no-filters'}</span>
      <span data-testid="show-actions">{showActions ? 'with-actions' : 'no-actions'}</span>
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

describe('Leads Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Layout and Header', () => {
    it('debe renderizar título y descripción', () => {
      renderWithRouter(<Leads />)

      expect(screen.getByText('Gestión de Leads')).toBeInTheDocument()
      expect(screen.getByText('Administra y analiza todos tus leads generados por IA')).toBeInTheDocument()
    })

    it('debe mostrar botones de acción en header', () => {
      renderWithRouter(<Leads />)

      expect(screen.getByText('Ver Analytics')).toBeInTheDocument()
      expect(screen.getByText('Exportar CSV')).toBeInTheDocument()
      expect(screen.getByText('Nuevo Lead')).toBeInTheDocument()
    })

    it('debe alternar vista con botón de analytics', () => {
      renderWithRouter(<Leads />)

      const toggleButton = screen.getByText('Ver Analytics')
      fireEvent.click(toggleButton)

      expect(screen.getByText('Ver Tabla')).toBeInTheDocument()
    })
  })

  describe('Lead Statistics', () => {
    it('debe mostrar 5 tarjetas de estadísticas', () => {
      renderWithRouter(<Leads />)

      const statsCards = screen.getAllByTestId('stats-card')
      expect(statsCards).toHaveLength(5)

      expect(screen.getByText('Total Leads')).toBeInTheDocument()
      expect(screen.getByText('Leads Calientes')).toBeInTheDocument()
      expect(screen.getByText('En Proceso')).toBeInTheDocument()
      expect(screen.getByText('Convertidos')).toBeInTheDocument()
      expect(screen.getByText('Tasa Conversión')).toBeInTheDocument()
    })

    it('debe mostrar valores correctos en stats', () => {
      renderWithRouter(<Leads />)

      expect(screen.getByText('1247')).toBeInTheDocument()
      expect(screen.getByText('89')).toBeInTheDocument()
      expect(screen.getByText('156')).toBeInTheDocument()
      expect(screen.getByText('45')).toBeInTheDocument()
      expect(screen.getByText('18.3%')).toBeInTheDocument()
    })
  })

  describe('Advanced Filters', () => {
    it('debe mostrar sección de filtros avanzados', () => {
      renderWithRouter(<Leads />)

      expect(screen.getByText('Filtros Avanzados')).toBeInTheDocument()
    })

    it('debe mostrar todos los selectores de filtro', () => {
      renderWithRouter(<Leads />)

      expect(screen.getByText('Período')).toBeInTheDocument()
      expect(screen.getByText('Origen')).toBeInTheDocument()
      expect(screen.getByText('Clasificación')).toBeInTheDocument()
      expect(screen.getByText('Estado')).toBeInTheDocument()
    })

    it('debe tener opciones por defecto en selectores', () => {
      renderWithRouter(<Leads />)

      const selects = screen.getAllByRole('combobox')
      expect(selects).toHaveLength(4)

      // Check default values
      expect(screen.getByDisplayValue('Última semana')).toBeInTheDocument()
      expect(screen.getByDisplayValue('Todos los orígenes')).toBeInTheDocument()
      expect(screen.getByDisplayValue('Todas')).toBeInTheDocument()
      expect(screen.getByDisplayValue('Todos')).toBeInTheDocument()
    })
  })

  describe('View Switching', () => {
    it('debe mostrar tabla por defecto', () => {
      renderWithRouter(<Leads />)

      expect(screen.getByTestId('lead-table')).toBeInTheDocument()
      expect(screen.getByText('Todos los Leads')).toBeInTheDocument()
    })

    it('debe cambiar a vista analytics', () => {
      renderWithRouter(<Leads />)

      const toggleButton = screen.getByText('Ver Analytics')
      fireEvent.click(toggleButton)

      expect(screen.getByText('Analytics de Leads')).toBeInTheDocument()
      expect(screen.getByText('Gráfico de Conversión')).toBeInTheDocument()
      expect(screen.getByText('Tendencias de Leads')).toBeInTheDocument()
    })

    it('debe pasar props correctas a LeadTable', () => {
      renderWithRouter(<Leads />)

      expect(screen.getByTestId('show-filters')).toHaveTextContent('with-filters')
      expect(screen.getByTestId('show-actions')).toHaveTextContent('with-actions')
    })
  })

  describe('Analytics View', () => {
    it('debe mostrar placeholders en vista analytics', () => {
      renderWithRouter(<Leads />)

      const toggleButton = screen.getByText('Ver Analytics')
      fireEvent.click(toggleButton)

      expect(screen.getByText('Próximamente: Análisis detallado de conversión por período')).toBeInTheDocument()
      expect(screen.getByText('Próximamente: Gráficos de tendencias y patrones')).toBeInTheDocument()
    })

    it('debe mostrar iconos en placeholders de analytics', () => {
      renderWithRouter(<Leads />)

      const toggleButton = screen.getByText('Ver Analytics')
      fireEvent.click(toggleButton)

      const placeholders = document.querySelectorAll('.border-dashed')
      expect(placeholders).toHaveLength(2)
    })
  })

  describe('Bulk Actions', () => {
    it('debe mostrar sección de acciones masivas', () => {
      renderWithRouter(<Leads />)

      expect(screen.getByText('Gestiona múltiples leads a la vez')).toBeInTheDocument()
    })

    it('debe mostrar botones de acciones masivas', () => {
      renderWithRouter(<Leads />)

      expect(screen.getByText('Asignar Etiquetas')).toBeInTheDocument()
      expect(screen.getByText('Marcar como Contactado')).toBeInTheDocument()
      expect(screen.getByText('Archivar Seleccionados')).toBeInTheDocument()
    })

    it('debe tener estilos correctos en botones masivos', () => {
      renderWithRouter(<Leads />)

      const assignBtn = screen.getByText('Asignar Etiquetas')
      const markBtn = screen.getByText('Marcar como Contactado')
      const archiveBtn = screen.getByText('Archivar Seleccionados')

      expect(assignBtn).toHaveClass('bg-blue-600')
      expect(markBtn).toHaveClass('bg-green-600')
      expect(archiveBtn).toHaveClass('bg-red-600')
    })
  })

  describe('Button Interactions', () => {
    it('debe manejar click en botones de header', () => {
      renderWithRouter(<Leads />)

      const exportBtn = screen.getByText('Exportar CSV')
      const newLeadBtn = screen.getByText('Nuevo Lead')

      expect(exportBtn).toHaveClass('hover:bg-blue-700')
      expect(newLeadBtn).toHaveClass('hover:bg-green-700')
    })

    it('debe alternar texto del botón de vista', () => {
      renderWithRouter(<Leads />)

      const toggleButton = screen.getByText('Ver Analytics')
      fireEvent.click(toggleButton)

      expect(screen.getByText('Ver Tabla')).toBeInTheDocument()
      expect(screen.queryByText('Ver Analytics')).not.toBeInTheDocument()

      fireEvent.click(screen.getByText('Ver Tabla'))

      expect(screen.getByText('Ver Analytics')).toBeInTheDocument()
      expect(screen.queryByText('Ver Tabla')).not.toBeInTheDocument()
    })
  })

  describe('Responsive Design', () => {
    it('debe tener clases grid responsivas', () => {
      renderWithRouter(<Leads />)

      const statsGrid = screen.getAllByTestId('stats-card')[0].closest('.grid')
      expect(statsGrid).toHaveClass('grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-5')

      const filtersGrid = screen.getByText('Período').closest('.grid')
      expect(filtersGrid).toHaveClass('grid-cols-1', 'md:grid-cols-4')
    })
  })
})