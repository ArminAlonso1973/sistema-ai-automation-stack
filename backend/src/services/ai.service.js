// ai.service.js - Servicio para integraciones con IA
// services/ai.service.js
const OpenAI = require('openai')
const cacheService = require('./cache.service')

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

class AIService {
  
  // Generar respuesta con contexto del cliente
  async generarRespuesta(mensaje, contextoCliente) {
    // Intentar obtener de caché primero
    const cacheKey = `ai:${contextoCliente.id}:${mensaje.toLowerCase()}`
    const cached = await cacheService.get(cacheKey)
    if (cached) {
      console.log('💰 Respuesta desde caché')
      return cached
    }

    // Construir el prompt con contexto
    const prompt = this.construirPrompt(mensaje, contextoCliente)
    
    // Llamar a OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: prompt },
        { role: 'user', content: mensaje }
      ],
      temperature: 0.7,
      max_tokens: 200
    })

    const respuesta = completion.choices[0].message.content

    // Guardar en caché por 24 horas
    await cacheService.set(cacheKey, respuesta, 86400)

    return respuesta
  }

  // Construir prompt personalizado
  construirPrompt(mensaje, contexto) {
    return `
Eres un asistente virtual de ${contexto.nombre}.
Información del negocio:
- Horario: ${contexto.horario}
- Productos: ${contexto.productos.join(', ')}
- Tono: ${contexto.tono}

Responde de forma ${contexto.tono} y concisa.
Si no sabes algo, deriva a un humano.
    `.trim()
  }

  // Clasificar urgencia de un lead
  async clasificarUrgencia(mensaje) {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{
        role: 'user',
        content: `Clasifica la urgencia de este mensaje en: alta, media, baja
        
        Mensaje: ${mensaje}
        
        Responde solo con: alta, media o baja`
      }],
      temperature: 0.3,
      max_tokens: 10
    })

    return completion.choices[0].message.content.trim().toLowerCase()
  }
}

module.exports = new AIService()