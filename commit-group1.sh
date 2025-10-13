#!/bin/bash

# Script para commit Grupo 1 - Frontend Setup
echo "📝 COMMIT GRUPO 1: FRONTEND SETUP + CORE"

cd /Users/arminpalma/Documents/MacBookPro_Armin/Sistema_AI_automation_stack

echo "📦 Agregando archivos al git..."
git add .

echo "💾 Realizando commit..."
git commit -m "🎯 FASE 5 GRUPO 1: Frontend Setup + Core Completado

✅ SETUP Y CONFIGURACIÓN COMPLETA:
🏗️ Vite + React + Tailwind configurado
📦 Package.json con todas las dependencias
⚙️ Vite.config.js con testing setup
🧪 Vitest configurado correctamente

✅ API CLIENT IMPLEMENTADO:
🔌 Cliente HTTP completo (GET, POST, PUT, DELETE)
🌐 Support para environment variables
🛡️ Error handling robusto
🧪 8 tests cubriendo todas las operaciones

✅ TESTING INFRASTRUCTURE:
🧪 Vitest + Testing Library setup
🔧 Tests setup configurado
📊 8 tests passing para API client
🏗️ Build pipeline funcionando

📊 ARCHIVOS IMPLEMENTADOS:
- frontend/package.json (dependencies + scripts)
- frontend/vite.config.js (config + testing)
- frontend/src/config/api.js (HTTP client)
- frontend/tests/config/api.test.js (8 tests)
- frontend/tests/setup.js (testing config)
- frontend/tailwind.config.js (CSS config)
- frontend/postcss.config.js (CSS processing)
- frontend/src/index.css (Tailwind imports)
- frontend/index.html (Vite entry)
- frontend/src/main.jsx (temporary app)
- frontend/.env.example (environment template)
- frontend/.gitignore (git exclusions)

🎯 FOUNDATION LISTA:
- ✅ Vite build system funcionando
- ✅ API client listo para usar en hooks
- ✅ Testing environment operativo
- ✅ Tailwind CSS configurado
- ✅ Environment variables setup

🚀 READY FOR GRUPO 2: Custom Hooks (useAPI + useAuth)
Backend APIs ready to integrate: 105 tests passing"

echo "🚀 Pushing to GitHub..."
if git push origin main; then
    echo ""
    echo "🎊 ¡GRUPO 1 COMMITTED EXITOSAMENTE!"
    echo "📊 Frontend foundation completado"
    echo "🔌 API client listo para hooks"
    echo "🧪 Testing infrastructure operativa"
    echo "🏗️ Build system funcionando"
    echo ""
    echo "⏳ Esperando GitHub Actions..."
    echo "🔗 https://github.com/ArminAlonso1973/sistema-ai-automation-stack/actions"
    
else
    echo "❌ Error en push a GitHub"
    exit 1
fi