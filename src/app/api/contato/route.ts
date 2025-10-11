import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email";
import prisma from "@/lib/prisma";
import { z } from "zod";

// Schema de validação
const contactSchema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  telefone: z.string().optional(),
  empresa: z.string().optional(),
  mensagem: z.string().min(5, "Mensagem deve ter pelo menos 5 caracteres"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar dados
    const validated = contactSchema.parse(body);
    
    // Salvar no banco de dados
    const contact = await prisma.contact.create({
      data: {
        name: validated.nome,
        email: validated.email,
        phone: validated.telefone,
        company: validated.empresa,
        message: validated.mensagem,
        source: 'website',
        status: 'NEW',
      },
    });

    // Enviar emails
    await sendContactEmail({
      nome: validated.nome,
      email: validated.email,
      telefone: validated.telefone,
      empresa: validated.empresa,
      mensagem: validated.mensagem,
    });

    return NextResponse.json({ 
      success: true,
      message: "Contato salvo e email enviado com sucesso!",
      contactId: contact.id
    });

  } catch (error) {
    console.error("Erro no envio de contato:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false,
          error: "Dados inválidos",
          details: error.issues 
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        success: false,
        error: "Erro interno do servidor" 
      },
      { status: 500 }
    );
  }
}
