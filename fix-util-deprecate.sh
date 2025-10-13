#!/bin/bash

echo "🔧 SOLUCIONANDO ERROR util-deprecate"
echo "==================================="

cd /Users/arminpalma/Documents/MacBookPro_Armin/Sistema_AI_automation_stack/frontend

echo "1. Parando Vite..."
pkill -f "vite" 2>/dev/null || echo "Vite no estaba corriendo"

echo ""
echo "2. Instalando dependencia faltante..."
npm install util-deprecate

echo ""
echo "3. Limpiando caché npm..."
npm cache clean --force

echo ""
echo "4. Reinstalando dependencias para asegurar consistencia..."
rm -rf node_modules/.vite
rm -rf node_modules/postcss-selector-parser
npm install postcss-selector-parser

echo ""
echo "5. Verificando que TailwindCSS esté bien instalado..."
npm install tailwindcss postcss autoprefixer

echo ""
echo "✅ Dependencias reparadas"
echo ""
echo "🚀 REINICIAR VITE:"
echo "npm run dev"
echo ""
echo "📊 ESTO DEBERÍA SOLUCIONAR:"
echo "- ❌ Error util-deprecate"
echo "- ❌ Error PostCSS config"
echo "- ❌ Error TailwindCSS loading"
echo "- ✅ Vite funcionando normalmente"