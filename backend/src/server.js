// server.js - Archivo principal del backend
// server.js - El corazón del servidor
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { apiLimiter, webhookLimiter, healthLimiter, adminLimiter } from './middleware/rateLimiter.js';
import whatsappRoutes from './routes/whatsapp.routes.js';
import leadsRoutes from './routes/leads.routes.js';
import adminRoutes from './routes/admin.routes.js';
import apiRoutes from './routes/api.routes.js';

const app = express();

// Middlewares básicos
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting middleware
app.use('/api/', apiLimiter);
app.use('/webhook/', webhookLimiter);
app.use('/admin/', adminLimiter);

// Usar rutas
app.use('/webhook/whatsapp', whatsappRoutes);
app.use('/webhook/leads', leadsRoutes);
app.use('/admin', adminRoutes);
app.use('/api', apiRoutes);

// Health check con rate limiting
app.get('/health', healthLimiter, (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Manejo de errores global (10 líneas)
app.use((err, req, res) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Algo salió mal',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Iniciar servidor (5 líneas)
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}`);
});

// Manejo de cierre graceful (8 líneas)
process.on('SIGTERM', () => {
  console.log('👋 Cerrando servidor...');
  process.exit(0);
});