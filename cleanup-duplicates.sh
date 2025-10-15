#!/bin/bash

echo "🔧 LIMPIEZA COMPLETA - ELIMINANDO DUPLICADOS"
echo "==========================================="

cd /Users/arminpalma/Documents/MacBookPro_Armin/Sistema_AI_automation_stack/frontend

echo "1. Eliminando archivos App duplicados..."
rm -f src/App.BASIC.jsx
rm -f src/App.COMPLETE.jsx

echo "2. Verificando main.jsx actual:"
echo "------------------------------"
cat src/main.jsx

echo ""
echo "3. Verificando imports en main.jsx..."
if grep -q "App.BASIC\|App.COMPLETE" src/main.jsx; then
    echo "❌ PROBLEMA: main.jsx importa archivo incorrecto"
    echo "Corrigiendo..."
    
    cat > src/main.jsx << 'EOF'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
EOF
    echo "✅ main.jsx corregido"
else
    echo "✅ main.jsx parece correcto"
fi

echo ""
echo "4. Verificando que App.jsx es el único:"
ls -la src/App*

echo ""
echo "5. Matando procesos Vite..."
pkill -f "vite" 2>/dev/null || echo "No hay procesos Vite"

echo ""
echo "6. Limpiando caché completo..."
rm -rf node_modules/.vite
rm -rf dist
rm -rf .vite

echo ""
echo "✅ LIMPIEZA COMPLETA TERMINADA"
echo ""
echo "🚀 EJECUTA AHORA:"
echo "npm run dev"
echo ""
echo "📱 Y EN NAVEGADOR:"
echo "1. Cierra TODAS las pestañas localhost:3001"
echo "2. Abre nueva ventana incógnito"
echo "3. Ve a http://localhost:3001"