#!/bin/bash

echo "🔧 FUERZA BRUTA - REESCRIBIR App.jsx COMPLETAMENTE"
echo "================================================="

cd /Users/arminpalma/Documents/MacBookPro_Armin/Sistema_AI_automation_stack/frontend

echo "1. Eliminando TODOS los App.jsx..."
find . -name "App*.jsx" -delete

echo "2. Creando App.jsx NUEVO desde cero..."
cat > src/App.jsx << 'EOF'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Dashboard } from './pages/Dashboard'
import { Leads } from './pages/Leads'
import { Proposals } from './pages/Proposals'
import './App.css'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/proposals" element={<Proposals />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
EOF

echo "3. Verificando que se creó correctamente:"
echo "--------------------------------------"
head -20 src/App.jsx

echo ""
echo "4. Matando TODOS los procesos Vite:"
pkill -f "vite" 2>/dev/null
sleep 2

echo ""
echo "5. Limpiando TODO:"
rm -rf node_modules/.vite
rm -rf dist
rm -rf .vite

echo ""
echo "✅ App.jsx reescrito completamente"
echo ""
echo "🚀 AHORA EJECUTA:"
echo "npm run dev"
echo ""
echo "📱 Y EN NAVEGADOR:"
echo "1. Cierra TODAS las pestañas de localhost:3001"
echo "2. Abre nueva pestaña"
echo "3. Ve a http://localhost:3001"
echo "4. Si sigue igual, presiona Shift+Cmd+R (Mac)"