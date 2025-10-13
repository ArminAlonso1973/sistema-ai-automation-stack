import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

// Componente temporal para build
function TempApp() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-blue-600">
        🚀 Frontend Setup Completado - Grupo 1
      </h1>
      <p className="mt-4 text-gray-600">
        API Client configurado y listo para usar
      </p>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TempApp />
  </React.StrictMode>,
)