#!/bin/bash

echo "🔧 CONFIGURANDO SERVIDOR PARA DESARROLLO"
echo "======================================="

cd /Users/arminpalma/Documents/MacBookPro_Armin/Sistema_AI_automation_stack/backend

# Instalar nodemon para development
echo "📦 Instalando nodemon..."
npm install --save-dev nodemon

echo "✅ Backend configurado para desarrollo"
echo ""

cd ../frontend

# Verificar scripts disponibles
echo "📋 Scripts disponibles en frontend:"
npm run

echo ""
echo "🎯 COMANDOS PARA EJECUTAR:"
echo "Backend: npm run dev (con auto-reload)"
echo "Frontend: npm run dev (servidor desarrollo)"