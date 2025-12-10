import { Resend } from "resend";
import { render } from "@react-email/render";
import ContactTeamEmail from "@/emails/ContactTeamEmail";
import ContactConfirmationEmail from "@/emails/ContactConfirmationEmail";
import NewsletterWelcomeEmail from "@/emails/NewsletterWelcomeEmail";
import InboundEmail from "@/emails/InboundEmail";
import { maskEmail } from "@/lib/utils/mask-email";
import { Logger } from "@/lib/logger";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
  attachments?: Array<{
    filename: string;
    content: string;
    contentType?: string;
  }>;
}

export async function sendEmail({
  to,
  subject,
  html,
  from = `Orbee Labs <${process.env.FROM_EMAIL}>`,
  attachments,
}: SendEmailOptions) {
  if (!resend) {
    Logger.warn("Resend não configurado. Email não enviado.");
    return { id: "mock-email-id" };
  }

  try {
    const emailPayload: {
      from: string;
      to: string | string[];
      subject: string;
      html: string;
      attachments?: Array<{ filename: string; content: string | Buffer }>;
    } = {
      from,
      to,
      subject,
      html,
    };

    // Adicionar anexos se fornecidos
    if (attachments && attachments.length > 0) {
      emailPayload.attachments = attachments.map(att => ({
        filename: att.filename,
        content: Buffer.from(att.content).toString('base64'),
        type: att.contentType || 'application/json',
      }));
    }

    const { data, error } = await resend.emails.send(emailPayload);

    if (error) {
      Logger.error("Erro ao enviar email via Resend", {
        subject,
        to: Array.isArray(to) ? to.map(maskEmail).join(', ') : maskEmail(to),
      }, new Error(error.message));
      throw new Error(error.message);
    }

    // Mascarar email em logs (LGPD)
    const maskedTo = Array.isArray(to) 
      ? to.map(maskEmail).join(', ')
      : maskEmail(to);
    Logger.info("Email enviado com sucesso", {
      emailId: data?.id,
      subject,
      to: maskedTo,
    });
    return data;
  } catch (error) {
    Logger.error("Falha ao enviar email", {
      subject,
      to: Array.isArray(to) ? to.map(maskEmail).join(', ') : maskEmail(to),
    }, error as Error);
    throw error;
  }
}

// Função específica para contato
export async function sendContactEmail({
  nome,
  email,
  telefone,
  empresa,
  mensagem,
}: {
  nome: string;
  email: string;
  telefone?: string;
  empresa?: string;
  mensagem: string;
}) {
  // Email para a equipe
  const teamEmailHtml = await render(
    ContactTeamEmail({
      nome,
      email,
      telefone,
      empresa,
      mensagem,
    })
  );

  await sendEmail({
    to: process.env.TEAM_EMAIL!,
    subject: `Novo contato: ${nome}`,
    html: teamEmailHtml,
  });

  // Email de confirmação para o cliente
  const confirmationEmailHtml = await render(
    ContactConfirmationEmail({
      nome,
    })
  );

  await sendEmail({
    to: email,
    subject: "Contato recebido - Orbee Labs",
    html: confirmationEmailHtml,
  });
}

// Função para newsletter
export async function sendNewsletterEmail({
  email,
  nome,
}: {
  email: string;
  nome?: string;
}) {
  const newsletterEmailHtml = await render(
    NewsletterWelcomeEmail({
      nome: nome || undefined,
    })
  );

  await sendEmail({
    to: email,
    subject: "Bem-vindo à Newsletter Orbee Labs!",
    html: newsletterEmailHtml,
  });
}
