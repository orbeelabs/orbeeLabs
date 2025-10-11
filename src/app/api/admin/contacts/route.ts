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
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [contacts, total] = await Promise.all([
      prisma.contact.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.contact.count({ where }),
    ]);

    return NextResponse.json({
      contacts,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Erro ao buscar contatos:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const contactId = searchParams.get('id');

    if (!contactId) {
      return NextResponse.json(
        { error: "ID do contato é obrigatório" },
        { status: 400 }
      );
    }

    // Verificar se o contato existe
    const existingContact = await prisma.contact.findUnique({
      where: { id: contactId },
    });

    if (!existingContact) {
      return NextResponse.json(
        { error: "Contato não encontrado" },
        { status: 404 }
      );
    }

    // Excluir o contato
    await prisma.contact.delete({
      where: { id: contactId },
    });

    return NextResponse.json({ 
      message: "Contato excluído com sucesso" 
    });
  } catch (error) {
    console.error("Erro ao excluir contato:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
