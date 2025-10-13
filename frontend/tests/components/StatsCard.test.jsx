// tests/components/StatsCard.test.jsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { StatsCard, SimpleStatsCard, MetricCard } from '../../src/components/StatsCard'

// Mock icon component
const MockIcon = (props) => <div data-testid="mock-icon" {...props} />

describe('StatsCard Component', () => {
  describe('Basic Functionality', () => {
    it('debe renderizar título y valor correctamente', () => {
      render(
        <StatsCard 
          title="Total Users"
          value={150}
        />
      )

      expect(screen.getByText('Total Users')).toBeInTheDocument()
      expect(screen.getByText('150')).toBeInTheDocument()
    })

    it('debe renderizar subtítulo cuando se proporciona', () => {
      render(
        <StatsCard 
          title="Revenue"
          value={25000}
          subtitle="This month"
        />
      )

      expect(screen.getByText('Revenue')).toBeInTheDocument()
      expect(screen.getByText('25.0K')).toBeInTheDocument() // Formatted value
      expect(screen.getByText('This month')).toBeInTheDocument()
    })

    it('debe renderizar icono cuando se proporciona', () => {
      render(
        <StatsCard 
          title="Messages"
          value={42}
          icon={MockIcon}
        />
      )

      expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
    })
  })

  describe('Loading State', () => {
    it('debe mostrar skeleton cuando está loading', () => {
      render(
        <StatsCard 
          title="Loading Test"
          value={100}
          loading={true}
        />
      )

      // Should show skeleton, not actual content
      expect(screen.queryByText('Loading Test')).not.toBeInTheDocument()
      expect(screen.queryByText('100')).not.toBeInTheDocument()
      
      // Should have loading animation class
      const skeletonElements = document.querySelectorAll('.animate-pulse')
      expect(skeletonElements.length).toBeGreaterThan(0)
    })
  })

  describe('Error State', () => {
    it('debe mostrar error cuando hay error', () => {
      render(
        <StatsCard 
          title="Error Test"
          value={100}
          error="Failed to load data"
        />
      )

      expect(screen.getByText('Error Test')).toBeInTheDocument()
      expect(screen.getByText('Error: Failed to load data')).toBeInTheDocument()
      expect(screen.queryByText('100')).not.toBeInTheDocument()
    })
  })

  describe('Trend Indicators', () => {
    it('debe mostrar trend up correctamente', () => {
      render(
        <StatsCard 
          title="Growth"
          value={1500}
          trend="up"
          trendValue="+12%"
        />
      )

      expect(screen.getByText('Growth')).toBeInTheDocument()
      expect(screen.getByText('1.5K')).toBeInTheDocument() // Formatted
      expect(screen.getByText('+12%')).toBeInTheDocument()
    })

    it('debe mostrar trend down correctamente', () => {
      render(
        <StatsCard 
          title="Decline"
          value={800}
          trend="down"
          trendValue="-5%"
        />
      )

      expect(screen.getByText('Decline')).toBeInTheDocument()
      expect(screen.getByText('800')).toBeInTheDocument()
      expect(screen.getByText('-5%')).toBeInTheDocument()
    })
  })

  describe('Click Functionality', () => {
    it('debe llamar onClick cuando se proporciona', () => {
      const mockOnClick = vi.fn()
      
      render(
        <StatsCard 
          title="Clickable"
          value={42}
          onClick={mockOnClick}
        />
      )

      const card = screen.getByText('Clickable').closest('.cursor-pointer')
      expect(card).toBeInTheDocument()
      
      fireEvent.click(card)
      expect(mockOnClick).toHaveBeenCalledTimes(1)
    })

    it('no debe tener cursor pointer cuando no hay onClick', () => {
      render(
        <StatsCard 
          title="Not Clickable"
          value={42}
        />
      )

      const card = screen.getByText('Not Clickable').closest('div')
      expect(card).not.toHaveClass('cursor-pointer')
    })
  })

  describe('Value Formatting', () => {
    it('debe formatear números grandes correctamente', () => {
      render(
        <StatsCard 
          title="Large Number"
          value={1500000}
        />
      )

      expect(screen.getByText('1.5M')).toBeInTheDocument()
    })

    it('debe formatear miles correctamente', () => {
      render(
        <StatsCard 
          title="Thousands"
          value={2500}
        />
      )

      expect(screen.getByText('2.5K')).toBeInTheDocument()
    })

    it('debe manejar valores null y undefined', () => {
      render(
        <div>
          <StatsCard title="Null Value" value={null} />
          <StatsCard title="Undefined Value" value={undefined} />
        </div>
      )

      const nullElements = screen.getAllByText('-')
      expect(nullElements).toHaveLength(2)
    })

    it('debe manejar valores string', () => {
      render(
        <StatsCard 
          title="String Value"
          value="Active"
        />
      )

      expect(screen.getByText('Active')).toBeInTheDocument()
    })
  })
})

describe('SimpleStatsCard Component', () => {
  it('debe renderizar como StatsCard simplificado', () => {
    render(
      <SimpleStatsCard 
        title="Simple Test"
        value={100}
        loading={false}
      />
    )

    expect(screen.getByText('Simple Test')).toBeInTheDocument()
    expect(screen.getByText('100')).toBeInTheDocument()
  })
})

describe('MetricCard Component', () => {
  it('debe renderizar con icono y color', () => {
    render(
      <MetricCard 
        title="Metrics Test"
        value={250}
        icon={MockIcon}
        color="green"
      />
    )

    expect(screen.getByText('Metrics Test')).toBeInTheDocument()
    expect(screen.getByText('250')).toBeInTheDocument()
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
  })

  it('debe aplicar colores correctamente', () => {
    const { rerender } = render(
      <MetricCard 
        title="Color Test"
        value={100}
        icon={MockIcon}
        color="red"
      />
    )

    let iconContainer = screen.getByTestId('mock-icon').parentElement
    expect(iconContainer).toHaveClass('bg-red-100', 'text-red-600')

    rerender(
      <MetricCard 
        title="Color Test"
        value={100}
        icon={MockIcon}
        color="blue"
      />
    )

    iconContainer = screen.getByTestId('mock-icon').parentElement
    expect(iconContainer).toHaveClass('bg-blue-100', 'text-blue-600')
  })
})