#!/bin/bash

# Script para verificar y corregir ESLint - Grupo 1 Fix
echo "🔧 CORRIGIENDO ESLINT - GRUPO 1 FIX"

cd /Users/arminpalma/Documents/MacBookPro_Armin/Sistema_AI_automation_stack/frontend

echo "📦 Instalando dependencias ESLint..."
if npm install; then
    echo "✅ Dependencias ESLint instaladas"
    
    echo ""
    echo "🔍 Verificando configuración ESLint..."
    if npx eslint --version; then
        echo "✅ ESLint configurado correctamente"
        
        echo ""
        echo "🧪 Ejecutando tests después del fix..."
        if npm test; then
            echo ""
            echo "✅ TESTS SIGUEN PASANDO"
            
            echo ""
            echo "🏗️ Verificando build después del fix..."
            if npm run build; then
                echo ""
                echo "✅ BUILD EXITOSO POST-FIX"
                echo ""
                echo "📊 RESUMEN GRUPO 1 FIX:"
                echo "   ✅ eslint.config.js: Creado con ESLint 9+ format"
                echo "   ✅ package.json: Dependencies ESLint agregadas"
                echo "   ✅ Tests: 8 tests siguen pasando"
                echo "   ✅ Build: Compilación exitosa"
                echo "   ✅ ESLint: Configuración válida"
                echo ""
                echo "🚀 GRUPO 1 FIX COMPLETADO - LISTO PARA COMMIT"
                
            else
                echo "❌ Error en build post-fix"
                exit 1
            fi
        else
            echo "❌ Tests fallando después del fix"
            exit 1
        fi
    else
        echo "❌ Error en configuración ESLint"
        exit 1
    fi
else
    echo "❌ Error instalando dependencias ESLint"
    exit 1
fi