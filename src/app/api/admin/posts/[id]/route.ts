import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { 
  createErrorResponse, 
  createSuccessResponse,
  withAdmin,
  validateId
} from "@/lib/api";
import { Logger } from "@/lib/logger";
import { z } from "zod";

// Schema de validação para atualizar post
const updatePostSchema = z.object({
  slug: z.string().min(1).max(200).optional(),
  title: z.string().min(1).max(200).optional(),
  excerpt: z.string().max(500).optional().nullable(),
  content: z.string().min(1).optional(),
  author: z.string().min(1).max(100).optional(),
  authorImage: z.string().optional().nullable().refine((val) => !val || z.string().url().safeParse(val).success, {
    message: "Deve ser uma URL válida ou vazio"
  }),
  category: z.string().min(1).optional(),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
  publishedAt: z.string().datetime().optional().nullable(),
  seoTitle: z.string().max(60).optional().nullable(),
  seoDescription: z.string().max(160).optional().nullable(),
  ogImage: z.string().optional().nullable().refine((val) => !val || z.string().url().safeParse(val).success, {
    message: "Deve ser uma URL válida ou vazio"
  }),
});

async function handleGetPost(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });
    
    if (!post) {
      return createErrorResponse("Post não encontrado", null, 404);
    }
    
    return createSuccessResponse(post, "Post recuperado com sucesso");
  } catch (error) {
    Logger.error("Erro ao buscar post", {
      endpoint: '/api/admin/posts/[id]',
      method: 'GET',
      postId: id,
    }, error as Error);
    return createErrorResponse("Erro interno do servidor");
  }
}

async function handleUpdatePost(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  try {
    // Verificar se o post existe
    const existingPost = await prisma.post.findUnique({
      where: { id },
    });
    
    if (!existingPost) {
      return createErrorResponse("Post não encontrado", null, 404);
    }
    
    const body = await request.json();
    const validation = updatePostSchema.safeParse(body);
    
    if (!validation.success) {
      return createErrorResponse(
        "Dados inválidos",
        validation.error.errors,
        400
      );
    }
    
    const data = validation.data;
    
    // Se o slug foi alterado, verificar se já existe
    if (data.slug && data.slug !== existingPost.slug) {
      const slugExists = await prisma.post.findUnique({
        where: { slug: data.slug },
      });
      
      if (slugExists) {
        return createErrorResponse(
          "Já existe um post com este slug",
          null,
          409
        );
      }
    }
    
    // Atualizar o post
    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        ...data,
        publishedAt: data.publishedAt !== undefined 
          ? (data.publishedAt ? new Date(data.publishedAt) : null)
          : undefined,
      },
    });
    
    return createSuccessResponse(
      updatedPost,
      "Post atualizado com sucesso"
    );
  } catch (error) {
    Logger.error("Erro ao atualizar post", {
      endpoint: '/api/admin/posts/[id]',
      method: 'PUT',
      postId: id,
    }, error as Error);
    return createErrorResponse("Erro interno do servidor");
  }
}

async function handleDeletePost(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  try {
    // Verificar se o post existe
    const existingPost = await prisma.post.findUnique({
      where: { id },
    });
    
    if (!existingPost) {
      return createErrorResponse("Post não encontrado", null, 404);
    }
    
    // Excluir o post
    await prisma.post.delete({
      where: { id },
    });
    
    return createSuccessResponse(
      null,
      "Post excluído com sucesso"
    );
  } catch (error) {
    Logger.error("Erro ao excluir post", {
      endpoint: '/api/admin/posts/[id]',
      method: 'DELETE',
      postId: id,
    }, error as Error);
    return createErrorResponse("Erro interno do servidor");
  }
}

export const GET = withAdmin(handleGetPost);
export const PUT = withAdmin(handleUpdatePost);
export const DELETE = withAdmin(handleDeletePost);

