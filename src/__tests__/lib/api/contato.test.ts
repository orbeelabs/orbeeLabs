/**
 * Testes para utilitários de API
 * Testa funções auxiliares e validações
 */

import { z } from 'zod';

// Schema de validação de contato (copiado de validation.ts para evitar dependências)
const contactSchema = z.object({
  nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  telefone: z.string().optional(),
  empresa: z.string().optional(),
  mensagem: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
});

// Função helper para validar com Zod (simulando validateData)
function validateSchema<T extends z.ZodType>(schema: T, data: unknown) {
  try {
    const result = schema.parse(data);
    return { success: true as const, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false as const, error };
    }
    throw error;
  }
}

describe('Validação de Dados - Contato', () => {
  it('deve validar dados de contato válidos', () => {
    const validData = {
      nome: 'João Silva',
      email: 'joao@example.com',
      telefone: '31999999999',
      empresa: 'Empresa Teste',
      mensagem: 'Mensagem de teste',
    };

    const result = validateSchema(contactSchema, validData);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.nome).toBe('João Silva');
      expect(result.data.email).toBe('joao@example.com');
    }
  });

  it('deve rejeitar email inválido', () => {
    const invalidData = {
      nome: 'João Silva',
      email: 'email-invalido',
      mensagem: 'Mensagem de teste',
    };

    const result = validateSchema(contactSchema, invalidData);

    expect(result.success).toBe(false);
  });

  it('deve rejeitar dados obrigatórios faltando', () => {
    const invalidData = {
      nome: 'João Silva',
      // email e mensagem faltando
    };

    const result = validateSchema(contactSchema, invalidData);

    expect(result.success).toBe(false);
  });
});

