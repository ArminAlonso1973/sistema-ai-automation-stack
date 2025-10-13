# 🤖 Sistema AI Automation Stack

[![CI/CD Pipeline](https://github.com/usuario/sistema-ai-automation-stack/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/usuario/sistema-ai-automation-stack/actions/workflows/ci-cd.yml)
[![Branch Protection](https://github.com/usuario/sistema-ai-automation-stack/actions/workflows/branch-protection.yml/badge.svg)](https://github.com/usuario/sistema-ai-automation-stack/actions/workflows/branch-protection.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📋 Descripción

Sistema completo de automatización con IA para gestión de leads a través de WhatsApp, con dashboard en tiempo real y generación automática de propuestas.

## 🏗️ Arquitectura

```
┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│   FRONTEND   │────────>│   BACKEND    │────────>│   SERVICIOS  │
│  React+Vite  │  HTTP   │  Node+Express│   API   │  EXTERNOS    │
│   (Vercel)   │         │  (Railway)   │         │  (AI, DBs)   │
└──────────────┘         └──────────────┘         └──────────────┘
```

## 🚀 Quick Start

### Prerrequisitos
- Node.js 20+
- npm o yarn
- Git

### Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/usuario/sistema-ai-automation-stack.git
cd sistema-ai-automation-stack
```

2. **Instalar dependencias del backend**
```bash
cd backend
npm install
cp .env.example .env
# Configurar variables de entorno en .env
```

3. **Instalar dependencias del frontend**
```bash
cd ../frontend
npm install
```

4. **Ejecutar en desarrollo**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## 🧪 Testing

### Backend
```bash
cd backend
npm test                 # Tests unitarios
npm run test:coverage   # Tests con cobertura
npm run test:integration # Tests de integración
```

### Frontend
```bash
cd frontend
npm test                # Tests de componentes
npm run test:e2e       # Tests end-to-end
```

## 🔄 Flujo de Desarrollo

### 1. Protección de Branches
- `main`: Branch de producción (protegido)
- `develop`: Branch de desarrollo
- Feature branches: `feature/nombre-feature`

### 2. Pull Request Process
1. Crear feature branch desde `develop`
2. Desarrollar y hacer commits
3. Crear Pull Request a `develop`
4. GitHub Actions ejecuta automáticamente:
   - ✅ Tests unitarios
   - ✅ Tests de integración
   - ✅ Verificación de regresiones
   - ✅ Análisis de seguridad
   - ✅ Validación de estructura

### 3. Prevención de Regresiones
El sistema incluye workflows automáticos que:
- 🔍 Detectan regresiones en funcionalidad
- ⚡ Verifican regresiones de performance
- 🛡️ Escanean vulnerabilidades de seguridad
- 🏗️ Validan integridad de estructura

## 📊 CI/CD Pipeline

### Stages del Pipeline
1. **Backend Tests** - Tests unitarios y de integración
2. **Frontend Tests** - Tests de componentes y build
3. **Integration Tests** - Tests end-to-end
4. **Code Quality** - ESLint, Security scan
5. **Deployment Gate** - Validación final

### Triggers
- Push a `main` o `develop`
- Pull Requests a `main`
- Nightly security scans

## 🔒 Configuración de Seguridad

### Variables de Entorno Requeridas
```env
# Backend
OPENAI_API_KEY=tu_openai_key
SUPABASE_URL=tu_supabase_url
SUPABASE_ANON_KEY=tu_supabase_key
UPSTASH_REDIS_REST_URL=tu_redis_url
UPSTASH_REDIS_REST_TOKEN=tu_redis_token

# WhatsApp
WHATSAPP_TOKEN=tu_whatsapp_token
WHATSAPP_VERIFY_TOKEN=tu_verify_token
```

### Secrets de GitHub
Configurar en GitHub Repository > Settings > Secrets:
- `OPENAI_API_KEY`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

## 📁 Estructura del Proyecto

```
proyecto-raiz/
├── backend/                 # API Node.js + Express
│   ├── src/
│   │   ├── services/       # Servicios (AI, WhatsApp, Cache, DB)
│   │   ├── routes/         # Rutas de API
│   │   └── utils/          # Utilidades
│   └── tests/              # Tests del backend
├── frontend/               # App React + Vite
│   ├── src/
│   │   ├── components/     # Componentes UI
│   │   ├── pages/          # Páginas
│   │   └── hooks/          # Custom hooks
│   └── tests/              # Tests del frontend
└── .github/workflows/      # GitHub Actions
```

## 📚 Documentación

- [📖 Documentación del Proyecto](./documentacion_proyecto.md)
- [🔌 API Documentation](./docs/API.md)
- [⚙️ Setup Guide](./docs/SETUP.md)

## 🤝 Contribuir

1. Fork del proyecto
2. Crear feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Crear Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🆘 Soporte

Para soporte, crear un issue en GitHub o contactar al equipo de desarrollo.