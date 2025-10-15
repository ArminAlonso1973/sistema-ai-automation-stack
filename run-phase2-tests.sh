#!/bin/bash

# Script para ejecutar tests completos de Phase 2
echo "🧪 EJECUTANDO TESTS COMPLETOS - FASE 2 FINALIZACIÓN"

cd /Users/arminpalma/Documents/MacBookPro_Armin/Sistema_AI_automation_stack/backend

echo "📋 Tests a ejecutar:"
echo "   ✅ logger.test.js (6 tests)"
echo "   ✅ security.test.js (12 tests)" 
echo "   ✅ cache.service.test.js (9 tests)"
echo "   ✅ db.service.test.js (8 tests)"
echo "   ✅ ai.service.test.js (10 tests)"
echo "   ✅ whatsapp.service.test.js (12 tests)"
echo "   ✅ Anteriores integration (3 tests)"
echo "   ✅ Anteriores unit (3 tests)"
echo ""

echo "🎯 Ejecutando tests unitarios de servicios y utils..."
npm run test:services

echo ""
echo "🔍 Ejecutando todos los tests..."
npm test

echo ""
echo "📊 Conteo esperado:"
echo "   - Utils: ~18 tests (logger + security)"
echo "   - Services: ~39 tests (cache + db + ai + whatsapp)"
echo "   - Integration: 3 tests (existentes)"
echo "   - Config: 3 tests (existentes)"
echo "   TOTAL ESPERADO: ~63 tests"

echo ""
echo "✅ TESTS COMPLETADOS"
echo "🎯 Si todos pasan: FASE 2 OFICIALMENTE COMPLETADA"
echo "🚀 Listo para commit final con test coverage completo"