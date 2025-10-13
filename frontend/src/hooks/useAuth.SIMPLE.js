import { useState, useEffect, createContext, useContext } from 'react'

// Context para Auth
const AuthContext = createContext()

// Provider de Auth
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [clienteId, setClienteId] = useState('')

  // Verificar si hay sesión guardada
  useEffect(() => {
    const savedClientId = localStorage.getItem('clienteId')
    if (savedClientId) {
      setClienteId(savedClientId)
      setIsAuthenticated(true)
    }
  }, [])

  const login = (clientId) => {
    setClienteId(clientId)
    setIsAuthenticated(true)
    localStorage.setItem('clienteId', clientId)
  }

  const logout = () => {
    setClienteId('')
    setIsAuthenticated(false)
    localStorage.removeItem('clienteId')
  }

  const switchClient = (newClientId) => {
    setClienteId(newClientId)
    localStorage.setItem('clienteId', newClientId)
  }

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      clienteId,
      login,
      logout,
      switchClient
    }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook para usar Auth
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}