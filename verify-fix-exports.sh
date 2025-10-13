#!/bin/bash

echo "🔍 VERIFICACIÓN Y CORRECCIÓN DE EXPORTS"
echo "======================================"

cd /Users/arminpalma/Documents/MacBookPro_Armin/Sistema_AI_automation_stack/backend

echo ""
echo "1. Verificando estructura actual..."
echo "db.service.js:"
tail -5 src/services/db.service.js

echo ""
echo "ai.service.js:"
tail -5 src/services/ai.service.js

echo ""
echo "2. Corrigiendo exports si es necesario..."

# Corregir db.service.js export si no está bien
if ! grep -q "export.*DatabaseService" src/services/db.service.js; then
    echo "Corrigiendo db.service.js export..."
    sed -i.bak 's/module.exports = { DatabaseService }/export { DatabaseService }/g' src/services/db.service.js || echo "Export ya correcto"
fi

# Corregir ai.service.js export si no está bien
if ! grep -q "export.*AIService" src/services/ai.service.js; then
    echo "Corrigiendo ai.service.js export..."
    sed -i.bak 's/module.exports = { AIService }/export { AIService }/g' src/services/ai.service.js || echo "Export ya correcto"
fi

echo "✅ Exports verificados y corregidos"