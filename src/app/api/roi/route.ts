import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import { Logger, logApiError } from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data, result, name } = body;

    if (!data || !result) {
      return NextResponse.json(
        { error: 'Dados de entrada e resultado são obrigatórios' },
        { status: 400 }
      );
    }

    // Obter sessão do usuário (opcional - permite cálculos anônimos)
    const session = await auth();
    const userId = session?.user?.id || null;

    // Persistir cálculo no banco de dados
    let roiId: string | null = null;
    try {
      const roiCalculation = await prisma.roiCalculation.create({
        data: {
          userId,
          name: name || null,
          data: JSON.stringify(data),
          result: JSON.stringify(result),
        },
      });
      roiId = roiCalculation.id;
      Logger.info('Cálculo ROI salvo no banco', {
        roiId,
        userId: userId || 'anônimo',
      });
    } catch (dbError) {
      // Não quebrar a API se a persistência falhar
      Logger.error('Erro ao salvar cálculo ROI no banco (continua funcionando)', {
        userId: userId || 'anônimo',
      }, dbError as Error);
    }

    // Retornar resultado com ID do cálculo (se foi salvo)
    return NextResponse.json({
      success: true,
      id: roiId,
      message: roiId ? 'Cálculo salvo com sucesso' : 'Cálculo realizado (não foi possível salvar)',
    });

  } catch (error) {
    logApiError(error as Error, '/api/roi', 'POST', { message: 'Erro ao processar cálculo ROI' });
    return NextResponse.json(
      { error: 'Erro ao processar cálculo ROI' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Obter sessão do usuário
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json(
        { error: 'É necessário estar logado para acessar o histórico' },
        { status: 401 }
      );
    }

    // Obter parâmetros de query
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    // Construir filtros
    const where: {
      userId: string;
      createdAt?: {
        gte?: Date;
        lte?: Date;
      };
    } = {
      userId,
    };

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) {
        where.createdAt.gte = new Date(startDate);
      }
      if (endDate) {
        where.createdAt.lte = new Date(endDate);
      }
    }

    // Buscar cálculos
    const [calculations, total] = await Promise.all([
      prisma.roiCalculation.findMany({
        where,
        orderBy: {
          createdAt: 'desc',
        },
        take: limit,
        skip: offset,
      }),
      prisma.roiCalculation.count({ where }),
    ]);

    // Parsear JSON dos cálculos
    const parsedCalculations = calculations.map((calc) => ({
      id: calc.id,
      name: calc.name,
      data: JSON.parse(calc.data),
      result: JSON.parse(calc.result),
      createdAt: calc.createdAt,
      updatedAt: calc.updatedAt,
    }));

    return NextResponse.json({
      success: true,
      data: parsedCalculations,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    });

  } catch (error) {
    logApiError(error as Error, '/api/roi', 'GET', { message: 'Erro ao buscar histórico ROI' });
    return NextResponse.json(
      { error: 'Erro ao buscar histórico de cálculos' },
      { status: 500 }
    );
  }
}

