// src/config/api.js - Conexión con Backend
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

// Cliente API simple y efectivo
export const api = {
  
  // GET request
  async get(endpoint) {
    const response = await fetch(`${API_URL}${endpoint}`)
    if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`)
    return response.json()
  },

  // POST request
  async post(endpoint, data) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`)
    return response.json()
  },

  // PUT request
  async put(endpoint, data) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`)
    return response.json()
  },

  // DELETE request
  async delete(endpoint) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE'
    })
    if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`)
    return response.json()
  }
}

export { API_URL }