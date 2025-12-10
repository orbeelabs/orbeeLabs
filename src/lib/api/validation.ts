import { z } from 'zod';

// Schemas de validação centralizados
export const contactSchema = z.object({
  nome: z.string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres")
    .trim(),
  email: z.string()
    .email("Email inválido")
    .toLowerCase()
    .trim(),
  telefone: z.string()
    .max(20, "Telefone deve ter no máximo 20 caracteres")
    .optional()
    .transform(val => val?.trim() || undefined),
  empresa: z.string()
    .max(100, "Empresa deve ter no máximo 100 caracteres")
    .optional()
    .transform(val => val?.trim() || undefined),
  mensagem: z.string()
    .min(5, "Mensagem deve ter pelo menos 5 caracteres")
    .max(5000, "Mensagem deve ter no máximo 5000 caracteres")
    .trim(),
  consentimentoLGPD: z.boolean().refine((val) => val === true, {
    message: "Você deve aceitar a Política de Privacidade para continuar",
  }),
  consentimentoCRM: z.boolean().optional().default(false),
});

export const newsletterSchema = z.object({
  email: z.string()
    .email("Email inválido")
    .toLowerCase()
    .trim(),
  nome: z.string()
    .max(100, "Nome deve ter no máximo 100 caracteres")
    .optional()
    .transform(val => val?.trim() || undefined),
  consentimentoLGPD: z.boolean().refine((val) => val === true, {
    message: "Você deve aceitar a Política de Privacidade para continuar",
  }),
  consentimentoCRM: z.boolean().optional().default(false),
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
