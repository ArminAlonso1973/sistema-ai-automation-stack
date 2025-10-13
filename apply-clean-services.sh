#!/bin/bash

echo "🔧 APLICANDO SERVICES LIMPIOS - MODO DESARROLLO"
echo "==============================================="

cd /Users/arminpalma/Documents/MacBookPro_Armin/Sistema_AI_automation_stack/backend

# Backup de archivos originales
echo "📦 Creando backups..."
cp src/services/db.service.js src/services/db.service.BROKEN.js 2>/dev/null || true
cp src/services/whatsapp.service.js src/services/whatsapp.service.ORIGINAL.js 2>/dev/null || true  
cp src/services/cache.service.js src/services/cache.service.ORIGINAL.js 2>/dev/null || true

# Aplicar versiones limpias
echo "✅ Aplicando services limpios..."
cp src/services/db.service.CLEAN.js src/services/db.service.js
cp src/services/whatsapp.service.CLEAN.js src/services/whatsapp.service.js
cp src/services/cache.service.CLEAN.js src/services/cache.service.js

echo ""
echo "📊 SERVICES APLICADOS:"
echo "- ✅ AI Service: Mock responses para desarrollo"
echo "- ✅ DB Service: Mock data, sin Supabase real"
echo "- ✅ WhatsApp Service: Mock messages"
echo "- ✅ Cache Service: Mock en memoria"
echo ""
echo "🚀 SERVIDOR LISTO PARA DESARROLLO:"
echo "npm start"
echo ""
echo "📱 DESPUÉS EJECUTAR FRONTEND:"
echo "cd ../frontend && npm run dev"