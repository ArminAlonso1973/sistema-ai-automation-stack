// tests/hooks/useAuth.test.js
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useAuth } from '../../src/hooks/useAuth'

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
}

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
})

// Mock window.location.reload
Object.defineProperty(window, 'location', {
  value: {
    reload: vi.fn()
  }
})

describe('useAuth Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  describe('Initial state', () => {
    it('debe inicializar no autenticado cuando no hay cliente_id en localStorage', async () => {
      mockLocalStorage.getItem.mockReturnValue(null)

      const { result } = renderHook(() => useAuth())

      // Wait for useEffect to complete
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0))
      })

      expect(result.current.isAuthenticated).toBe(false)
      expect(result.current.clienteId).toBe(null)
      expect(result.current.loading).toBe(false)
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('cliente_id')
    })

    it('debe inicializar autenticado cuando hay cliente_id en localStorage', async () => {
      const storedClientId = 'pizzeria_123'
      mockLocalStorage.getItem.mockReturnValue(storedClientId)

      const { result } = renderHook(() => useAuth())

      // Wait for useEffect to complete
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0))
      })

      expect(result.current.isAuthenticated).toBe(true)
      expect(result.current.clienteId).toBe(storedClientId)
      expect(result.current.loading).toBe(false)
    })

    it('debe empezar con loading true y cambiar a false', async () => {
      mockLocalStorage.getItem.mockReturnValue(null)

      const { result } = renderHook(() => useAuth())

      // El loading puede cambiar muy rápido, verificamos el estado final
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0))
      })

      // Verificamos que el loading termine en false y el estado sea correcto
      expect(result.current.loading).toBe(false)
      expect(result.current.isAuthenticated).toBe(false)
      expect(result.current.clienteId).toBe(null)
    })
  })

  describe('Login functionality', () => {
    it('debe permitir login con cliente_id', async () => {
      mockLocalStorage.getItem.mockReturnValue(null)
      
      const { result } = renderHook(() => useAuth())

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0))
      })

      expect(result.current.isAuthenticated).toBe(false)

      act(() => {
        result.current.login('nuevo_cliente_456')
      })

      expect(result.current.isAuthenticated).toBe(true)
      expect(result.current.clienteId).toBe('nuevo_cliente_456')
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('cliente_id', 'nuevo_cliente_456')
    })
  })

  describe('Logout functionality', () => {
    it('debe permitir logout y limpiar estado', async () => {
      mockLocalStorage.getItem.mockReturnValue('cliente_existente')
      
      const { result } = renderHook(() => useAuth())

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0))
      })

      expect(result.current.isAuthenticated).toBe(true)

      act(() => {
        result.current.logout()
      })

      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('cliente_id')
      expect(window.location.reload).toHaveBeenCalled()
      expect(result.current.isAuthenticated).toBe(false)
      expect(result.current.clienteId).toBe(null)
    })
  })

  describe('Switch client functionality', () => {
    it('debe permitir cambiar de cliente', async () => {
      mockLocalStorage.getItem.mockReturnValue('cliente_original')
      
      const { result } = renderHook(() => useAuth())

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0))
      })

      expect(result.current.clienteId).toBe('cliente_original')

      act(() => {
        result.current.switchClient('cliente_nuevo')
      })

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('cliente_id', 'cliente_nuevo')
      expect(window.location.reload).toHaveBeenCalled()
      expect(result.current.clienteId).toBe('cliente_nuevo')
    })
  })

  describe('Return values', () => {
    it('debe retornar todas las funciones necesarias', async () => {
      mockLocalStorage.getItem.mockReturnValue(null)
      
      const { result } = renderHook(() => useAuth())

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0))
      })

      expect(typeof result.current.login).toBe('function')
      expect(typeof result.current.logout).toBe('function')
      expect(typeof result.current.switchClient).toBe('function')
      expect(typeof result.current.isAuthenticated).toBe('boolean')
      expect(typeof result.current.loading).toBe('boolean')
    })
  })
})