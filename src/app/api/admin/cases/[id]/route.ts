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
    const validation = updateCaseSchema.safeParse(body);
    
    if (!validation.success) {
      return createErrorResponse(
        "Dados inválidos",
        validation.error.issues,
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
    
    // Atualizar o case
    const updatedCase = await prisma.caseStudy.update({
      where: { id },
      data: {
        ...data,
        publishedAt: data.publishedAt !== undefined 
          ? new Date(data.publishedAt)
          : undefined,
      },
    });
    
    return createSuccessResponse(
      updatedCase,
      "Case atualizado com sucesso"
    );
  } catch (error) {
    Logger.error("Erro ao atualizar case", {
      endpoint: '/api/admin/cases/[id]',
      method: 'PUT',
      caseId: id,
    }, error as Error);
    return createErrorResponse("Erro interno do servidor");
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

