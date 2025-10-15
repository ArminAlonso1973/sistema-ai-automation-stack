#!/bin/bash

# Script para verificar Grupo 1 - Setup + Core
echo "🧪 VERIFICANDO GRUPO 1: SETUP + CORE"

cd /Users/arminpalma/Documents/MacBookPro_Armin/Sistema_AI_automation_stack/frontend

echo "📦 Instalando dependencias del frontend..."
if npm install; then
    echo "✅ Dependencias instaladas correctamente"
    
    echo ""
    echo "🧪 Ejecutando tests..."
    if npm test; then
        echo ""
        echo "✅ TESTS PASANDO CORRECTAMENTE"
        echo ""
        echo "🏗️ Verificando build..."
        if npm run build; then
            echo ""
            echo "✅ BUILD EXITOSO"
            echo ""
            echo "📊 RESUMEN GRUPO 1:"
            echo "   ✅ package.json: Configurado con todas las dependencias"
            echo "   ✅ vite.config.js: Configuración testing + development"
            echo "   ✅ api.js: Cliente HTTP completo (GET, POST, PUT, DELETE)"
            echo "   ✅ api.test.js: 8 tests cubriendo operaciones HTTP"
            echo "   ✅ tests/setup.js: Configuración Vitest funcionando"
            echo "   ✅ tailwind.config.js: Configuración CSS"
            echo "   ✅ Build: Compilación exitosa"
            echo ""
            echo "🚀 GRUPO 1 LISTO PARA COMMIT"
            
        else
            echo "❌ Error en build"
            exit 1
        fi
    else
        echo "❌ Tests fallando"
        echo "🔍 Revisar errores de testing"
        exit 1
    fi
else
    echo "❌ Error instalando dependencias"
    exit 1
fi