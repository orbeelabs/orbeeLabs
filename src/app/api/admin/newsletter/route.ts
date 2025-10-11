import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};

    if (status && status !== 'all') {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { name: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [subscribers, total] = await Promise.all([
      prisma.newsletterSubscriber.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.newsletterSubscriber.count({ where }),
    ]);

    return NextResponse.json({
      subscribers,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Erro ao buscar assinantes:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
