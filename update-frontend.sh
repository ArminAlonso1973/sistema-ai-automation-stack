#!/bin/bash

echo "🔧 ACTUALIZANDO FRONTEND - SISTEMA COMPLETO"
echo "==========================================="

cd /Users/arminpalma/Documents/MacBookPro_Armin/Sistema_AI_automation_stack/frontend

# Backup del App.jsx básico
cp src/App.jsx src/App.BASIC.jsx

# Aplicar versión completa con React Router
cp src/App.COMPLETE.jsx src/App.jsx

echo "✅ App.jsx actualizado al sistema completo"
echo ""
echo "📊 CAMBIOS APLICADOS:"
echo "- ✅ React Router configurado (BrowserRouter)"
echo "- ✅ Layout envolviendo todas las rutas"
echo "- ✅ 3 rutas principales: /, /leads, /proposals"
echo "- ✅ Navegación SPA completa"
echo ""
echo "🌐 DESPUÉS DE ESTE CAMBIO VERÁS:"
echo "- 📊 Dashboard completo con métricas"
echo "- 🧭 Navegación superior funcionando"
echo "- 📱 Diseño responsive con Tailwind"
echo "- 🔄 Navegación fluida entre páginas"
echo ""
echo "🚀 El frontend se recargará automáticamente (Vite hot reload)"
echo "📍 Accede a: http://localhost:3001"