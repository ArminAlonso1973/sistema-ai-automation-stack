#!/bin/bash

echo "🔍 VERIFICANDO COMPONENTES FRONTEND"
echo "=================================="

cd /Users/arminpalma/Documents/MacBookPro_Armin/Sistema_AI_automation_stack/frontend

echo ""
echo "📊 VERIFICANDO ARCHIVOS CRÍTICOS:"

echo "1. Layout.jsx:"
if [ -f "src/components/Layout.jsx" ]; then
    echo "✅ Existe - Primeras líneas:"
    head -5 src/components/Layout.jsx
else
    echo "❌ NO EXISTE"
fi

echo ""
echo "2. Dashboard.jsx:"
if [ -f "src/pages/Dashboard.jsx" ]; then
    echo "✅ Existe - Primeras líneas:"
    head -5 src/pages/Dashboard.jsx
else
    echo "❌ NO EXISTE"
fi

echo ""
echo "3. Leads.jsx:"
if [ -f "src/pages/Leads.jsx" ]; then
    echo "✅ Existe - Primeras líneas:"
    head -5 src/pages/Leads.jsx
else
    echo "❌ NO EXISTE"
fi

echo ""
echo "4. Proposals.jsx:"
if [ -f "src/pages/Proposals.jsx" ]; then
    echo "✅ Existe - Primeras líneas:"
    head -5 src/pages/Proposals.jsx
else
    echo "❌ NO EXISTE"
fi

echo ""
echo "🔧 VERIFICANDO CONSOLA DEL NAVEGADOR:"
echo "1. Ve a http://localhost:3001"
echo "2. Presiona F12 para abrir Developer Tools"
echo "3. Ve a la pestaña 'Console'"
echo "4. Busca errores en rojo"
echo ""
echo "🎯 POSIBLES ERRORES:"
echo "- Import/Export errors"
echo "- Component not found"
echo "- Syntax errors"
echo "- Missing dependencies"