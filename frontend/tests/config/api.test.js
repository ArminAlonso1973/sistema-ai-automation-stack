// tests/config/api.test.js
import { describe, it, expect, beforeEach } from 'vitest'
import { api } from '../../src/config/api'

describe('API Client', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  describe('GET requests', () => {
    it('debe realizar GET request exitoso', async () => {
      const mockData = { message: 'success' }
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData
      })

      const result = await api.get('/test')
      
      expect(fetch).toHaveBeenCalledWith('http://localhost:8080/test')
      expect(result).toEqual(mockData)
    })

    it('debe manejar errores en GET request', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found'
      })

      await expect(api.get('/test')).rejects.toThrow('Error 404: Not Found')
    })
  })

  describe('POST requests', () => {
    it('debe realizar POST request exitoso', async () => {
      const mockData = { id: 1 }
      const postData = { name: 'test' }
      
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData
      })

      const result = await api.post('/test', postData)
      
      expect(fetch).toHaveBeenCalledWith('http://localhost:8080/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      })
      expect(result).toEqual(mockData)
    })

    it('debe manejar errores en POST request', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error'
      })

      await expect(api.post('/test', {})).rejects.toThrow('Error 500: Internal Server Error')
    })
  })

  describe('PUT requests', () => {
    it('debe realizar PUT request exitoso', async () => {
      const mockData = { updated: true }
      const putData = { name: 'updated' }
      
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData
      })

      const result = await api.put('/test/1', putData)
      
      expect(fetch).toHaveBeenCalledWith('http://localhost:8080/test/1', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(putData)
      })
      expect(result).toEqual(mockData)
    })
  })

  describe('DELETE requests', () => {
    it('debe realizar DELETE request exitoso', async () => {
      const mockData = { deleted: true }
      
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData
      })

      const result = await api.delete('/test/1')
      
      expect(fetch).toHaveBeenCalledWith('http://localhost:8080/test/1', {
        method: 'DELETE'
      })
      expect(result).toEqual(mockData)
    })
  })
})