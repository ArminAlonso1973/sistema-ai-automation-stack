#!/bin/bash

# Script para corregir problemas de GitHub Actions
echo "🔧 CORRIGIENDO PROBLEMAS DE GITHUB ACTIONS"

cd /Users/arminpalma/Documents/MacBookPro_Armin/Sistema_AI_automation_stack

# Corregir frontend ESLint
echo "📝 Corrigiendo configuración ESLint frontend..."
cd frontend
rm eslint.config.js 2>/dev/null || true
cp .eslintrc-fixed.json .eslintrc.json
rm .eslintrc-fixed.json

# Instalar dependencias del frontend con flag de compatibilidad
echo "📦 Instalando dependencias frontend con compatibilidad..."
npm install --legacy-peer-deps

# Probar frontend
echo "🧪 Probando frontend..."
npm test

# Regresar al backend
cd ../backend
echo "🧪 Probando backend..."
npm test

echo ""
echo "✅ CORRECCIONES APLICADAS"
echo "🎯 Frontend: ESLint v8 + legacy-peer-deps"
echo "🎯 Backend: ESLint v9 con ES modules"

echo ""
echo "🚀 ¿Listo para commit final?"