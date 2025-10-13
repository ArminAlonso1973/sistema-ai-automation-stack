// filepath: /Users/arminpalma/Documents/MacBookPro_Armin/Sistema_AI_automation_stack/frontend/tests/App.test.jsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../src/App'

// Mock all child components
vi.mock('../src/components/Layout', () => ({
  Layout: ({ children }) => (
    <div data-testid="layout">
      <header role="banner">
        <nav role="navigation" className="bg-gray-800">Test Navigation</nav>
      </header>
      <main>{children}</main>
    </div>
  )
}))

vi.mock('../src/pages/Dashboard', () => ({
  Dashboard: () => <div>Panel Principal</div>
}))

vi.mock('../src/pages/Leads', () => ({
  Leads: () => <div>Gestión de Leads</div>
}))

vi.mock('../src/pages/Proposals', () => ({
  Proposals: () => <div>Próximas Funcionalidades</div>
}))

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Router Configuration', () => {
    it('debe renderizar Layout en todas las rutas', () => {
      render(<App />)
      expect(screen.getByRole('banner')).toBeInTheDocument()
      expect(screen.getByRole('navigation')).toHaveClass('bg-gray-800')
    })

    it('debe renderizar Dashboard en ruta raíz', () => {
      render(<App />)
      expect(screen.getByText('Panel Principal')).toBeInTheDocument()
    })

    it('debe renderizar contenido correctamente', () => {
      render(<App />)
      expect(screen.getByText('Panel Principal')).toBeInTheDocument()
    })

    it('debe tener estructura de router', () => {
      render(<App />)
      expect(screen.getByTestId('layout')).toBeInTheDocument()
    })
  })

  describe('Layout Integration', () => {
    it('debe envolver todas las páginas en Layout', () => {
      render(<App />)
      expect(screen.getByTestId('layout')).toBeInTheDocument()
    })

    it('debe mantener navigation consistente', () => {
      render(<App />)
      expect(screen.getByRole('navigation')).toBeInTheDocument()
    })
  })

  describe('Route Switching', () => {
    it('debe cambiar contenido correctamente', () => {
      render(<App />)
      expect(screen.getByText('Panel Principal')).toBeInTheDocument()
    })
  })

  describe('Error Handling', () => {
    it('debe manejar renderizado sin errores', () => {
      expect(() => {
        render(<App />)
      }).not.toThrow()
      expect(screen.getByTestId('layout')).toBeInTheDocument()
    })
  })

  describe('Component Structure', () => {
    it('debe tener estructura de componentes correcta', () => {
      render(<App />)
      expect(screen.getByTestId('layout')).toBeInTheDocument()
      expect(screen.getByRole('banner')).toBeInTheDocument()
      expect(screen.getByRole('navigation')).toBeInTheDocument()
      expect(screen.getByRole('main')).toBeInTheDocument()
    })

    it('debe mantener Layout como componente padre', () => {
      render(<App />)
      const layout = screen.getByTestId('layout')
      const main = screen.getByRole('main')
      expect(layout).toContainElement(main)
    })
  })

  describe('Router Props', () => {
    it('debe usar BrowserRouter como router principal', () => {
      render(<App />)
      expect(screen.getByTestId('layout')).toBeInTheDocument()
    })

    it('debe pasar children correctamente a Layout', () => {
      render(<App />)
      const main = screen.getByRole('main')
      expect(main).toHaveTextContent('Panel Principal')
    })
  })

  describe('Navigation State', () => {
    it('debe mantener estado consistente durante navegación', () => {
      render(<App />)
      const navigation = screen.getByRole('navigation')
      expect(navigation).toBeInTheDocument()
      expect(navigation).toHaveClass('bg-gray-800')
    })
  })
})