import { createClient } from '@supabase/supabase-js';

class DatabaseService {
  constructor() {
    // Conexión directa a Supabase usando variables de entorno
    const supabaseUrl = process.env.SUPABASE_URL || 'https://mock-project.supabase.co';
    const supabaseKey = process.env.SUPABASE_ANON_KEY || 'mock-anon-key-for-development';
    
    // Advertir si se usan valores mock (no detener el proceso para permitir testing)
    if (supabaseUrl === 'https://mock-project.supabase.co' || supabaseKey === 'mock-anon-key-for-development') {
      console.log('[DEV] Database Service initialized with mock configuration');
      this.mockMode = true;
    } else {
      console.log('Supabase client initialized.');
      this.mockMode = false;
    }
    
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async getLeads() {
    if (this.mockMode) {
      console.log('[DEV] Mock getLeads called');
      return {
        data: [
          {
            id: 1,
            name: 'Lead Demo 1',
            phone: '+1234567890',
            message: 'Hola, me interesa el producto',
            status: 'nuevo',
            priority: 'alta',
            created_at: new Date().toISOString()
          },
          {
            id: 2,
            name: 'Lead Demo 2',
            phone: '+0987654321',
            message: 'Quiero más información',
            status: 'contactado',
            priority: 'media',
            created_at: new Date().toISOString()
          }
        ],
        error: null
      };
    }

    try {
      const { data, error } = await this.supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
      
      return { data, error };
    } catch (error) {
      console.error('Error fetching leads:', error);
      return { data: null, error };
    }
  }

  async createLead(leadData) {
    if (this.mockMode) {
      console.log('[DEV] Mock createLead called with:', leadData);
      return {
        data: {
          id: Date.now(),
          ...leadData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        error: null
      };
    }

    try {
      const { data, error } = await this.supabase
        .from('leads')
        .insert(leadData)
        .select();
      
      return { data: data?.[0], error };
    } catch (error) {
      console.error('Error creating lead:', error);
      return { data: null, error };
    }
  }

  async updateLead(id, updates) {
    if (this.mockMode) {
      console.log('[DEV] Mock updateLead called with:', id, updates);
      return {
        data: {
          id,
          ...updates,
          updated_at: new Date().toISOString()
        },
        error: null
      };
    }

    try {
      const { data, error } = await this.supabase
        .from('leads')
        .update(updates)
        .eq('id', id)
        .select();
      
      return { data: data?.[0], error };
    } catch (error) {
      console.error('Error updating lead:', error);
      return { data: null, error };
    }
  }

  async getConversations() {
    if (this.mockMode) {
      console.log('[DEV] Mock getConversations called');
      return {
        data: [
          {
            id: 1,
            from_phone: '+1234567890',
            message: 'Hola',
            response: 'Hola, ¿cómo puedo ayudarte?',
            urgencia: 'media',
            created_at: new Date().toISOString()
          }
        ],
        error: null
      };
    }

    try {
      const { data, error } = await this.supabase
        .from('conversations')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);
      
      return { data, error };
    } catch (error) {
      console.error('Error fetching conversations:', error);
      return { data: null, error };
    }
  }

  async getClientConfig(clientId) {
    if (this.mockMode) {
      console.log('[DEV] Mock getClientConfig called with:', clientId);
      return {
        data: {
          id: clientId,
          name: 'Cliente Demo',
          webhook_url: 'https://example.com/webhook',
          settings: { autorespond: true }
        },
        error: null
      };
    }

    try {
      const { data, error } = await this.supabase
        .from('clients')
        .select('*')
        .eq('id', clientId)
        .single();
      
      return { data, error };
    } catch (error) {
      console.error('Error fetching client config:', error);
      return { data: null, error };
    }
  }

  async guardarConversacion(from, mensaje, respuesta, urgencia) {
    if (this.mockMode) {
      console.log('[DEV] Mock guardarConversacion called');
      return {
        data: {
          id: Date.now(),
          from_phone: from,
          message: mensaje,
          response: respuesta,
          urgencia: urgencia || 'media',
          created_at: new Date().toISOString()
        },
        error: null
      };
    }

    try {
      const { data, error } = await this.supabase
        .from('conversations')
        .insert({
          from_phone: from,
          message: mensaje,
          response: respuesta,
          urgencia: urgencia || 'media'
        })
        .select();
      
      return { data: data?.[0], error };
    } catch (error) {
      console.error('Error saving conversation:', error);
      return { data: null, error };
    }
  }
}

export default new DatabaseService();