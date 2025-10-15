#!/bin/bash

# Script de inicialización de Git y primera prueba
echo "🚀 Inicializando repositorio Git..."

# Verificar si Git está instalado
if ! command -v git &> /dev/null; then
    echo "❌ Git no está instalado. Por favor instala Git primero."
    exit 1
fi

# Inicializar repositorio Git (si no existe)
if [ ! -d ".git" ]; then
    echo "📁 Inicializando repositorio Git..."
    git init
    echo "✅ Repositorio Git inicializado"
else
    echo "✅ Repositorio Git ya existe"
fi

# Configurar usuario Git (si no está configurado)
echo "👤 Verificando configuración de usuario Git..."
if [ -z "$(git config --global user.name)" ]; then
    echo "⚠️  Configurando usuario Git por defecto..."
    git config --global user.name "Sistema AI Automation"
    git config --global user.email "dev@ai-automation.com"
    echo "✅ Usuario Git configurado"
fi

# Crear branch main si no existe
echo "🌿 Verificando branch main..."
git checkout -b main 2>/dev/null || git checkout main

# Agregar todos los archivos al staging
echo "📦 Agregando archivos al staging..."
git add .

# Verificar el estado
echo "📊 Estado del repositorio:"
git status

# Crear el primer commit
echo "💾 Creando primer commit..."
git commit -m "🎉 Initial commit: Sistema AI Automation Stack

✅ Fase 1 Completada: Estructura de directorios
- Backend: Servicios, rutas, utilidades y tests
- Frontend: Componentes, páginas, hooks
- GitHub Actions: CI/CD y protección de regresiones
- Documentación: README y documentación del proyecto

📋 Archivos incluidos:
- 27 archivos de estructura base
- 4 archivos de configuración GitHub
- 2 archivos de documentación
- Sistema completo de testing y CI/CD

🔧 Configurado:
- Pipeline CI/CD completo
- Protección contra regresiones
- Testing automático
- Validación de seguridad"

echo ""
echo "🎯 PRIMER COMMIT COMPLETADO"
echo "📊 Resumen del repositorio:"
echo "   - Archivos: $(git ls-files | wc -l | tr -d ' ')"
echo "   - Commits: $(git rev-list --count HEAD)"
echo "   - Branch actual: $(git branch --show-current)"

echo ""
echo "🚀 PRÓXIMOS PASOS:"
echo "1. Crear repositorio en GitHub"
echo "2. Conectar repositorio local con GitHub:"
echo "   git remote add origin https://github.com/usuario/sistema-ai-automation-stack.git"
echo "3. Push inicial:"
echo "   git push -u origin main"
echo ""
echo "✅ Listo para ejecutar GitHub Actions!"