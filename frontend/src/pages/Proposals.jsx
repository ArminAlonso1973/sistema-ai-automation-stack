// src/pages/Proposals.jsx - Página de propuestas (funcionalidad futura)
import { StatsCard } from '../components/StatsCard'

export function Proposals() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">Propuestas</h1>
        <p className="mt-1 text-sm text-gray-500">
          Gestiona propuestas automáticas generadas por IA
        </p>
      </div>

      {/* Stats Preview */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Propuestas Enviadas"
          value={45}
          trend={{ value: 8, isPositive: true }}
          icon="document"
        />
        <StatsCard 
          title="Aceptadas"
          value={12}
          trend={{ value: 3, isPositive: true }}
          icon="check-circle"
        />
        <StatsCard 
          title="Tasa de Aceptación"
          value="26.7%"
          trend={{ value: 4.2, isPositive: true }}
          icon="trending-up"
        />
        <StatsCard 
          title="Valor Total"
          value="$48.5K"
          trend={{ value: 15.3, isPositive: true }}
          icon="currency-dollar"
        />
      </div>

      {/* Coming Soon Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-100 rounded-lg p-12">
        <div className="text-center">
          <svg className="mx-auto h-16 w-16 text-blue-600 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Generación Automática de Propuestas
          </h2>
          
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Próximamente podrás generar propuestas personalizadas automáticamente 
            usando IA, basadas en las conversaciones y necesidades de cada lead.
          </p>

          {/* Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <svg className="mx-auto h-8 w-8 text-blue-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h3 className="font-semibold text-gray-900">Generación Automática</h3>
                <p className="text-sm text-gray-600 mt-2">
                  IA crea propuestas basadas en las conversaciones del lead
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <svg className="mx-auto h-8 w-8 text-green-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="font-semibold text-gray-900">Personalización</h3>
                <p className="text-sm text-gray-600 mt-2">
                  Cada propuesta adaptada a las necesidades específicas
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <svg className="mx-auto h-8 w-8 text-purple-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                <h3 className="font-semibold text-gray-900">Tracking de ROI</h3>
                <p className="text-sm text-gray-600 mt-2">
                  Seguimiento completo de propuestas y conversiones
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12">
            <button 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled
            >
              Disponible Pronto
            </button>
            <p className="text-sm text-gray-500 mt-2">
              Mientras tanto, puedes gestionar tus leads en la sección correspondiente
            </p>
          </div>
        </div>
      </div>

      {/* Future Features Roadmap */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Hoja de Ruta - Propuestas</h3>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-sm font-medium">1</span>
              </div>
            </div>
            <div className="ml-4">
              <h4 className="text-base font-medium text-gray-900">Plantillas de Propuestas</h4>
              <p className="text-sm text-gray-600">Crear y gestionar plantillas personalizables para diferentes tipos de servicios</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-yellow-600 text-sm font-medium">2</span>
              </div>
            </div>
            <div className="ml-4">
              <h4 className="text-base font-medium text-gray-900">Generación con IA</h4>
              <p className="text-sm text-gray-600">Integración con GPT para generar propuestas basadas en conversaciones</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-gray-600 text-sm font-medium">3</span>
              </div>
            </div>
            <div className="ml-4">
              <h4 className="text-base font-medium text-gray-900">Firma Digital y Pagos</h4>
              <p className="text-sm text-gray-600">Integración con plataformas de firma digital y procesamiento de pagos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}