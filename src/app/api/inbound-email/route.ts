import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const inboundEmail = await request.json();
    console.log('E-mail recebido via webhook:', inboundEmail);

    // Encaminhar para o email da equipe
    await sendEmail({
      to: process.env.TEAM_EMAIL!,
      subject: `Novo e-mail recebido: ${inboundEmail.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">E-mail recebido via webhook</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
            <p><strong>De:</strong> ${inboundEmail.from}</p>
            <p><strong>Para:</strong> ${inboundEmail.to}</p>
            <p><strong>Assunto:</strong> ${inboundEmail.subject}</p>
            <p><strong>Data:</strong> ${new Date(inboundEmail.date).toLocaleString('pt-BR')}</p>
            <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
              <h3>Conteúdo:</h3>
              <div>${inboundEmail.html || inboundEmail.text}</div>
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ 
      success: true, 
      message: 'E-mail inbound processado com sucesso!' 
    });
  } catch (error) {
    console.error('Erro ao processar e-mail inbound:', error);
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' }, 
      { status: 500 }
    );
  }
}

