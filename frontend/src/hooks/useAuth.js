// src/hooks/useAuth.js - Hook de autenticación simple
import { useState, useEffect } from 'react'

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [clienteId, setClienteId] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Auth ultra-simple: leer localStorage
    const storedClienteId = localStorage.getItem('cliente_id')
    
    if (storedClienteId) {
      setIsAuthenticated(true)
      setClienteId(storedClienteId)
    }
    
    setLoading(false)
  }, [])

  const login = (clienteIdToSet) => {
    localStorage.setItem('cliente_id', clienteIdToSet)
    setIsAuthenticated(true)
    setClienteId(clienteIdToSet)
  }

  const logout = () => {
    localStorage.removeItem('cliente_id')
    setIsAuthenticated(false)
    setClienteId(null)
    window.location.reload()
  }

  const switchClient = (newClienteId) => {
    localStorage.setItem('cliente_id', newClienteId)
    setClienteId(newClienteId)
    window.location.reload()
  }

  return { 
    isAuthenticated, 
    clienteId, 
    loading,
    login, 
    logout,
    switchClient
  }
}