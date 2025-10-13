#!/bin/bash

echo "🔧 CORRIGIENDO AI SERVICE - ELIMINANDO DEPENDENCIAS PROBLEMÁTICAS"
echo "=================================================================="

cd /Users/arminpalma/Documents/MacBookPro_Armin/Sistema_AI_automation_stack/backend

# Backup del archivo problemático
cp src/services/ai.service.js src/services/ai.service.BROKEN2.js

# Reemplazar con versión limpia (sin logger dependency)
cp src/services/ai.service.CLEAN.js src/services/ai.service.js

echo "✅ AI Service limpio aplicado"
echo ""
echo "📊 CAMBIOS REALIZADOS:"
echo "- ❌ Eliminada dependencia logger problemática"
echo "- ✅ Usando console.log/error para development"
echo "- ✅ Mock responses funcionando"
echo "- ✅ Sin dependencias externas problemáticas"
echo ""
echo "🚀 SERVIDOR DEBERÍA FUNCIONAR AHORA:"
echo "npm start"