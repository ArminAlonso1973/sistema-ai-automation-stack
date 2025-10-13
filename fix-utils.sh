#!/bin/bash

# Script para corregir archivos duplicados en utils
echo "🔧 CORRIGIENDO ARCHIVOS DUPLICADOS EN UTILS"

cd /Users/arminpalma/Documents/MacBookPro_Armin/Sistema_AI_automation_stack/backend/src/utils

# Reemplazar archivos duplicados con versiones limpias
echo "📝 Reemplazando logger.js..."
cp logger-clean.js logger.js

echo "📝 Reemplazando security.js..."
cp security-clean.js security.js

# Limpiar archivos temporales
rm logger-clean.js security-clean.js

echo "✅ Archivos corregidos"

# Volver al directorio raíz del backend
cd /Users/arminpalma/Documents/MacBookPro_Armin/Sistema_AI_automation_stack/backend

# Probar ESLint
echo "🔍 Probando ESLint..."
npx eslint src/utils/ --ext .js

echo "🧪 Ejecutando tests..."
npm test

echo ""
echo "✅ CORRECCIÓN COMPLETADA"
echo "🚀 Listo para commit de corrección"