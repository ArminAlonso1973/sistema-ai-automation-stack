#!/bin/bash

echo "🔧 GRUPO 4 - CORRECCIONES APLICADAS"
echo "=================================="

cd /Users/arminpalma/Documents/MacBookPro_Armin/Sistema_AI_automation_stack/frontend

echo "🧪 Ejecutando tests corregidos..."
npm test -- --run

echo ""
echo "📊 Contando archivos de test:"
find tests -name "*.test.jsx" -o -name "*.test.js" | wc -l

echo ""
echo "✅ VERIFICACIÓN COMPLETADA"