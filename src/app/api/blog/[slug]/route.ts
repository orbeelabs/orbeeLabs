import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Buscar post por slug
    const post = await prisma.post.findUnique({
      where: { slug },
    });

    if (!post) {
      return NextResponse.json(
        { error: "Post não encontrado" },
        { status: 404 }
      );
    }

    // Verificar se está publicado
    if (!post.published) {
      return NextResponse.json(
        { error: "Post não publicado" },
        { status: 404 }
      );
    }

    // Buscar posts relacionados (mesma categoria, excluindo o atual)
    const relatedPosts = await prisma.post.findMany({
      where: {
        category: post.category,
        published: true,
        id: { not: post.id },
      },
      take: 3,
      orderBy: { publishedAt: 'desc' },
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        author: true,
        category: true,
        tags: true,
        featured: true,
        publishedAt: true,
        ogImage: true,
      },
    });

    return NextResponse.json({
      ...post,
      relatedPosts,
    });
  } catch (error) {
    console.error("Erro ao buscar post:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

