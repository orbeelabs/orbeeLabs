import axios from 'axios';
import type { CRMAdapter, ContactData, CRMResponse, DealData } from './types';
import { logApiError, Logger } from '@/lib/logger';

export class RDStationAdapter implements CRMAdapter {
  private publicToken: string;
  private privateToken: string;
  private baseUrl = 'https://api.rd.services';

  constructor(publicToken: string, privateToken: string) {
    this.publicToken = publicToken;
    this.privateToken = privateToken;
  }

  async createContact(data: ContactData): Promise<CRMResponse> {
    try {
      // Separar nome em firstname e lastname
      const nameParts = data.name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      const contactData: {
        name: string;
        email: string;
        personal_phone: string;
        company_name: string;
        website: string;
        [key: string]: string | number | boolean | undefined;
      } = {
        name: data.name,
        email: data.email,
        personal_phone: data.phone || '',
        company_name: data.company || '',
        website: data.website || '',
        cf_origem: data.source || 'website',
        cf_mensagem: data.message || '',
      };

      // Adicionar tags se fornecidas
      if (data.tags && data.tags.length > 0) {
        contactData.tags = data.tags;
      }

      // Adicionar campos customizados
      if (data.customFields) {
        Object.assign(contactData, data.customFields);
      }

      // Criar contato via API de conversões (RD Station)
      const conversionData = {
        event_type: 'CONVERSION',
        event_family: 'CDP',
        payload: {
          conversion_identifier: 'formulario-contato',
          name: data.name,
          email: data.email,
          personal_phone: data.phone,
          company_name: data.company,
          website: data.website,
          cf_origem: data.source || 'website',
          cf_mensagem: data.message || '',
          tags: data.tags || ['lead', 'website'],
          ...data.customFields,
        },
      };

      await axios.post(
        `${this.baseUrl}/platform/conversions?api_key=${this.publicToken}`,
        conversionData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Buscar o contato criado (pode levar alguns segundos)
      // Tentar buscar imediatamente, se não encontrar, retornar sucesso mesmo assim
      let contactId: string | null = null;
      try {
        // Aguardar um pouco para o contato ser criado
        await new Promise(resolve => setTimeout(resolve, 1000));
        contactId = await this.findContactByEmail(data.email);
      } catch (findError) {
        // Ignorar erro - contato pode ser criado depois
        Logger.warn('Contato ainda não encontrado no RD Station (pode ser criado depois)', {
          email: data.email,
        });
      }

      return {
        success: true,
        contactId: contactId || undefined,
      };
    } catch (error) {
      logApiError(error as Error, 'RD Station', 'createContact', { email: data.email });
      
      // Se o contato já existe, tentar encontrar
      try {
        const existingContact = await this.findContactByEmail(data.email);
        if (existingContact) {
          return {
            success: true,
            contactId: existingContact,
          };
        }
      } catch (findError) {
        // Ignorar erro de busca
      }

      // Verificar se é um erro do axios
      const axiosError = error && typeof error === 'object' && 'response' in error 
        ? error as { response?: { data?: { error?: string } } }
        : null;
      
      return {
        success: false,
        error: axiosError?.response?.data?.error || 'Erro ao criar contato no RD Station',
      };
    }
  }

  async createDeal(contactId: string, dealData: DealData): Promise<CRMResponse> {
    try {
      // RD Station usa oportunidades (deals)
      const deal = {
        name: dealData.title,
        amount: dealData.value || 0,
        currency: dealData.currency || 'BRL',
        stage: dealData.stage || 'qualificacao',
        contact_id: contactId,
        ...dealData.customFields,
      };

      const response = await axios.post(
        `${this.baseUrl}/platform/deals?api_key=${this.privateToken}`,
        deal,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      return {
        success: true,
        dealId: response.data.id,
      };
    } catch (error) {
      logApiError(error as Error, 'RD Station', 'createDeal', { contactId });
      
      // Verificar se é um erro do axios
      const axiosError = error && typeof error === 'object' && 'response' in error 
        ? error as { response?: { data?: { error?: string } } }
        : null;
      
      return {
        success: false,
        error: axiosError?.response?.data?.error || 'Erro ao criar deal no RD Station',
      };
    }
  }

  async addToWorkflow(contactId: string, workflowId: string): Promise<void> {
    try {
      await axios.post(
        `${this.baseUrl}/platform/automations/${workflowId}/contacts/${contactId}?api_key=${this.privateToken}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      // Não lançar erro - workflow é opcional
      console.warn('Erro ao adicionar ao workflow RD Station:', error);
    }
  }

  private async findContactByEmail(email: string): Promise<string | null> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/platform/contacts/email:${email}?api_key=${this.privateToken}`
      );
      return response.data.id?.toString() || null;
    } catch {
      return null;
    }
  }
}

