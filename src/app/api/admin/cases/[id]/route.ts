import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { 
  createErrorResponse, 
  createSuccessResponse,
  withAdminDynamic,
} from "@/lib/api";
import { Logger } from "@/lib/logger";
import { z } from "zod";

// Schema de validação para atualizar case
const updateCaseSchema = z.object({
  slug: z.string().min(1).max(200).optional(),
  title: z.string().min(1).max(200).optional(),
  description: z.string().min(1).optional(),
  clientName: z.string().max(100).optional().nullable(),
  industry: z.string().min(1).optional(),
  services: z.array(z.string()).optional(),
  technologies: z.array(z.string()).optional(),
  challenge: z.string().min(1).optional(),
  solution: z.string().min(1).optional(),
  results: z.string().min(1).optional(),
  duration: z.string().min(1).optional(),
  timeline: z.string().optional().nullable(),
  learnings: z.string().optional().nullable(),
  heroImage: z.string().optional().nullable().refine((val) => !val || z.string().url().safeParse(val).success, {
    message: "Deve ser uma URL válida ou vazio"
  }),
  gallery: z.array(z.string().refine((val) => !val || z.string().url().safeParse(val).success, {
    message: "Deve ser uma URL válida ou vazio"
  })).optional(),
  gscBefore: z.string().optional().nullable().refine((val) => !val || z.string().url().safeParse(val).success, {
    message: "Deve ser uma URL válida ou vazio"
  }),
  gscAfter: z.string().optional().nullable().refine((val) => !val || z.string().url().safeParse(val).success, {
    message: "Deve ser uma URL válida ou vazio"
  }),
  ga4Before: z.string().optional().nullable().refine((val) => !val || z.string().url().safeParse(val).success, {
    message: "Deve ser uma URL válida ou vazio"
  }),
  ga4After: z.string().optional().nullable().refine((val) => !val || z.string().url().safeParse(val).success, {
    message: "Deve ser uma URL válida ou vazio"
  }),
  cwvBefore: z.string().optional().nullable().refine((val) => !val || z.string().url().safeParse(val).success, {
    message: "Deve ser uma URL válida ou vazio"
  }),
  cwvAfter: z.string().optional().nullable().refine((val) => !val || z.string().url().safeParse(val).success, {
    message: "Deve ser uma URL válida ou vazio"
  }),
  siteUrl: z.string().optional().nullable().refine((val) => {
    if (!val || val.trim() === '') return true;
    // Tentar adicionar https:// se não tiver protocolo
    const urlToTest = val.startsWith('http://') || val.startsWith('https://') ? val : `https://${val}`;
    return z.string().url().safeParse(urlToTest).success;
  }, {
    message: "Deve ser uma URL válida ou vazio"
  }),
  sitePreviewMobile: z.string().optional().nullable(),
  sitePreviewDesktop: z.string().optional().nullable(),
  sitePreviewGenerated: z.boolean().optional(),
  performanceMetrics: z.union([
    z.object({
      lcp: z.number().optional(),
      inp: z.number().optional(),
      cls: z.number().optional(),
      score: z.number().optional(),
    }),
    z.string(),
  ]).optional().nullable(),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
  publishedAt: z.string().datetime().optional(),
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function handleGetCase(request: NextRequest, { params }: { params: Promise<{ id: string }> }, _session: unknown) {
  const { id } = await params;
  
  try {
    const caseStudy = await prisma.caseStudy.findUnique({
      where: { id },
    });
    
    if (!caseStudy) {
      return createErrorResponse("Case não encontrado", null, 404);
    }
    
    return createSuccessResponse(caseStudy, "Case recuperado com sucesso");
  } catch (error) {
    Logger.error("Erro ao buscar case", {
      endpoint: '/api/admin/cases/[id]',
      method: 'GET',
      caseId: id,
    }, error as Error);
    return createErrorResponse("Erro interno do servidor");
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function handleUpdateCase(request: NextRequest, { params }: { params: Promise<{ id: string }> }, _session: unknown) {
  const { id } = await params;
  
  try {
    // Verificar se o case existe
    const existingCase = await prisma.caseStudy.findUnique({
      where: { id },
    });
    
    if (!existingCase) {
      return createErrorResponse("Case não encontrado", null, 404);
    }
    
    const body = await request.json();
    
    // Log para debug (apenas em desenvolvimento, sem dados sensíveis)
    if (process.env.NODE_ENV === 'development') {
      Logger.debug('Dados recebidos para atualização', {
        caseId: id,
        bodyKeys: Object.keys(body).join(', '),
        hasSiteUrl: !!body.siteUrl,
        hasPerformanceMetrics: !!body.performanceMetrics,
      });
    }
    
    const validation = updateCaseSchema.safeParse(body);
    
    if (!validation.success) {
      const errorDetails = validation.error.issues.map(issue => ({
        path: issue.path,
        message: issue.message,
        code: issue.code,
      }));
      
      Logger.error("Erro de validação ao atualizar case", {
        endpoint: '/api/admin/cases/[id]',
        method: 'PUT',
        caseId: id,
        errorsCount: validation.error.issues.length,
        receivedDataKeys: Object.keys(body).join(', '),
        firstError: errorDetails[0]?.message || 'Erro desconhecido',
      });
      
      return createErrorResponse(
        "Dados inválidos",
        errorDetails,
        400
      );
    }
    
    const data = validation.data;
    
    // Se o slug foi alterado, verificar se já existe
    if (data.slug && data.slug !== existingCase.slug) {
      const slugExists = await prisma.caseStudy.findUnique({
        where: { slug: data.slug },
      });
      
      if (slugExists) {
        return createErrorResponse(
          "Já existe um case com este slug",
          null,
          409
        );
      }
    }
    
    // Preparar dados para atualização
    const updateData = {
      ...data,
      publishedAt: data.publishedAt !== undefined 
        ? new Date(data.publishedAt)
        : undefined,
    };

    // Converter performanceMetrics para formato correto do Prisma
    if (data.performanceMetrics !== undefined) {
      if (data.performanceMetrics === null) {
        (updateData as { performanceMetrics?: null }).performanceMetrics = null;
      } else if (typeof data.performanceMetrics === 'string') {
        try {
          (updateData as { performanceMetrics?: unknown }).performanceMetrics = JSON.parse(data.performanceMetrics);
        } catch {
          // Se não for JSON válido, manter como objeto vazio
          (updateData as { performanceMetrics?: unknown }).performanceMetrics = {};
        }
      }
      // Se já é um objeto, não precisa fazer nada (já está no spread)
    }

    // Atualizar o case
    const updatedCase = await prisma.caseStudy.update({
      where: { id },
      data: updateData as Parameters<typeof prisma.caseStudy.update>[0]['data'],
    });
    
    return createSuccessResponse(
      updatedCase,
      "Case atualizado com sucesso"
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    
    Logger.error("Erro ao atualizar case", {
      endpoint: '/api/admin/cases/[id]',
      method: 'PUT',
      caseId: id,
      // Não logar mensagem de erro completa em produção (pode conter dados sensíveis)
      errorType: error instanceof Error ? error.constructor.name : 'Unknown',
    }, error as Error);
    
    // Em produção, retornar mensagem genérica. Em dev, mais detalhes
    const userMessage = process.env.NODE_ENV === 'production'
      ? 'Erro ao atualizar case. Tente novamente ou entre em contato com o suporte.'
      : `Erro ao atualizar case: ${errorMessage}`;
    
    return createErrorResponse(
      userMessage,
      undefined, // Nunca expor stack traces ou detalhes em produção
      500
    );
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function handleDeleteCase(request: NextRequest, { params }: { params: Promise<{ id: string }> }, _session: unknown) {
  const { id } = await params;
  
  try {
    // Verificar se o case existe
    const existingCase = await prisma.caseStudy.findUnique({
      where: { id },
    });
    
    if (!existingCase) {
      return createErrorResponse("Case não encontrado", null, 404);
    }
    
    // Excluir o case
    await prisma.caseStudy.delete({
      where: { id },
    });
    
    return createSuccessResponse(
      null,
      "Case excluído com sucesso"
    );
  } catch (error) {
    Logger.error("Erro ao excluir case", {
      endpoint: '/api/admin/cases/[id]',
      method: 'DELETE',
      caseId: id,
    }, error as Error);
    return createErrorResponse("Erro interno do servidor");
  }
}

export const GET = withAdminDynamic(handleGetCase);
export const PUT = withAdminDynamic(handleUpdateCase);
export const DELETE = withAdminDynamic(handleDeleteCase);

