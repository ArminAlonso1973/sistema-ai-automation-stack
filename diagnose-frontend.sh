#!/bin/bash

echo "🔍 DIAGNÓSTICO FRONTEND - VITE HOT RELOAD"
echo "========================================"

cd /Users/arminpalma/Documents/MacBookPro_Armin/Sistema_AI_automation_stack/frontend

echo ""
echo "📊 VERIFICANDO ESTADO ACTUAL:"

echo "1. Verificando App.jsx actual:"
echo "--------------------------------"
head -10 src/App.jsx

echo ""
echo "2. Verificando si Vite está corriendo:"
echo "------------------------------------"
if lsof -i :3001 >/dev/null 2>&1; then
    echo "✅ Puerto 3001 ACTIVO (Vite corriendo)"
else
    echo "❌ Puerto 3001 NO ACTIVO"
fi

echo ""
echo "3. Verificando procesos Node.js:"
echo "-------------------------------"
ps aux | grep -E "(vite|node.*dev)" | grep -v grep || echo "No se encontraron procesos Vite"

echo ""
echo "4. Verificando archivos críticos:"
echo "--------------------------------"
echo "- App.jsx existe: $([ -f src/App.jsx ] && echo 'SÍ' || echo 'NO')"
echo "- Layout.jsx existe: $([ -f src/components/Layout.jsx ] && echo 'SÍ' || echo 'NO')"
echo "- Dashboard.jsx existe: $([ -f src/pages/Dashboard.jsx ] && echo 'SÍ' || echo 'NO')"

echo ""
echo "🔧 SOLUCIONES SUGERIDAS:"
echo "1. Reiniciar Vite completamente:"
echo "   - Ctrl+C en terminal de Vite"
echo "   - npm run dev"
echo ""
echo "2. Hard refresh del navegador:"
echo "   - Cmd+Shift+R (Mac) o Ctrl+Shift+R (Windows)"
echo ""
echo "3. Verificar consola del navegador (F12)"