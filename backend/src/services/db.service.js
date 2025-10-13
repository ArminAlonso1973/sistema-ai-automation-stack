// db.service.js - Servicio para base de datos
import { createClient } from '@supabase/supabase-js';

class DatabaseService {
  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY
    );
  }

  // Obtener leads
  async getLeads() {
    try {
      const { data, error } = await this.supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error obteniendo leads:', error);
      return [];
    }
  }

  // Crear nuevo lead
  async createLead(leadData) {
    try {
      const { data, error } = await this.supabase
        .from('leads')
        .insert([leadData])
        .select();

      if (error) throw error;
      return data[0];
    } catch (error) {
      console.error('Error creando lead:', error);
      throw error;
    }
  }

  // Actualizar lead
  async updateLead(id, updates) {
    try {
      const { data, error } = await this.supabase
        .from('leads')
        .update(updates)
        .eq('id', id)
        .select();

      if (error) throw error;
      return data[0];
    } catch (error) {
      console.error('Error actualizando lead:', error);
      throw error;
    }
  }

  // Obtener conversaciones
  async getConversations() {
    try {
      const { data, error } = await this.supabase
        .from('conversations')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error obteniendo conversaciones:', error);
      return [];
    }
  }
}

export default new DatabaseService();