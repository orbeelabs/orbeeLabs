// Tipos comuns para integração com CRMs

export type CRMProvider = 'pipedrive' | 'rdstation' | 'none'; // 'hubspot' temporariamente removido

export interface ContactData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  website?: string;
  message?: string;
  source?: string;
  tags?: string[];
  customFields?: Record<string, string | number | boolean | undefined>;
}

export interface CRMResponse {
  success: boolean;
  contactId?: string;
  dealId?: string;
  error?: string;
}

export interface CRMAdapter {
  createContact(data: ContactData): Promise<CRMResponse>;
  createDeal?(contactId: string, dealData: DealData): Promise<CRMResponse>;
  addToWorkflow?(contactId: string, workflowId: string): Promise<void>;
}

export interface DealData {
  title: string;
  value?: number;
  currency?: string;
  stage?: string;
  customFields?: Record<string, string | number | boolean | undefined>;
}

