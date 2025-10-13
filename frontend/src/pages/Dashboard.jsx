// src/pages/Dashboard.jsx - Página principal del dashboard
import { StatsCard } from '../components/StatsCard'
import { ConversationList } from '../components/ConversationList'
import { LeadTable } from '../components/LeadTable'

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Vista general de tu sistema de automatización AI
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Leads Totales"
          value={125}
          trend={{ value: 12, isPositive: true }}
          icon="users"
        />
        <StatsCard 
          title="Conversaciones"
          value={89}
          trend={{ value: 8, isPositive: true }}
          icon="chat"
        />
        <StatsCard 
          title="Conversión"
          value="24.5%"
          trend={{ value: 3.2, isPositive: true }}
          icon="trending-up"
        />
        <StatsCard 
          title="Respuesta AI"
          value="2.1s"
          trend={{ value: 0.3, isPositive: false }}
          icon="clock"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversations Column */}
        <div className="space-y-6">
          <ConversationList 
            title="Conversaciones Recientes" 
            showFilters={false}
            maxItems={5}
          />
        </div>

        {/* Leads Column */}
        <div className="space-y-6">
          <LeadTable 
            title="Leads Recientes"
            showFilters={false}
            showActions={false}
            maxItems={5}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Acciones Rápidas</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Enviar Broadcast
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
            Exportar Leads
          </button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
            Ver Reportes
          </button>
        </div>
      </div>

      {/* Auto-refresh indicator */}
      <div className="flex items-center justify-center text-sm text-gray-500">
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Actualizando datos cada 30 segundos
      </div>
    </div>
  )
}