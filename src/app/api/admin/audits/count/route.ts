import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const count = await prisma.seoAudit.count();

    return NextResponse.json({ count });
  } catch (error) {
    console.error("Erro ao buscar contagem de auditorias:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
