import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import { render } from '@react-email/render';
import InboundEmail from '@/emails/InboundEmail';
import { Logger } from '@/lib/logger';
import { maskEmail } from '@/lib/utils/mask-email';

export async function POST(request: NextRequest) {
  try {
    const inboundEmail = await request.json();
    // Mascarar email em logs (LGPD)
    Logger.info('E-mail recebido via webhook', {
      subject: inboundEmail.subject,
      from: maskEmail(inboundEmail.from),
      to: maskEmail(inboundEmail.to),
    });

    // Encaminhar para o email da equipe
    const inboundEmailHtml = await render(
      InboundEmail({
        from: inboundEmail.from,
        to: inboundEmail.to,
        subject: inboundEmail.subject,
        date: inboundEmail.date,
        content: inboundEmail.html || inboundEmail.text || '',
      })
    );

    await sendEmail({
      to: process.env.TEAM_EMAIL!,
      subject: `Novo e-mail recebido: ${inboundEmail.subject}`,
      html: inboundEmailHtml,
    });

    return NextResponse.json({ 
      success: true, 
      message: 'E-mail inbound processado com sucesso!' 
    });
  } catch (error) {
    Logger.error('Erro ao processar e-mail inbound', {
      endpoint: '/api/inbound-email',
      method: 'POST',
    }, error as Error);
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' }, 
      { status: 500 }
    );
  }
}

