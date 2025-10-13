// src/components/ConversationList.jsx - Componente para mostrar lista de conversaciones
import { useState } from 'react'
import { useAPI } from '../hooks/useAPI'

export function ConversationList({ limit = 10, showPagination = true }) {
  const [page, setPage] = useState(1)
  const { data, loading, error, refetch } = useAPI(`/api/conversations/recent?limit=${limit}&page=${page}`)

  if (loading && !data) {
    return <ConversationListSkeleton limit={limit} />
  }

  if (error) {
    return (
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-8 text-center">
          <div className="text-red-600 mb-2">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error al cargar conversaciones</h3>
          <p className="text-gray-500 mb-4">{error}</p>
          <button
            onClick={refetch}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  const conversations = data?.conversations || []
  const totalPages = data?.pagination?.totalPages || 1

  if (conversations.length === 0) {
    return (
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-8 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.013 8.013 0 01-7-4c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No hay conversaciones</h3>
          <p className="mt-1 text-sm text-gray-500">
            Cuando lleguen mensajes de WhatsApp, aparecerán aquí.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 sm:px-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Conversaciones Recientes
          </h3>
          <button
            onClick={refetch}
            disabled={loading}
            className="text-indigo-600 hover:text-indigo-900 text-sm font-medium disabled:opacity-50"
          >
            {loading ? 'Actualizando...' : 'Actualizar'}
          </button>
        </div>
      </div>

      {/* Conversation List */}
      <ul className="divide-y divide-gray-200">
        {conversations.map((conversation) => (
          <ConversationItem 
            key={conversation.id} 
            conversation={conversation} 
          />
        ))}
      </ul>

      {/* Pagination */}
      {showPagination && totalPages > 1 && (
        <div className="px-4 py-3 border-t border-gray-200 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page <= 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Anterior
              </button>
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page >= totalPages}
                className="relative ml-3 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Siguiente
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Página <span className="font-medium">{page}</span> de{' '}
                  <span className="font-medium">{totalPages}</span>
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page <= 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <span className="sr-only">Previous</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                    {page} / {totalPages}
                  </span>
                  <button
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    disabled={page >= totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <span className="sr-only">Next</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Componente para cada conversación individual
function ConversationItem({ conversation }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <li>
      <div className="px-4 py-4 flex items-center justify-between hover:bg-gray-50">
        <div className="flex items-center min-w-0 flex-1">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.013 8.013 0 01-7-4c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
              </svg>
            </div>
          </div>
          <div className="ml-4 flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900 truncate">
                {conversation.phone_number || 'Número desconocido'}
              </p>
              <div className="ml-2 flex-shrink-0 flex">
                <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {formatDate(conversation.created_at)}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-500 truncate">
              {conversation.last_message || 'Sin mensaje reciente'}
            </p>
            {conversation.status && (
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  conversation.status === 'active' ? 'bg-green-100 text-green-800' :
                  conversation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {conversation.status}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="ml-5 flex-shrink-0">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-gray-500"
          >
            <svg 
              className={`h-5 w-5 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Expanded content */}
      {isExpanded && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            <p><strong>ID:</strong> {conversation.id}</p>
            {conversation.messages_count && (
              <p><strong>Mensajes:</strong> {conversation.messages_count}</p>
            )}
            {conversation.ai_classification && (
              <p><strong>Clasificación IA:</strong> {conversation.ai_classification}</p>
            )}
          </div>
        </div>
      )}
    </li>
  )
}

// Loading skeleton
function ConversationListSkeleton({ limit }) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <div className="px-4 py-3 border-b border-gray-200 sm:px-6">
        <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
      </div>
      <ul className="divide-y divide-gray-200">
        {Array.from({ length: limit }, (_, i) => (
          <li key={i} className="px-4 py-4">
            <div className="flex items-center space-x-4 animate-pulse">
              <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Utility function para formatear fechas
function formatDate(dateString) {
  if (!dateString) return 'Fecha desconocida'
  
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return 'Ahora'
  if (diffMins < 60) return `${diffMins}m`
  if (diffHours < 24) return `${diffHours}h`
  if (diffDays < 7) return `${diffDays}d`
  
  return date.toLocaleDateString('es-ES', { 
    day: 'numeric', 
    month: 'short' 
  })
}

export default ConversationList