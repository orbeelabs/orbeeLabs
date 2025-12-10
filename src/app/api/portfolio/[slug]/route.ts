import { NextRequest, NextResponse } from "next/server";
import { fetchPortfolioCase, fetchPortfolioCases } from "@/lib/cms";
import { Logger } from "@/lib/logger";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  let slug: string | undefined;
  try {
    const resolvedParams = await params;
    slug = resolvedParams.slug;

    // Buscar case por slug
    const caseStudy = await fetchPortfolioCase(slug);

    if (!caseStudy) {
      return NextResponse.json(
        { error: "Case não encontrado" },
        { status: 404 }
      );
    }

    // Verificar se está publicado
    if (!caseStudy.published) {
      return NextResponse.json(
        { error: "Case não publicado" },
        { status: 404 }
      );
    }

    // Buscar cases relacionados (mesma indústria, excluindo o atual)
    const { cases: relatedCasesData } = await fetchPortfolioCases({
      industry: caseStudy.industry,
      published: true,
      limit: 3,
      sortBy: 'publishedAt',
      sortOrder: 'desc',
    });
    
    const relatedCases = relatedCasesData
      .filter((c) => c.id !== caseStudy.id)
      .slice(0, 3)
      .map((c) => ({
        id: c.id,
        slug: c.slug,
        title: c.title,
        description: c.description,
        clientName: c.clientName,
        industry: c.industry,
        services: c.services,
        technologies: c.technologies,
        duration: c.duration,
        featured: c.featured,
        publishedAt: c.publishedAt,
        heroImage: c.heroImage,
      }));

    return NextResponse.json({
      ...caseStudy,
      relatedCases,
    });
  } catch (error) {
    Logger.error("Erro ao buscar case", {
      endpoint: `/api/portfolio/${slug || 'unknown'}`,
      method: 'GET',
    }, error as Error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

