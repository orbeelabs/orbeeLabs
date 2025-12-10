import axios from 'axios';
import type { CRMAdapter, ContactData, CRMResponse, DealData } from './types';
import { logApiError } from '@/lib/logger';

export class PipedriveAdapter implements CRMAdapter {
  private apiToken: string;
  private baseUrl = 'https://api.pipedrive.com/v1';

  constructor(apiToken: string) {
    this.apiToken = apiToken;
  }

  async createContact(data: ContactData): Promise<CRMResponse> {
    try {
      // Separar nome em firstname e lastname
      const nameParts = data.name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      const personData: {
        name: string;
        first_name: string;
        last_name: string;
        email: Array<{ value: string; primary?: boolean }>;
        phone?: Array<{ value: string; primary?: boolean }>;
        org_name?: string;
        [key: string]: string | Array<{ value: string; primary?: boolean }> | undefined;
      } = {
        name: data.name,
        first_name: firstName,
        last_name: lastName,
        email: [
          { value: data.email, primary: true },
        ],
        phone: data.phone ? [{ value: data.phone, primary: true }] : [],
        org_name: data.company || '',
        owner_id: process.env.PIPEDRIVE_OWNER_ID || undefined,
      };

      // Adicionar campos customizados
      if (data.customFields) {
        Object.assign(personData, data.customFields as Record<string, string | number | boolean | undefined>);
      }

      const response = await axios.post<{ data?: { id?: number } }>(
        `${this.baseUrl}/persons?api_token=${this.apiToken}`,
        personData
      );

      const contactId = response.data?.data?.id?.toString();

      if (!contactId) {
        throw new Error('ID do contato não retornado');
      }

      // Adicionar nota se houver mensagem
      if (data.message) {
        try {
          await axios.post(
            `${this.baseUrl}/notes?api_token=${this.apiToken}`,
            {
              content: data.message,
              person_id: parseInt(contactId),
            }
          );
        } catch (noteError) {
          // Não quebrar se nota falhar
          console.warn('Erro ao adicionar nota no Pipedrive:', noteError);
        }
      }

      return {
        success: true,
        contactId,
      };
    } catch (error) {
      logApiError(error as Error, 'Pipedrive', 'createContact', { email: data.email });
      
      // Verificar se é um erro do axios
      const axiosError = error && typeof error === 'object' && 'response' in error 
        ? error as { response?: { status?: number; data?: { error?: string } } }
        : null;
      
      // Se o contato já existe, tentar encontrar
      if (axiosError?.response?.status === 400) {
        try {
          const existingContact = await this.findContactByEmail(data.email);
          if (existingContact) {
            return {
              success: true,
              contactId: existingContact,
            };
          }
        } catch {
          // Ignorar erro de busca
        }
      }

      return {
        success: false,
        error: axiosError?.response?.data?.error || 'Erro ao criar contato no Pipedrive',
      };
    }
  }

  async createDeal(contactId: string, dealData: DealData): Promise<CRMResponse> {
    try {
      const deal = {
        title: dealData.title,
        value: dealData.value || 0,
        currency: dealData.currency || 'BRL',
        stage_id: this.getStageId(dealData.stage),
        person_id: parseInt(contactId),
        owner_id: process.env.PIPEDRIVE_OWNER_ID || undefined,
        ...dealData.customFields,
      };

      const response = await axios.post<{ data?: { id?: number } }>(
        `${this.baseUrl}/deals?api_token=${this.apiToken}`,
        deal
      );

      return {
        success: true,
        dealId: response.data?.data?.id?.toString(),
      };
    } catch (error) {
      logApiError(error as Error, 'Pipedrive', 'createDeal', { contactId });
      
      // Verificar se é um erro do axios
      const axiosError = error && typeof error === 'object' && 'response' in error 
        ? error as { response?: { data?: { error?: string } } }
        : null;
      
      return {
        success: false,
        error: axiosError?.response?.data?.error || 'Erro ao criar deal no Pipedrive',
      };
    }
  }

  private async findContactByEmail(email: string): Promise<string | null> {
    try {
      const response = await axios.get<{ data?: { items?: Array<{ item?: { id?: number } }> } }>(
        `${this.baseUrl}/persons/search?api_token=${this.apiToken}&term=${encodeURIComponent(email)}`
      );
      const person = response.data?.data?.items?.[0]?.item;
      return person?.id?.toString() || null;
    } catch {
      return null;
    }
  }

  private getStageId(stage?: string): number {
    // Mapear estágios do Pipedrive (você pode ajustar conforme seu pipeline)
    const stageMap: Record<string, number> = {
      'appointmentscheduled': 1,
      'qualifiedtobuy': 2,
      'presentationscheduled': 3,
      'decisionmakerboughtin': 4,
      'contractsent': 5,
      'closedwon': 6,
      'closedlost': 7,
    };
    return stageMap[stage || 'appointmentscheduled'] || 1;
  }
}

