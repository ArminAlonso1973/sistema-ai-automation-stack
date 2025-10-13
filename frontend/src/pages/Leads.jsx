// src/pages/Leads.jsx - Página completa de gestión de leads
import { useState } from 'react'
import { StatsCard } from '../components/StatsCard'
import { LeadTable } from '../components/LeadTable'

export function Leads() {
  const [view, setView] = useState('table') // table, analytics

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="border-b border-gray-200 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestión de Leads</h1>
            <p className="mt-1 text-sm text-gray-500">
              Administra y analiza todos tus leads generados por IA
            </p>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={() => setView(view === 'table' ? 'analytics' : 'table')}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
            >
              {view === 'table' ? 'Ver Analytics' : 'Ver Tabla'}
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Exportar CSV
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
              Nuevo Lead
            </button>
          </div>
        </div>
      </div>

      {/* Lead Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatsCard 
          title="Total Leads"
          value={1247}
          trend={{ value: 23, isPositive: true }}
          icon="users"
        />
        <StatsCard 
          title="Leads Calientes"
          value={89}
          trend={{ value: 15, isPositive: true }}
          icon="fire"
        />
        <StatsCard 
          title="En Proceso"
          value={156}
          trend={{ value: 8, isPositive: true }}
          icon="clock"
        />
        <StatsCard 
          title="Convertidos"
          value={45}
          trend={{ value: 12, isPositive: true }}
          icon="check-circle"
        />
        <StatsCard 
          title="Tasa Conversión"
          value="18.3%"
          trend={{ value: 2.1, isPositive: true }}
          icon="trending-up"
        />
      </div>

      {/* Filters Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Filtros Avanzados</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Período
            </label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" defaultValue="week">
              <option value="today">Hoy</option>
              <option value="week">Última semana</option>
              <option value="month">Último mes</option>
              <option value="quarter">Último trimestre</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Origen
            </label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" defaultValue="all">
              <option value="all">Todos los orígenes</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="web">Sitio web</option>
              <option value="social">Redes sociales</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Clasificación
            </label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" defaultValue="all">
              <option value="all">Todas</option>
              <option value="hot">Caliente</option>
              <option value="warm">Tibio</option>
              <option value="cold">Frío</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estado
            </label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" defaultValue="all">
              <option value="all">Todos</option>
              <option value="new">Nuevo</option>
              <option value="contacted">Contactado</option>
              <option value="qualified">Calificado</option>
              <option value="converted">Convertido</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {view === 'table' ? (
        <LeadTable 
          showFilters={true}
          showActions={true}
          title="Todos los Leads"
        />
      ) : (
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Analytics de Leads</h3>
          <div className="space-y-6">
            {/* Analytics Placeholder */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">Gráfico de Conversión</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Próximamente: Análisis detallado de conversión por período
                </p>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">Tendencias de Leads</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Próximamente: Gráficos de tendencias y patrones
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Actions */}
      <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Gestiona múltiples leads a la vez
          </div>
          <div className="space-x-2">
            <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
              Asignar Etiquetas
            </button>
            <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors">
              Marcar como Contactado
            </button>
            <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors">
              Archivar Seleccionados
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}