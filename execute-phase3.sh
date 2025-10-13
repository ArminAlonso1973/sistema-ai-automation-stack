#!/bin/bash

# Script para ejecutar Fase 3 - Servidor y Rutas
echo "🚀 FASE 3: SERVIDOR Y RUTAS - IMPLEMENTACIÓN COMPLETA"

cd /Users/arminpalma/Documents/MacBookPro_Armin/Sistema_AI_automation_stack/backend

echo "📦 Instalando supertest para tests de integración..."
npm install supertest@^7.0.0 --save-dev

echo ""
echo "🧪 Ejecutando tests de integración..."
if npm run test:integration; then
    echo ""
    echo "🎉 ¡TESTS DE INTEGRACIÓN PASANDO!"
    echo ""
    echo "📊 Ejecutando suite completa..."
    if npm test; then
        echo ""
        echo "🎊 ¡FASE 3 COMPLETADA EXITOSAMENTE!"
        echo ""
        echo "🏆 LOGROS ALCANZADOS:"
        echo "   ✅ Servidor Express funcionando"
        echo "   ✅ 4 grupos de rutas implementadas:"
        echo "      - WhatsApp Routes (webhook + mensajes)"
        echo "      - Leads Routes (procesamiento leads)"
        echo "      - API Routes (endpoints frontend)"
        echo "      - Admin Routes (dashboard + config)"
        echo "   ✅ Tests de integración completos"
        echo "   ✅ Middlewares configurados (CORS, JSON, URLEncoded)"
        echo "   ✅ Health check operativo"
        echo "   ✅ Error handling global"
        echo ""
        echo "📈 MÉTRICAS DE TESTS:"
        echo "   ✅ Unit tests: ~62 tests"
        echo "   ✅ Integration tests: ~20+ tests"
        echo "   ✅ Total esperado: ~82+ tests"
        echo ""
        echo "🚀 ARQUITECTURA COMPLETA:"
        echo "   ✅ Backend server operativo"
        echo "   ✅ Servicios externos integrados"
        echo "   ✅ Routes & middlewares funcionando"
        echo "   ✅ Testing suite comprehensiva"
        echo ""
        echo "💾 Preparando commit de Fase 3..."
        cd ..
        git add .
        git commit -m "🚀 FASE 3 COMPLETADA: Express Server + Routes + Integration Tests

🏆 SERVIDOR COMPLETO IMPLEMENTADO:
✅ Express server con middlewares completos
✅ 4 grupos de rutas operativas
✅ Tests de integración funcionando
✅ Error handling robusto

🔗 RUTAS IMPLEMENTADAS:
✅ WhatsApp Routes (/webhook/whatsapp)
   - GET: Verificación webhook
   - POST: Procesamiento mensajes
   - Integración con AI y DB services

✅ Leads Routes (/webhook/leads)
   - POST: Creación y clasificación leads
   - Validación de datos requeridos
   - Integración con AI para urgencia

✅ API Routes (/api)
   - GET /stats: Estadísticas generales
   - GET /conversations/recent: Conversaciones
   - GET /leads: Leads con filtros
   - GET /whatsapp/stats: Stats WhatsApp
   - POST /whatsapp/test: Test bot

✅ Admin Routes (/admin)
   - GET /dashboard: Panel administrativo
   - GET /config: Configuración sistema
   - GET /health: Health check completo

🧪 TESTING ACHIEVEMENTS:
✅ Integration Tests: ~20+ tests nuevos
✅ Route Testing: Todos los endpoints
✅ Middleware Testing: CORS, JSON, URLEncoded
✅ Error Handling: Casos edge completos
✅ Health Check: Validación servidor

⚙️ MIDDLEWARES CONFIGURADOS:
✅ CORS: Cross-origin habilitado
✅ Express.json(): Parsing JSON requests
✅ Express.urlencoded(): Form data support
✅ Error Handler: Global error management

🏗️ ARQUITECTURA TÉCNICA:
✅ ES Modules: Importación moderna
✅ Async/Await: Manejo asíncrono
✅ Environment Variables: Configuración flexible  
✅ Logging: Structured logging integrado
✅ Security: Validación webhooks

🔄 INTEGRACIÓN SERVICIOS:
✅ AI Service: Clasificación y respuestas
✅ DB Service: CRUD operations  
✅ WhatsApp Service: API messaging
✅ Cache Service: Performance layer
✅ Security: Token validation
✅ Logger: Structured output

🎯 ENDPOINTS FUNCIONALES:
✅ POST /webhook/whatsapp: Recibe mensajes WhatsApp
✅ POST /webhook/leads: Procesa leads externos
✅ GET /api/stats: Dashboard statistics
✅ GET /health: Server health check
✅ All routes: Error handling + logging

FASE 3: SERVIDOR Y RUTAS - IMPLEMENTACIÓN PERFECTA
Next: Fase 4 - Frontend Implementation + E2E Integration"
        
        echo "🚀 Pushing to GitHub..."
        git push origin main
        
        echo ""
        echo "🎊 ¡FASE 3 HISTÓRICA COMPLETADA!"
        echo "📊 ~82+ tests funcionando"
        echo "🏗️ Servidor completamente operativo"
        echo "🔗 Todas las rutas implementadas"
        echo "🧪 Testing comprehensivo"
        echo "🚀 Listo para Fase 4: Frontend"
        
    else
        echo "❌ Problemas en suite completa"
    fi
else
    echo "❌ Tests de integración fallando"
    echo "🔍 Revisar implementación de rutas"
fi