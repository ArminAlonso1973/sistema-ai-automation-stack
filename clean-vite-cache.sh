#!/bin/bash

echo "🔧 LIMPIANDO CACHÉ DE VITE - FORCE RELOAD"
echo "========================================"

cd /Users/arminpalma/Documents/MacBookPro_Armin/Sistema_AI_automation_stack/frontend

echo "1. Parando Vite (si está corriendo)..."
# Buscar y matar proceso Vite
pkill -f "vite" 2>/dev/null || echo "No hay procesos Vite corriendo"

echo ""
echo "2. Limpiando caché de Vite..."
rm -rf node_modules/.vite
rm -rf dist
rm -rf .vite

echo ""
echo "3. Limpiando caché del navegador..."
echo "   - Después ve al navegador"
echo "   - Presiona Cmd+Shift+R (Mac) o Ctrl+Shift+R (Windows)"
echo "   - O abre DevTools (F12) → Network tab → Disable cache"

echo ""
echo "4. Verificando App.jsx actual:"
echo "------------------------------"
head -15 src/App.jsx

echo ""
echo "✅ Caché limpiado completamente"
echo ""
echo "🚀 AHORA EJECUTA:"
echo "npm run dev"
echo ""
echo "📱 LUEGO HARD REFRESH EN NAVEGADOR:"
echo "Cmd+Shift+R o Ctrl+Shift+R"