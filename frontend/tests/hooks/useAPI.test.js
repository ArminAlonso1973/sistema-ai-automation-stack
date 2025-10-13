// tests/hooks/useAPI.test.js
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, waitFor, act } from '@testing-library/react'
import { useAPI } from '../../src/hooks/useAPI'

// Mock del API client
vi.mock('../../src/config/api', () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn()
  }
}))

describe('useAPI Hook', () => {
  let mockApi
  
  beforeEach(async () => {
    mockApi = await import('../../src/config/api')
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  describe('GET requests (autoFetch)', () => {
    it('debe cargar datos exitosamente', async () => {
      const mockData = { message: 'success', data: [1, 2, 3] }
      mockApi.api.get.mockResolvedValueOnce(mockData)

      const { result } = renderHook(() => useAPI('/api/test'))

      // Initially loading
      expect(result.current.loading).toBe(true)
      expect(result.current.data).toBe(null)
      expect(result.current.error).toBe(null)

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.data).toEqual(mockData)
      expect(result.current.error).toBe(null)
      expect(mockApi.api.get).toHaveBeenCalledWith('/api/test')
    })

    it('debe manejar errores en GET request', async () => {
      const errorMessage = 'Network error'
      mockApi.api.get.mockRejectedValueOnce(new Error(errorMessage))

      const { result } = renderHook(() => useAPI('/api/test'))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.error).toBe(errorMessage)
      expect(result.current.data).toBe(null)
    })

    it('no debe hacer fetch automático cuando autoFetch es false', async () => {
      const { result } = renderHook(() => useAPI('/api/test', false))

      expect(result.current.loading).toBe(false)
      expect(result.current.data).toBe(null)
      expect(mockApi.api.get).not.toHaveBeenCalled()
    })
  })

  describe('Manual operations', () => {
    it('debe permitir refetch manual', async () => {
      const mockData = { refetched: true }
      mockApi.api.get.mockResolvedValueOnce(mockData)

      const { result } = renderHook(() => useAPI('/api/test', false))

      await act(async () => {
        result.current.refetch()
      })

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.data).toEqual(mockData)
      expect(mockApi.api.get).toHaveBeenCalledWith('/api/test')
    })

    it('debe realizar POST request', async () => {
      const postData = { name: 'test' }
      const mockResponse = { id: 1, ...postData }
      mockApi.api.post.mockResolvedValueOnce(mockResponse)

      const { result } = renderHook(() => useAPI('/api/test', false))

      let response
      await act(async () => {
        response = await result.current.post(postData)
      })

      expect(response).toEqual(mockResponse)
      expect(result.current.data).toEqual(mockResponse)
      expect(mockApi.api.post).toHaveBeenCalledWith('/api/test', postData)
    })

    it('debe realizar PUT request', async () => {
      const putData = { id: 1, name: 'updated' }
      const mockResponse = { success: true, data: putData }
      mockApi.api.put.mockResolvedValueOnce(mockResponse)

      const { result } = renderHook(() => useAPI('/api/test/1', false))

      let response
      await act(async () => {
        response = await result.current.put(putData)
      })

      expect(response).toEqual(mockResponse)
      expect(result.current.data).toEqual(mockResponse)
      expect(mockApi.api.put).toHaveBeenCalledWith('/api/test/1', putData)
    })

    it('debe realizar DELETE request', async () => {
      const mockResponse = { deleted: true }
      mockApi.api.delete.mockResolvedValueOnce(mockResponse)

      const { result } = renderHook(() => useAPI('/api/test/1', false))

      let response
      await act(async () => {
        response = await result.current.delete()
      })

      expect(response).toEqual(mockResponse)
      expect(result.current.data).toEqual(mockResponse)
      expect(mockApi.api.delete).toHaveBeenCalledWith('/api/test/1')
    })

    it('debe manejar errores en POST request', async () => {
      const errorMessage = 'Validation error'
      mockApi.api.post.mockRejectedValueOnce(new Error(errorMessage))

      const { result } = renderHook(() => useAPI('/api/test', false))

      await act(async () => {
        try {
          await result.current.post({ invalid: 'data' })
        } catch (error) {
          expect(error.message).toBe(errorMessage)
        }
      })

      expect(result.current.error).toBe(errorMessage)
    })
  })

  describe('Loading states', () => {
    it('debe manejar estados de loading correctamente', async () => {
      let resolvePromise
      const slowPromise = new Promise((resolve) => {
        resolvePromise = resolve
      })
      mockApi.api.get.mockReturnValueOnce(slowPromise)

      const { result } = renderHook(() => useAPI('/api/slow'))

      expect(result.current.loading).toBe(true)

      act(() => {
        resolvePromise({ slow: 'data' })
      })

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.data).toEqual({ slow: 'data' })
    })
  })
})