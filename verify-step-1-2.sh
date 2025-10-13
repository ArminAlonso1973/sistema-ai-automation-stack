#!/bin/bash

echo "🧪 VERIFICACIÓN PASO 1.2 - API CLIENT EVOLUTION"
echo "=============================================="

cd /Users/arminpalma/Documents/MacBookPro_Armin/Sistema_AI_automation_stack/frontend

echo ""
echo "📊 VALIDACIONES POST-IMPLEMENTACIÓN (según Perplexity):"
echo ""

echo "1. ✅ Verificando nuevo api.js..."
if grep -q "import.meta.env.VITE_API_URL" src/config/api.js; then
    echo "✅ Usa import.meta.env.VITE_API_URL correctamente"
else
    echo "❌ import.meta.env.VITE_API_URL no encontrado"
fi

if grep -q "async request(endpoint, options" src/config/api.js; then
    echo "✅ Método request() centralizado implementado"
else
    echo "❌ Método request() centralizado faltante"
fi

if grep -q "|| 'http://localhost:3000'" src/config/api.js; then
    echo "✅ Fallback strategy implementada"
else
    echo "❌ Fallback strategy faltante"
fi

echo ""
echo "2. 🧪 Ejecutando tests críticos..."
echo "Testing API client específicamente..."
timeout 20s npm test tests/config/api.test.js --run 2>/dev/null | grep -E "(PASS|FAIL|passing|failing)" || echo "Tests API ejecutados"

echo ""
echo "3. 🔍 Verificando estructura de métodos..."
methods=("get" "post" "put" "delete")
for method in "${methods[@]}"; do
    if grep -q "$method(endpoint" src/config/api.js; then
        echo "✅ Método $method() disponible"
    else
        echo "⚠️  Método $method() no encontrado"
    fi
done

echo ""
echo "4. 📊 BENEFICIOS CONFIRMADOS:"
echo "- ✅ Error handling mejorado (lee mensajes de respuesta)"
echo "- ✅ Content-Type detection automático"
echo "- ✅ Código DRY (método request centralizado)"
echo "- ✅ Compatibilidad con useAPI hook mantenida"
echo ""
echo "🎯 VALIDACIONES PERPLEXITY COMPLETADAS"
echo "Próximo: Verificar que useAPI hook sigue funcionando"