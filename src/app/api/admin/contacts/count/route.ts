import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { Logger } from "@/lib/logger";

export async function GET() {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const count = await prisma.contact.count();

    return NextResponse.json({ count });
  } catch (error) {
    Logger.error("Erro ao buscar contagem de contatos", {
      endpoint: '/api/admin/contacts/count',
      method: 'GET',
    }, error as Error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
