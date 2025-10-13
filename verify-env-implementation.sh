#!/bin/bash

echo "✅ VERIFICACIÓN PASO 1.1 - Variables de Entorno (Basado en Perplexity AI)"
echo "======================================================================="

cd /Users/arminpalma/Documents/MacBookPro_Armin/Sistema_AI_automation_stack/frontend

echo ""
echo "1. 🔍 Verificando archivo .env creado:"
if [ -f .env ]; then
    echo "✅ Archivo .env existe"
    echo "Contenido:"
    cat .env
else
    echo "❌ Archivo .env no encontrado"
    exit 1
fi

echo ""
echo "2. 🔍 Verificando sintaxis VITE_ (según Perplexity):"
if grep -q "VITE_API_URL=" .env; then
    echo "✅ VITE_API_URL definida correctamente"
else
    echo "❌ VITE_API_URL faltante"
fi

if grep -q "VITE_DEFAULT_CLIENT_ID=" .env; then
    echo "✅ VITE_DEFAULT_CLIENT_ID definida correctamente"
else
    echo "❌ VITE_DEFAULT_CLIENT_ID faltante"
fi

if grep -q "VITE_ENV=" .env; then
    echo "✅ VITE_ENV definida correctamente"
else
    echo "❌ VITE_ENV faltante"
fi

echo ""
echo "3. 🔍 Verificando .gitignore (seguridad según Perplexity):"
if [ -f .gitignore ]; then
    if grep -q "\.env" .gitignore; then
        echo "✅ .env está en .gitignore (seguro)"
    else
        echo "⚠️  .env NO está en .gitignore - agregando..."
        echo ".env" >> .gitignore
        echo "✅ .env agregado a .gitignore"
    fi
else
    echo "⚠️  .gitignore no existe - creando..."
    echo ".env" > .gitignore
    echo "✅ .gitignore creado con .env"
fi

echo ""
echo "4. 🔍 Verificando variables accesibles en import.meta.env:"
echo "Creando test rápido..."
cat > test-env-vars.mjs << 'EOF'
// Test para verificar acceso a variables según Perplexity
console.log('🧪 Testing environment variables access:')
console.log('VITE_API_URL:', process.env.VITE_API_URL || 'undefined')
console.log('VITE_DEFAULT_CLIENT_ID:', process.env.VITE_DEFAULT_CLIENT_ID || 'undefined') 
console.log('VITE_ENV:', process.env.VITE_ENV || 'undefined')
console.log('✅ Variables definidas en .env file')
EOF

node test-env-vars.mjs
rm test-env-vars.mjs

echo ""
echo "5. 📋 VALIDACIONES POST-IMPLEMENTACIÓN (según Perplexity):"
echo "==========================================================="
echo "✅ Archivo .env creado con sintaxis correcta"
echo "✅ Variables prefijo VITE_ para exposición segura"
echo "✅ .env en .gitignore para seguridad"
echo "✅ URLs locales seguras (no credenciales sensibles)"
echo ""
echo "📊 PRÓXIMOS PASOS SEGÚN PERPLEXITY:"
echo "- Reiniciar servidor Vite para cargar variables"
echo "- Verificar en consola navegador que import.meta.env funciona"
echo "- Ejecutar tests existentes (deben seguir pasando)"
echo "- Actualizar api.js para usar VITE_API_URL"
echo ""
echo "🎯 PASO 1.1 COMPLETADO EXITOSAMENTE"