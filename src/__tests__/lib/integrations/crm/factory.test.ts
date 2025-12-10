/**
 * Testes para tipos e interfaces de CRM
 * Testa estruturas de dados e tipos
 */

import type { ContactData, CRMResponse, DealData } from '@/lib/integrations/crm/types';

describe('Tipos CRM', () => {
  it('deve ter estrutura correta de ContactData', () => {
    const contactData: ContactData = {
      name: 'João Silva',
      email: 'joao@example.com',
      phone: '31999999999',
      company: 'Empresa Teste',
      website: 'https://example.com',
      message: 'Mensagem de teste',
      source: 'website',
      tags: ['lead', 'website'],
      customFields: { cf_setor: 'Saúde' },
    };

    expect(contactData.name).toBe('João Silva');
    expect(contactData.email).toBe('joao@example.com');
    expect(contactData.tags).toContain('lead');
  });

  it('deve ter estrutura correta de CRMResponse', () => {
    const successResponse: CRMResponse = {
      success: true,
      contactId: 'contact-123',
      dealId: 'deal-456',
    };

    const errorResponse: CRMResponse = {
      success: false,
      error: 'Erro ao criar contato',
    };

    expect(successResponse.success).toBe(true);
    expect(successResponse.contactId).toBe('contact-123');
    expect(errorResponse.success).toBe(false);
    expect(errorResponse.error).toBeDefined();
  });

  it('deve ter estrutura correta de DealData', () => {
    const dealData: DealData = {
      title: 'Oportunidade de Venda',
      value: 10000,
      currency: 'BRL',
      stage: 'qualificacao',
      customFields: { cf_probabilidade: '50%' },
    };

    expect(dealData.title).toBe('Oportunidade de Venda');
    expect(dealData.value).toBe(10000);
  });
});

