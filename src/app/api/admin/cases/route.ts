import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { 
  createPaginatedResponse, 
  createErrorResponse, 
  createSuccessResponse,
  withAdmin,
  extractQueryParams,
  createSearchFilter,
  createOrderBy,
} from "@/lib/api";
import { Logger } from "@/lib/logger";
import { z } from "zod";

// Schema de validação para criar/atualizar case
const caseSchema = z.object({
  slug: z.string().min(1).max(200),
  title: z.string().min(1).max(200),
  description: z.string().min(1),
  clientName: z.string().max(100).optional().nullable(),
  industry: z.string().min(1),
  services: z.array(z.string()).default([]),
  technologies: z.array(z.string()).default([]),
  challenge: z.string().min(1),
  solution: z.string().min(1),
  results: z.string().min(1),
  duration: z.string().min(1),
  timeline: z.string().optional().nullable(),
  learnings: z.string().optional().nullable(),
  heroImage: z.string().optional().nullable().refine((val) => !val || z.string().url().safeParse(val).success, {
    message: "Deve ser uma URL válida ou vazio"
  }),
  gallery: z.array(z.string().refine((val) => !val || z.string().url().safeParse(val).success, {
    message: "Deve ser uma URL válida ou vazio"
  })).default([]),
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
  siteUrl: z.string().optional().nullable().refine((val) => !val || z.string().url().safeParse(val).success, {
    message: "Deve ser uma URL válida ou vazio"
  }),
  sitePreviewMobile: z.string().optional().nullable(),
  sitePreviewDesktop: z.string().optional().nullable(),
  sitePreviewGenerated: z.boolean().default(false),
  performanceMetrics: z.union([
    z.object({
      lcp: z.number().optional(),
      inp: z.number().optional(),
      cls: z.number().optional(),
      score: z.number().optional(),
    }),
    z.string(),
  ]).optional().nullable(),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  publishedAt: z.string().datetime().optional(),
});

async function handleGetCases(request: NextRequest) {
  try {
    const { page, limit, search, sortBy, sortOrder } = extractQueryParams(request);
    const { searchParams } = new URL(request.url);
    const industry = searchParams.get('industry');
    const published = searchParams.get('published');
    const featured = searchParams.get('featured');
    
    // Construir filtros
    const where: Record<string, unknown> = {};
    
    if (industry) {
      where.industry = industry;
    }
    
    if (published !== null) {
      where.published = published === 'true';
    }
    
    if (featured !== null) {
      where.featured = featured === 'true';
    }
    
    if (search) {
      Object.assign(where, createSearchFilter(search, ['title', 'description', 'challenge', 'solution']));
    }

    const [cases, total] = await Promise.all([
      prisma.caseStudy.findMany({
        where,
        orderBy: createOrderBy(sortBy, sortOrder),
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.caseStudy.count({ where }),
    ]);

    return createPaginatedResponse(
      cases,
      { page, limit, total },
      "Cases recuperados com sucesso"
    );
  } catch (error) {
    Logger.error("Erro ao buscar cases", {
      endpoint: '/api/admin/cases',
      method: 'GET',
    }, error as Error);
    return createErrorResponse("Erro interno do servidor");
  }
}

async function handleCreateCase(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = caseSchema.safeParse(body);
    
    if (!validation.success) {
      return createErrorResponse(
        "Dados inválidos",
        validation.error.issues,
        400
      );
    }
    
    const data = validation.data;
    
    // Verificar se o slug já existe
    const existingCase = await prisma.caseStudy.findUnique({
      where: { slug: data.slug },
    });
    
    if (existingCase) {
      return createErrorResponse(
        "Já existe um case com este slug",
        null,
        409
      );
    }
    
    // Preparar dados para criação
    const createData = {
      ...data,
      publishedAt: data.publishedAt ? new Date(data.publishedAt) : new Date(),
    };

    // Converter performanceMetrics para formato correto do Prisma
    if (data.performanceMetrics !== undefined && data.performanceMetrics !== null) {
      if (typeof data.performanceMetrics === 'string') {
        try {
          (createData as { performanceMetrics?: unknown }).performanceMetrics = JSON.parse(data.performanceMetrics);
        } catch {
          // Se não for JSON válido, manter como objeto vazio
          (createData as { performanceMetrics?: unknown }).performanceMetrics = {};
        }
      }
      // Se já é um objeto, não precisa fazer nada (já está no spread)
    }

    // Criar o case
    const caseStudy = await prisma.caseStudy.create({
      data: createData as Parameters<typeof prisma.caseStudy.create>[0]['data'],
    });
    
    return createSuccessResponse(
      caseStudy,
      "Case criado com sucesso",
      201
    );
  } catch (error) {
    Logger.error("Erro ao criar case", {
      endpoint: '/api/admin/cases',
      method: 'POST',
      errorType: error instanceof Error ? error.constructor.name : 'Unknown',
    }, error as Error);
    
    // Em produção, mensagem genérica. Em dev, mais detalhes
    const errorMessage = process.env.NODE_ENV === 'production'
      ? 'Erro interno do servidor. Tente novamente ou entre em contato com o suporte.'
      : 'Erro interno do servidor';
    return createErrorResponse(errorMessage);
  }
}

export const GET = withAdmin(handleGetCases);
export const POST = withAdmin(handleCreateCase);

