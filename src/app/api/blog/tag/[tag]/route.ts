import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import type { PostPreview } from '@/types/blog';
import { Logger } from '@/lib/logger';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ tag: string }> }
) {
  try {
    const { tag } = await params;
    const decodedTag = decodeURIComponent(tag);

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Buscar posts que contêm a tag
    const posts = await prisma.post.findMany({
      where: {
        tags: {
          has: decodedTag, // Verifica se o array contém a tag
        },
        published: true,
      },
      orderBy: {
        publishedAt: 'desc',
      },
      take: limit,
      skip: offset,
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        author: true,
        authorImage: true,
        category: true,
        tags: true,
        featured: true,
        publishedAt: true,
        ogImage: true,
      },
    });

    const total = await prisma.post.count({
      where: {
        tags: {
          has: decodedTag,
        },
        published: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: posts as PostPreview[],
      pagination: {
        total,
        limit,
        offset,
        totalPages: Math.ceil(total / limit),
        currentPage: Math.floor(offset / limit) + 1,
      },
    });
  } catch (error) {
    Logger.error('Erro ao buscar posts por tag', {
      endpoint: `/api/blog/tag/${params.tag}`,
      method: 'GET',
    }, error as Error);
    return NextResponse.json(
      { error: 'Erro ao buscar posts por tag' },
      { status: 500 }
    );
  }
}

