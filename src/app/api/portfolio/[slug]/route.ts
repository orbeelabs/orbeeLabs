import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Buscar case por slug
    const caseStudy = await prisma.caseStudy.findUnique({
      where: { slug },
    });

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
    const relatedCases = await prisma.caseStudy.findMany({
      where: {
        industry: caseStudy.industry,
        published: true,
        id: { not: caseStudy.id },
      },
      take: 3,
      orderBy: { publishedAt: 'desc' },
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        clientName: true,
        industry: true,
        services: true,
        technologies: true,
        duration: true,
        featured: true,
        publishedAt: true,
        heroImage: true,
      },
    });

    return NextResponse.json({
      ...caseStudy,
      relatedCases,
    });
  } catch (error) {
    console.error("Erro ao buscar case:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

