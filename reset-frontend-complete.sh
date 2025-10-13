#!/bin/bash

echo "🚨 RESET COMPLETO DEL FRONTEND - SOLUCIÓN DEFINITIVA"
echo "===================================================="

cd /Users/arminpalma/Documents/MacBookPro_Armin/Sistema_AI_automation_stack/frontend

echo "1. Matando TODOS los procesos Node/npm..."
pkill -f "node" 2>/dev/null || echo "No hay procesos Node"
pkill -f "npm" 2>/dev/null || echo "No hay procesos npm"
pkill -f "vite" 2>/dev/null || echo "No hay procesos Vite"

echo ""
echo "2. Limpiando caché npm global..."
npm cache clean --force

echo ""
echo "3. Eliminando COMPLETAMENTE node_modules y locks..."
rm -rf node_modules
rm -f package-lock.json
rm -f yarn.lock

echo ""
echo "4. Verificando package.json..."
if [ -f package.json ]; then
    echo "✅ package.json existe"
else
    echo "❌ package.json faltante - creando básico..."
    cat > package.json << 'EOF'
{
  "name": "ai-bot-dashboard",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.27",
    "@types/react-dom": "^18.0.10",
    "@vitejs/plugin-react": "^3.1.0",
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.21",
    "tailwindcss": "^3.2.7",
    "vite": "^5.0.0"
  }
}
EOF
fi

echo ""
echo "5. Instalación PASO A PASO..."
echo "5a. Instalando dependencias core..."
npm install --no-audit --no-fund --progress=false

echo ""
echo "5b. Verificando instalación..."
if [ -d "node_modules" ]; then
    echo "✅ node_modules creado exitosamente"
else
    echo "❌ Error en instalación"
    exit 1
fi

echo ""
echo "6. Creando archivos de configuración si faltan..."

# postcss.config.js
if [ ! -f "postcss.config.js" ]; then
cat > postcss.config.js << 'EOF'
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF
echo "✅ postcss.config.js creado"
fi

# tailwind.config.js
if [ ! -f "tailwind.config.js" ]; then
cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
EOF
echo "✅ tailwind.config.js creado"
fi

echo ""
echo "✅ RESET COMPLETADO EXITOSAMENTE"
echo ""
echo "🚀 INTENTAR AHORA:"
echo "npm run dev"
echo ""
echo "📊 SI FUNCIONA DEBERÍAS VER:"
echo "VITE v5.x.x ready in xxx ms"
echo "➜ Local: http://localhost:3001/"