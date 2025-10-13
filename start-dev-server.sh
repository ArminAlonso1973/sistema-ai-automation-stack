#!/bin/bash

echo "🚀 INICIANDO SISTEMA AI AUTOMATION STACK"
echo "======================================="

cd /Users/arminpalma/Documents/MacBookPro_Armin/Sistema_AI_automation_stack

echo "🔧 Configurando entorno de desarrollo..."

# Verificar que existe .env en backend
if [ ! -f "backend/.env" ]; then
    echo "❌ Archivo .env no encontrado en backend"
    echo "📝 Creando archivo .env con configuración de desarrollo..."
    
    cat > backend/.env << 'EOF'
NODE_ENV=development
PORT=3000
OPENAI_API_KEY=sk-test-key-for-development
SUPABASE_URL=https://test-project.supabase.co
SUPABASE_ANON_KEY=test-anon-key-for-development
WHATSAPP_TOKEN=test-whatsapp-token
WHATSAPP_VERIFY_TOKEN=test-verify-token
WHATSAPP_PHONE_NUMBER_ID=test-phone-id
UPSTASH_REDIS_REST_URL=https://test-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=test-redis-token
JWT_SECRET=test-jwt-secret-for-development-only
WEBHOOK_SECRET=test-webhook-secret
EOF
    echo "✅ Archivo .env creado"
fi

echo ""
echo "🎯 OPCIONES DISPONIBLES:"
echo ""
echo "1. 🟢 BACKEND SOLO:     cd backend && npm start"
echo "2. 🔵 FRONTEND SOLO:    cd frontend && npm run dev" 
echo "3. 🟣 TESTS BACKEND:    cd backend && npm test"
echo "4. 🟡 TESTS FRONTEND:   cd frontend && npm test"
echo ""
echo "💡 RECOMENDADO PARA DESARROLLO:"
echo "   Terminal 1: cd backend && npm start"
echo "   Terminal 2: cd frontend && npm run dev"
echo ""

# Verificar puertos disponibles
echo "🔍 Verificando puertos..."
if lsof -i :3000 >/dev/null 2>&1; then
    echo "⚠️  Puerto 3000 ocupado (backend)"
else
    echo "✅ Puerto 3000 disponible (backend)"
fi

if lsof -i :5173 >/dev/null 2>&1; then
    echo "⚠️  Puerto 5173 ocupado (frontend)"
else
    echo "✅ Puerto 5173 disponible (frontend)"
fi

echo ""
echo "🚀 ¿Ejecutar backend ahora? (y/n)"