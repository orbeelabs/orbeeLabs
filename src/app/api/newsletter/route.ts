import { NextRequest, NextResponse } from "next/server";
import { sendNewsletterEmail } from "@/lib/email";
import { z } from "zod";

// Schema de validação
const newsletterSchema = z.object({
  email: z.string().email("Email inválido"),
  nome: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar dados
    const validated = newsletterSchema.parse(body);
    
    // Enviar email de boas-vindas
    await sendNewsletterEmail({
      email: validated.email,
      nome: validated.nome,
    });

    return NextResponse.json({ 
      success: true,
      message: "Inscrição realizada com sucesso!" 
    });

  } catch (error) {
    console.error("Erro na inscrição da newsletter:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false,
          error: "Email inválido",
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
