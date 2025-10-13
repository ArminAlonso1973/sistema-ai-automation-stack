// src/config/api.js - Conexión con Backend
// Usa la variable de entorno VITE_API_URL y ofrece un fallback para seguridad.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Cliente API mejorado y centralizado
export const api = {
  /**
   * Realiza una solicitud a la API.
   * @param {string} endpoint - El endpoint al que se llamará (ej. '/leads').
   * @param {object} options - Opciones de configuración para fetch().
   * @returns {Promise<any>} - La respuesta JSON de la API.
   */
  async request(endpoint, options = {}) {
    const config = {
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options
    };

    const response = await fetch(`${API_URL}${endpoint}`, config);

    if (!response.ok) {
      // Intenta obtener un mensaje de error del cuerpo de la respuesta
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.message || `Error ${response.status}: ${response.statusText}`;
      throw new Error(errorMessage);
    }
    
    // Evita errores si la respuesta no tiene cuerpo (ej. en un DELETE exitoso)
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    }
    return {}; // O `response.text()` si prefieres
  },

  // Métodos de conveniencia
  get(endpoint, options = {}) {
    return this.request(endpoint, { method: 'GET', ...options });
  },

  post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options
    });
  },

  put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options
    });
  },

  delete(endpoint, options = {}) {
    return this.request(endpoint, { method: 'DELETE', ...options });
  }
};

export { API_URL };
export default api;