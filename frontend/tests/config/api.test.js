// tests/config/api.test.js
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { api } from '../../src/config/api'

// Mock fetch global
global.fetch = vi.fn()

describe('API Client', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('GET requests', () => {
    it('debe realizar GET request exitoso', async () => {
      const mockData = { message: 'success' }
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
        headers: new Headers({ 'content-type': 'application/json' })
      })

      const result = await api.get('/test')
      
      expect(fetch).toHaveBeenCalledWith('http://localhost:3000/test', expect.any(Object))
      expect(result).toEqual(mockData)
    })

    it('debe manejar errores en GET request', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        json: async () => ({ message: 'Recurso no encontrado' }),
        headers: new Headers({ 'content-type': 'application/json' })
      })

      await expect(api.get('/test')).rejects.toThrow('Recurso no encontrado')
    })
  })

  describe('POST requests', () => {
    it('debe realizar POST request exitoso', async () => {
      const mockData = { id: 1, message: 'created' }
      const postData = { name: 'test' }
      
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
        headers: new Headers({ 'content-type': 'application/json' })
      })

      const result = await api.post('/test', postData)
      
      expect(fetch).toHaveBeenCalledWith('http://localhost:3000/test', expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(postData)
      }))
      expect(result).toEqual(mockData)
    })

    it('debe manejar errores en POST request', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: async () => ({ message: 'Error del servidor' }),
        headers: new Headers({ 'content-type': 'application/json' })
      })

      await expect(api.post('/test', {})).rejects.toThrow('Error del servidor')
    })
  })

  describe('PUT requests', () => {
    it('debe realizar PUT request exitoso', async () => {
      const mockData = { id: 1, message: 'updated' }
      const putData = { name: 'updated' }
      
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
        headers: new Headers({ 'content-type': 'application/json' })
      })

      const result = await api.put('/test/1', putData)
      
      expect(fetch).toHaveBeenCalledWith('http://localhost:3000/test/1', expect.objectContaining({
        method: 'PUT',
        body: JSON.stringify(putData)
      }))
      expect(result).toEqual(mockData)
    })
  })

  describe('DELETE requests', () => {
    it('debe realizar DELETE request exitoso', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
        headers: new Headers({ 'content-type': 'application/json' })
      })

      const result = await api.delete('/test/1')
      
      expect(fetch).toHaveBeenCalledWith('http://localhost:3000/test/1', expect.objectContaining({
        method: 'DELETE'
      }))
      expect(result).toEqual({}) // Nueva API devuelve {} para responses sin contenido
    })
  })
})