#!/bin/bash

echo "🚀 GRUPO 4 - INSTALACIÓN Y TESTING"
echo "=================================="

cd /Users/arminpalma/Documents/MacBookPro_Armin/Sistema_AI_automation_stack/frontend

# Instalar React Router
echo "📦 Instalando React Router 6..."
npm install react-router-dom@6

echo ""
echo "🧪 Ejecutando todos los tests incluyendo Grupo 4..."
npm test -- --run

echo ""
echo "✅ GRUPO 4 COMPLETADO"
echo "📊 Verificando métricas finales..."