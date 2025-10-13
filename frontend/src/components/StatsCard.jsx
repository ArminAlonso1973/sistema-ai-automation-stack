// src/components/StatsCard.jsx - Componente reutilizable para mostrar estadísticas
import { useState, useEffect } from 'react'

export function StatsCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend, 
  trendValue, 
  loading = false,
  error = null,
  className = '',
  onClick 
}) {
  const [isAnimated, setIsAnimated] = useState(false)

  useEffect(() => {
    // Animation delay para entrada
    const timer = setTimeout(() => setIsAnimated(true), 100)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className={`bg-white overflow-hidden shadow rounded-lg ${className}`}>
        <div className="p-5 animate-pulse">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`bg-white overflow-hidden shadow rounded-lg ${className}`}>
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
                <dd className="text-sm text-red-600">Error: {error}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div 
      className={`bg-white overflow-hidden shadow rounded-lg transition-all duration-300 hover:shadow-md ${
        onClick ? 'cursor-pointer hover:scale-105' : ''
      } ${isAnimated ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'} ${className}`}
      onClick={onClick}
    >
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {Icon && (
              <div className="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center">
                <Icon className="h-5 w-5 text-indigo-600" />
              </div>
            )}
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">
                  {formatValue(value)}
                </div>
                {trend && trendValue && (
                  <div className={`ml-2 flex items-baseline text-sm ${
                    trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-500'
                  }`}>
                    {trend === 'up' && (
                      <svg className="self-center flex-shrink-0 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                    {trend === 'down' && (
                      <svg className="self-center flex-shrink-0 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                    <span className="sr-only">{trend === 'up' ? 'Increased' : 'Decreased'} by</span>
                    {trendValue}
                  </div>
                )}
              </dd>
              {subtitle && (
                <dd className="text-sm text-gray-500 mt-1">{subtitle}</dd>
              )}
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente específico para estadísticas simples
export function SimpleStatsCard({ title, value, loading = false, className = '' }) {
  return (
    <StatsCard
      title={title}
      value={value}
      loading={loading}
      className={className}
    />
  )
}

// Componente específico para métricas con iconos
export function MetricCard({ title, value, icon: Icon, color = 'indigo', loading = false }) {
  const colorClasses = {
    indigo: 'bg-indigo-100 text-indigo-600',
    green: 'bg-green-100 text-green-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    red: 'bg-red-100 text-red-600',
    blue: 'bg-blue-100 text-blue-600'
  }

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${colorClasses[color]}`}>
              <Icon className="h-6 w-6" />
            </div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd className="text-lg font-medium text-gray-900">
                {loading ? (
                  <div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
                ) : (
                  formatValue(value)
                )}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}

// Utility function para formatear valores
function formatValue(value) {
  if (value === null || value === undefined) return '-'
  
  if (typeof value === 'number') {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`
    }
    return value.toLocaleString()
  }
  
  return value
}

// Default export
export default StatsCard