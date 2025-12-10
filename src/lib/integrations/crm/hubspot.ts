import axios from 'axios';
import type { CRMAdapter, ContactData, CRMResponse, DealData } from './types';
import { logApiError } from '@/lib/logger';

export class HubSpotAdapter implements CRMAdapter {
  private apiKey: string;
  private baseUrl = 'https://api.hubapi.com';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async createContact(data: ContactData): Promise<CRMResponse> {
    try {
      // Separar nome em firstname e lastname
      const nameParts = data.name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      const contactData: {
        properties: {
          email: string;
          firstname: string;
          lastname: string;
          phone?: string;
          company?: string;
          website?: string;
          [key: string]: string | undefined;
        };
      } = {
        properties: {
          email: data.email,
          firstname: firstName,
          lastname: lastName,
          phone: data.phone || '',
          company: data.company || '',
          website: data.website || '',
          hs_lead_status: data.source || 'NEW',
          message: data.message || '',
        },
      };

      // Adicionar tags se fornecidas (via API separada após criar contato)
      // Tags serão adicionadas depois se necessário

      // Adicionar campos customizados
      if (data.customFields) {
        Object.assign(contactData.properties, data.customFields as Record<string, string>);
      }

      const response = await axios.post(
        `${this.baseUrl}/crm/v3/objects/contacts`,
        contactData,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const contactId = response.data.id;

      // Adicionar a workflow se especificado
      if (data.source === 'website' || data.source === 'seo-audit') {
        // Workflow ID padrão para leads do website (você pode configurar)
        const workflowId = process.env.HUBSPOT_WORKFLOW_ID;
        if (workflowId) {
          try {
            await this.addToWorkflow(contactId, workflowId);
          } catch (workflowError) {
            // Não quebrar se workflow falhar
            console.warn('Erro ao adicionar ao workflow HubSpot:', workflowError);
          }
        }
      }

      return {
        success: true,
        contactId,
      };
    } catch (error) {
      logApiError(error as Error, 'HubSpot', 'createContact', { email: data.email });
      
      // Verificar se é um erro do axios
      const axiosError = error && typeof error === 'object' && 'response' in error 
        ? error as { response?: { status?: number; data?: { message?: string } } }
        : null;
      
      // Se o contato já existe, tentar atualizar
      if (axiosError?.response?.status === 409) {
        try {
          const existingContact = await this.findContactByEmail(data.email);
          if (existingContact) {
            return {
              success: true,
              contactId: existingContact,
            };
          }
        } catch {
          // Ignorar erro de atualização
        }
      }

      return {
        success: false,
        error: axiosError?.response?.data?.message || 'Erro ao criar contato no HubSpot',
      };
    }
  }

  async createDeal(contactId: string, dealData: DealData): Promise<CRMResponse> {
    try {
      const deal = {
        properties: {
          dealname: dealData.title,
          amount: dealData.value?.toString() || '',
          dealstage: dealData.stage || 'appointmentscheduled',
          pipeline: 'default',
          ...dealData.customFields,
        },
        associations: [
          {
            to: { id: contactId },
            types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 3 }], // Contact to Deal
          },
        ],
      };

      const response = await axios.post(
        `${this.baseUrl}/crm/v3/objects/deals`,
        deal,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return {
        success: true,
        dealId: response.data.id,
      };
    } catch (error) {
      logApiError(error as Error, 'HubSpot', 'createDeal', { contactId });
      
      // Verificar se é um erro do axios
      const axiosError = error && typeof error === 'object' && 'response' in error 
        ? error as { response?: { data?: { message?: string } } }
        : null;
      
      return {
        success: false,
        error: axiosError?.response?.data?.message || 'Erro ao criar deal no HubSpot',
      };
    }
  }

  async addToWorkflow(contactId: string, workflowId: string): Promise<void> {
    try {
      await axios.post(
        `${this.baseUrl}/automation/v3/workflows/${workflowId}/enrollments/contacts/${contactId}`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      // Não lançar erro - workflow é opcional
      console.warn('Erro ao adicionar ao workflow HubSpot:', error);
    }
  }

  private async findContactByEmail(email: string): Promise<string | null> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/crm/v3/objects/contacts/${email}?idProperty=email`,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
          },
        }
      );
      return response.data.id || null;
    } catch {
      return null;
    }
  }
}

