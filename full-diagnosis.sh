#!/bin/bash

echo "🔍 DIAGNÓSTICO COMPLETO - BUSCANDO ARCHIVOS DUPLICADOS"
echo "====================================================="

cd /Users/arminpalma/Documents/MacBookPro_Armin/Sistema_AI_automation_stack/frontend

echo ""
echo "1. BUSCANDO TODOS LOS ARCHIVOS App.jsx:"
echo "--------------------------------------"
find . -name "App.jsx" -type f

echo ""
echo "2. CONTENIDO DE CADA App.jsx ENCONTRADO:"
echo "--------------------------------------"
for file in $(find . -name "App.jsx" -type f); do
    echo "=== $file ==="
    head -10 "$file"
    echo ""
done

echo ""
echo "3. VERIFICANDO ARCHIVOS EN src/:"
echo "-------------------------------"
ls -la src/

echo ""
echo "4. VERIFICANDO SI HAY ARCHIVOS .BACKUP O .OLD:"
echo "---------------------------------------------"
find . -name "App*.jsx" -type f

echo ""
echo "5. VERIFICANDO package.json main entry:"
echo "--------------------------------------"
grep -A 5 -B 5 "main\|entry" package.json || echo "No main entry found"

echo ""
echo "6. VERIFICANDO vite.config.js:"
echo "-----------------------------"
cat vite.config.js 2>/dev/null || echo "No vite.config.js found"

echo ""
echo "🔧 SOLUCIÓN SUGERIDA:"
echo "1. Eliminar todos los App.jsx excepto src/App.jsx"
echo "2. Verificar que no hay conflictos"
echo "3. Force rebuild completo"