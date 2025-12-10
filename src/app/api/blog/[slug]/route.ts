import { NextRequest, NextResponse } from "next/server";
import { fetchBlogPost, fetchBlogPosts } from "@/lib/cms";
import { Logger } from "@/lib/logger";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Buscar post por slug
    const post = await fetchBlogPost(slug);

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
    const { posts: relatedPostsData } = await fetchBlogPosts({
      category: post.category,
      published: true,
      limit: 3,
      sortBy: 'publishedAt',
      sortOrder: 'desc',
    });
    
    const relatedPosts = relatedPostsData
      .filter((p) => p.id !== post.id)
      .slice(0, 3);

    return NextResponse.json({
      ...post,
      relatedPosts,
    });
  } catch (error) {
    Logger.error("Erro ao buscar post", {
      endpoint: `/api/blog/${slug}`,
      method: 'GET',
    }, error as Error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

