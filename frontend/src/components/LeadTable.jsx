// src/components/LeadTable.jsx - Componente para mostrar tabla de leads
import { useState, useMemo } from 'react'
import { useAPI } from '../hooks/useAPI'

export function LeadTable({ 
  pageSize = 10,
  showFilters = true,
  showActions = true 
}) {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState('created_at')
  const [sortOrder, setSortOrder] = useState('desc')
  const [filters, setFilters] = useState({
    status: '',
    classification: '',
    search: ''
  })

  // Build query string
  const queryParams = useMemo(() => {
    const params = new URLSearchParams({
      page: currentPage.toString(),
      limit: pageSize.toString(),
      sort_by: sortBy,
      sort_order: sortOrder
    })
    
    if (filters.status) params.append('status', filters.status)
    if (filters.classification) params.append('classification', filters.classification)
    if (filters.search) params.append('search', filters.search)
    
    return params.toString()
  }, [currentPage, pageSize, sortBy, sortOrder, filters])

  const { data, loading, error, refetch } = useAPI(`/api/leads?${queryParams}`)

  const leads = data?.leads || []
  const pagination = data?.pagination || {}

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortOrder('asc')
    }
  }

  const handleFilterChange = (filterKey, value) => {
    setFilters(prev => ({ ...prev, [filterKey]: value }))
    setCurrentPage(1) // Reset to first page when filtering
  }

  if (error) {
    return (
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-8 text-center">
          <div className="text-red-600 mb-2">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error al cargar leads</h3>
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

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      {/* Header with filters */}
      <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Leads ({pagination.total || 0})
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Lista de leads generados por el sistema de IA
            </p>
          </div>
          <button
            onClick={refetch}
            disabled={loading}
            className="text-indigo-600 hover:text-indigo-900 text-sm font-medium disabled:opacity-50"
          >
            {loading ? 'Actualizando...' : 'Actualizar'}
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Buscar</label>
              <input
                type="text"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                placeholder="Nombre, teléfono, email..."
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Estado</label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Todos los estados</option>
                <option value="new">Nuevo</option>
                <option value="contacted">Contactado</option>
                <option value="qualified">Calificado</option>
                <option value="converted">Convertido</option>
                <option value="rejected">Rechazado</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Clasificación</label>
              <select
                value={filters.classification}
                onChange={(e) => handleFilterChange('classification', e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Todas las clasificaciones</option>
                <option value="hot">Caliente</option>
                <option value="warm">Tibio</option>
                <option value="cold">Frío</option>
                <option value="interested">Interesado</option>
                <option value="not_interested">No interesado</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {loading && leads.length === 0 ? (
          <LeadTableSkeleton />
        ) : leads.length === 0 ? (
          <div className="px-4 py-8 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No hay leads</h3>
            <p className="mt-1 text-sm text-gray-500">
              {filters.search || filters.status || filters.classification 
                ? 'No se encontraron leads con los filtros aplicados.'
                : 'Cuando se generen leads, aparecerán aquí.'
              }
            </p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <SortableHeader
                  label="Nombre"
                  sortKey="name"
                  currentSort={sortBy}
                  currentOrder={sortOrder}
                  onSort={handleSort}
                />
                <SortableHeader
                  label="Teléfono"
                  sortKey="phone"
                  currentSort={sortBy}
                  currentOrder={sortOrder}
                  onSort={handleSort}
                />
                <SortableHeader
                  label="Clasificación"
                  sortKey="classification"
                  currentSort={sortBy}
                  currentOrder={sortOrder}
                  onSort={handleSort}
                />
                <SortableHeader
                  label="Estado"
                  sortKey="status"
                  currentSort={sortBy}
                  currentOrder={sortOrder}
                  onSort={handleSort}
                />
                <SortableHeader
                  label="Fecha"
                  sortKey="created_at"
                  currentSort={sortBy}
                  currentOrder={sortOrder}
                  onSort={handleSort}
                />
                {showActions && (
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leads.map((lead) => (
                <LeadRow 
                  key={lead.id} 
                  lead={lead} 
                  showActions={showActions}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <TablePagination
          currentPage={currentPage}
          totalPages={pagination.totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  )
}

// Sortable header component
function SortableHeader({ label, sortKey, currentSort, currentOrder, onSort }) {
  const isActive = currentSort === sortKey
  
  return (
    <th 
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
      onClick={() => onSort(sortKey)}
    >
      <div className="flex items-center space-x-1">
        <span>{label}</span>
        <div className="flex flex-col">
          <svg 
            className={`h-3 w-3 ${isActive && currentOrder === 'asc' ? 'text-indigo-600' : 'text-gray-300'}`}
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          <svg 
            className={`h-3 w-3 ${isActive && currentOrder === 'desc' ? 'text-indigo-600' : 'text-gray-300'}`}
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </th>
  )
}

// Individual lead row
function LeadRow({ lead, showActions }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <>
      <tr className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {lead.name || 'Sin nombre'}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {lead.phone || 'Sin teléfono'}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <ClassificationBadge classification={lead.classification} />
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <StatusBadge status={lead.status} />
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {formatDate(lead.created_at)}
        </td>
        {showActions && (
          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-indigo-600 hover:text-indigo-900 mr-2"
            >
              {isExpanded ? 'Ocultar' : 'Ver más'}
            </button>
          </td>
        )}
      </tr>
      {isExpanded && (
        <tr>
          <td colSpan="6" className="px-6 py-4 bg-gray-50">
            <div className="text-sm text-gray-600 space-y-2">
              <p><strong>ID:</strong> {lead.id}</p>
              {lead.email && <p><strong>Email:</strong> {lead.email}</p>}
              {lead.notes && <p><strong>Notas:</strong> {lead.notes}</p>}
              {lead.ai_analysis && (
                <div>
                  <strong>Análisis IA:</strong>
                  <pre className="mt-1 text-xs bg-white p-2 rounded border overflow-auto">
                    {JSON.stringify(lead.ai_analysis, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  )
}

// Badge components
function ClassificationBadge({ classification }) {
  const colors = {
    hot: 'bg-red-100 text-red-800',
    warm: 'bg-yellow-100 text-yellow-800',
    cold: 'bg-blue-100 text-blue-800',
    interested: 'bg-green-100 text-green-800',
    not_interested: 'bg-gray-100 text-gray-800'
  }

  const labels = {
    hot: 'Caliente',
    warm: 'Tibio',
    cold: 'Frío',
    interested: 'Interesado',
    not_interested: 'No interesado'
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
      colors[classification] || 'bg-gray-100 text-gray-800'
    }`}>
      {labels[classification] || classification || 'Sin clasificar'}
    </span>
  )
}

function StatusBadge({ status }) {
  const colors = {
    new: 'bg-blue-100 text-blue-800',
    contacted: 'bg-yellow-100 text-yellow-800',
    qualified: 'bg-green-100 text-green-800',
    converted: 'bg-indigo-100 text-indigo-800',
    rejected: 'bg-red-100 text-red-800'
  }

  const labels = {
    new: 'Nuevo',
    contacted: 'Contactado',
    qualified: 'Calificado',
    converted: 'Convertido',
    rejected: 'Rechazado'
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
      colors[status] || 'bg-gray-100 text-gray-800'
    }`}>
      {labels[status] || status || 'Sin estado'}
    </span>
  )
}

// Pagination component
function TablePagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage <= 1}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
        >
          Anterior
        </button>
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage >= totalPages}
          className="relative ml-3 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Página <span className="font-medium">{currentPage}</span> de{' '}
            <span className="font-medium">{totalPages}</span>
          </p>
        </div>
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
            <button
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage <= 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              Anterior
            </button>
            <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage >= totalPages}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              Siguiente
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}

// Loading skeleton
function LeadTableSkeleton() {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {Array.from({ length: 6 }, (_, i) => (
            <th key={i} className="px-6 py-3 text-left">
              <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {Array.from({ length: 5 }, (_, i) => (
          <tr key={i}>
            {Array.from({ length: 6 }, (_, j) => (
              <td key={j} className="px-6 py-4 whitespace-nowrap">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

// Utility function para formatear fechas
function formatDate(dateString) {
  if (!dateString) return 'Sin fecha'
  
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export default LeadTable