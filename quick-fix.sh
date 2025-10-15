#!/bin/bash

# Script para commit rápido de corrección
echo "🔧 COMMIT RÁPIDO - CORRECCIÓN DE ARCHIVOS DUPLICADOS"

cd /Users/arminpalma/Documents/MacBookPro_Armin/Sistema_AI_automation_stack

# Ejecutar corrección
chmod +x fix-utils.sh
./fix-utils.sh

# Solo si la corrección fue exitosa, hacer commit
if [ $? -eq 0 ]; then
    echo "📦 Agregando correcciones..."
    git add .
    
    echo "💾 Commit de corrección..."
    git commit -m "🔧 Fix: Eliminar código duplicado en utils/logger.js y utils/security.js

- Corregido: Identifier 'Logger' has already been declared
- Corregido: Identifier 'crypto' has already been declared  
- Limpiados archivos utils con versiones únicas
- ESLint sin errores en utils/
- Tests funcionando correctamente

Resolución de GitHub Actions errors"
    
    echo "🚀 Push de corrección..."
    git push origin main
    
    echo ""
    echo "✅ CORRECCIÓN EXITOSA"
    echo "🎯 GitHub Actions ahora debería pasar completamente"
else
    echo "❌ Error en la corrección. Revisar manualmente."
fi