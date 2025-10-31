import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data, result } = body;

    if (!data || !result) {
      return NextResponse.json(
        { error: 'Dados de entrada e resultado são obrigatórios' },
        { status: 400 }
      );
    }

    // Persistir cálculo no banco de dados
    let roiId: string | null = null;
    try {
      const roiCalculation = await prisma.roiCalculation.create({
        data: {
          data: JSON.stringify(data),
          result: JSON.stringify(result),
        },
      });
      roiId = roiCalculation.id;
      console.log(`✅ Cálculo ROI salvo no banco: ${roiId}`);
    } catch (dbError) {
      // Não quebrar a API se a persistência falhar
      console.error('⚠️ Erro ao salvar cálculo ROI no banco (continua funcionando):', dbError);
    }

    // Retornar resultado com ID do cálculo (se foi salvo)
    return NextResponse.json({
      success: true,
      id: roiId,
      message: roiId ? 'Cálculo salvo com sucesso' : 'Cálculo realizado (não foi possível salvar)',
    });

  } catch (error) {
    console.error('Erro na API de ROI:', error);
    return NextResponse.json(
      { error: 'Erro ao processar cálculo ROI' },
      { status: 500 }
    );
  }
}

