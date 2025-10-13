import { Link, useLocation } from 'react-router-dom'

export function Layout({ children }) {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path ? 'bg-blue-700' : 'hover:bg-blue-600'
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-800 shadow">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-white text-xl font-bold">
                🤖 Sistema AI Automation Stack
              </h1>
            </div>
            <div className="flex space-x-4 items-center">
              <Link
                to="/"
                className={`text-white px-3 py-2 rounded-md text-sm font-medium ${isActive('/')}`}
              >
                📊 Dashboard
              </Link>
              <Link
                to="/leads"
                className={`text-white px-3 py-2 rounded-md text-sm font-medium ${isActive('/leads')}`}
              >
                👥 Leads
              </Link>
              <Link
                to="/proposals"
                className={`text-white px-3 py-2 rounded-md text-sm font-medium ${isActive('/proposals')}`}
              >
                📄 Propuestas
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 px-4">
        {children}
      </main>
    </div>
  )
}