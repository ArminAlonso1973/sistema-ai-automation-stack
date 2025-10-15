#!/bin/bash

# Script para corregir automáticamente errores de ESLint
echo "🔧 CORRIGIENDO ERRORES DE ESLINT AUTOMÁTICAMENTE"

cd /Users/arminpalma/Documents/MacBookPro_Armin/Sistema_AI_automation_stack/backend

# Ejecutar ESLint con fix automático
echo "📝 Aplicando correcciones automáticas..."
npx eslint src/ --ext .js --fix

echo ""
echo "✅ CORRECCIONES APLICADAS"
echo "🔍 Verificando estado después de las correcciones..."

# Verificar resultado
npx eslint src/ --ext .js

echo ""
echo "🧪 Ejecutando tests para verificar que todo funcione..."
npm test

echo ""
echo "🚀 ¿Listo para commit?"