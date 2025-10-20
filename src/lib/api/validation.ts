import { z } from 'zod';

// Schemas de validação centralizados
export const contactSchema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  telefone: z.string().optional(),
  empresa: z.string().optional(),
  mensagem: z.string().min(5, "Mensagem deve ter pelo menos 5 caracteres"),
});

export const newsletterSchema = z.object({
  email: z.string().email("Email inválido"),
  nome: z.string().optional(),
});

export const seoAnalysisSchema = z.object({
  url: z.string().url("URL inválida"),
});

// Schema para parâmetros de query
export const queryParamsSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(50),
  search: z.string().optional(),
  status: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

// Schema para IDs
export const idSchema = z.object({
  id: z.string().min(1, "ID é obrigatório"),
});

// Função para validar query parameters
export function validateQueryParams(request: Request) {
  const url = new URL(request.url);
  const params = Object.fromEntries(url.searchParams);
  return queryParamsSchema.parse(params);
}

// Função para validar ID de parâmetro
export function validateId(id: string | null) {
  if (!id) {
    throw new Error("ID é obrigatório");
  }
  return idSchema.parse({ id }).id;
}
