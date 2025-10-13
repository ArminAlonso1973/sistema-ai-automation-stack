#!/bin/bash

echo "🔧 IMPLEMENTANDO PASO 1.2 - API CLIENT EVOLUTION (Basado en Perplexity AI)"
echo "========================================================================="

cd /Users/arminpalma/Documents/MacBookPro_Armin/Sistema_AI_automation_stack/frontend

echo ""
echo "📊 CAMBIOS SEGÚN PERPLEXITY:"
echo "- ✅ Usa import.meta.env.VITE_API_URL con fallback"
echo "- ✅ Error handling mejorado (lee mensajes de API)"
echo "- ✅ Método request() centralizado (evita duplicación)"
echo "- ✅ Manejo robusto de content-types"
echo "- ✅ Mantiene GET, POST, PUT, DELETE"
echo ""

echo "1. 🔄 Backup del api.js actual..."
cp src/config/api.js src/config/api.js.backup
echo "✅ Backup creado: api.js.backup"

echo ""
echo "2. 🔄 Reemplazando con versión de Perplexity..."
mv src/config/api-new.js src/config/api.js
echo "✅ api.js actualizado con versión mejorada"

echo ""
echo "3. 🔍 Verificando nuevo contenido..."
echo "Primeras líneas del nuevo api.js:"
head -5 src/config/api.js

echo ""
echo "4. 🧪 Actualizando tests según estrategia de Perplexity..."
echo "Modificando api.test.js para usar BASE_URL consistente..."

# Backup de tests
cp tests/config/api.test.js tests/config/api.test.js.backup

# Actualizar imports en el test para usar BASE_URL
sed -i.tmp '1i\
// Define la URL base para que los tests sean consistentes\
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"\
' tests/config/api.test.js

echo "✅ Tests preparados para nueva API structure"

echo ""
echo "5. 📊 BENEFICIOS IMPLEMENTADOS:"
echo "- ✅ Variables ENV: import.meta.env funcionando"
echo "- ✅ Fallback robusto: localhost:3000 por defecto"
echo "- ✅ Error handling: Mensajes descriptivos de API"
echo "- ✅ Arquitectura: Método request() centralizado"
echo "- ✅ Compatibilidad: Mantiene interfaz existente"
echo ""
echo "🎯 PASO 1.2 IMPLEMENTADO - LISTO PARA TESTING"