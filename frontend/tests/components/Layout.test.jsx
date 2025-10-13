// tests/components/Layout.test.jsx
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Layout } from '../../src/components/Layout'

// Mock useAuth hook
vi.mock('../../src/hooks/useAuth', () => ({
  useAuth: vi.fn()
}))

describe('Layout Component', () => {
  const mockUseAuth = vi.fn()
  
  beforeEach(async () => {
    const { useAuth } = await import('../../src/hooks/useAuth')
    useAuth.mockImplementation(() => mockUseAuth())
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('Authentication States', () => {
    it('debe mostrar login form cuando no está autenticado', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        login: vi.fn()
      })

      render(<Layout><div>Test Content</div></Layout>)

      expect(screen.getByText('Sistema AI Automation')).toBeInTheDocument()
      expect(screen.getByText('Ingresa tu ID de cliente para acceder')).toBeInTheDocument()
      expect(screen.getByLabelText('ID del Cliente')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Acceder' })).toBeInTheDocument()
    })

    it('debe mostrar dashboard cuando está autenticado', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        clienteId: 'test_cliente',
        logout: vi.fn(),
        switchClient: vi.fn()
      })

      render(<Layout><div>Dashboard Content</div></Layout>)

      expect(screen.getByText('AI Bot Dashboard')).toBeInTheDocument()
      expect(screen.getByText('Dashboard Content')).toBeInTheDocument()
      expect(screen.getByText('Cliente:')).toBeInTheDocument()
      expect(screen.getByText('test_cliente')).toBeInTheDocument()
    })
  })

  describe('Login Form', () => {
    it('debe permitir login con cliente ID válido', async () => {
      const mockLogin = vi.fn()
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        login: mockLogin
      })

      render(<Layout><div>Test</div></Layout>)

      const input = screen.getByLabelText('ID del Cliente')
      const button = screen.getByRole('button', { name: 'Acceder' })

      fireEvent.change(input, { target: { value: 'pizzeria_mario' } })
      fireEvent.click(button)

      expect(mockLogin).toHaveBeenCalledWith('pizzeria_mario')
    })

    it('no debe permitir login con cliente ID vacío', async () => {
      const mockLogin = vi.fn()
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        login: mockLogin
      })

      render(<Layout><div>Test</div></Layout>)

      const button = screen.getByRole('button', { name: 'Acceder' })
      fireEvent.click(button)

      expect(mockLogin).not.toHaveBeenCalled()
    })
  })

  describe('Navigation', () => {
    beforeEach(() => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        clienteId: 'test_cliente',
        logout: vi.fn(),
        switchClient: vi.fn()
      })
    })

    it('debe mostrar enlaces de navegación', () => {
      render(<Layout><div>Test</div></Layout>)

      expect(screen.getByText('Dashboard')).toBeInTheDocument()
      expect(screen.getByText('Leads')).toBeInTheDocument()
      expect(screen.getByText('Propuestas')).toBeInTheDocument()
    })

    it('debe mostrar menú de usuario', async () => {
      render(<Layout><div>Test</div></Layout>)

      const userButton = screen.getByRole('button', { name: /Open user menu/i })
      fireEvent.click(userButton)

      await waitFor(() => {
        const changeClientButtons = screen.getAllByText('Cambiar Cliente')
        const logoutButtons = screen.getAllByText('Cerrar Sesión')
        // Desktop menu (first) should be visible
        expect(changeClientButtons[0]).toBeInTheDocument()
        expect(logoutButtons[0]).toBeInTheDocument()
      })
    })

    it('debe permitir logout', async () => {
      const mockLogout = vi.fn()
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        clienteId: 'test_cliente',
        logout: mockLogout,
        switchClient: vi.fn()
      })

      render(<Layout><div>Test</div></Layout>)

      const userButton = screen.getByRole('button', { name: /Open user menu/i })
      fireEvent.click(userButton)

      await waitFor(() => {
        const logoutButtons = screen.getAllByText('Cerrar Sesión')
        // Click the desktop menu logout button (first)
        fireEvent.click(logoutButtons[0])
        expect(mockLogout).toHaveBeenCalled()
      })
    })
  })

  describe('Responsive Behavior', () => {
    beforeEach(() => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        clienteId: 'test_cliente',
        logout: vi.fn(),
        switchClient: vi.fn()
      })
    })

    it('debe tener botón de menú móvil', () => {
      render(<Layout><div>Test</div></Layout>)

      const mobileMenuButton = screen.getByRole('button', { name: 'Open main menu' })
      expect(mobileMenuButton).toBeInTheDocument()
    })
  })

  describe('Client Avatar', () => {
    it('debe mostrar inicial del cliente en avatar', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        clienteId: 'pizzeria_mario',
        logout: vi.fn(),
        switchClient: vi.fn()
      })

      render(<Layout><div>Test</div></Layout>)

      expect(screen.getByText('P')).toBeInTheDocument() // Primera letra de pizzeria_mario
    })

    it('debe mostrar U por defecto para cliente sin ID', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        clienteId: null,
        logout: vi.fn(),
        switchClient: vi.fn()
      })

      render(<Layout><div>Test</div></Layout>)

      expect(screen.getByText('U')).toBeInTheDocument()
    })
  })
})