import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail({
  to,
  subject,
  html,
  from = `Orbee Labs <${process.env.FROM_EMAIL}>`,
}: SendEmailOptions) {
  if (!resend) {
    console.warn("Resend não configurado. Email não enviado.");
    return { id: "mock-email-id" };
  }

  try {
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      throw new Error(error.message);
    }

    console.log("Email sent successfully:", data);
    return data;
  } catch (error) {
    console.error("Failed to send email:", error);
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
  await sendEmail({
    to: process.env.TEAM_EMAIL!,
    subject: `Novo contato: ${nome}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Novo contato recebido</h2>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
          <p><strong>Nome:</strong> ${nome}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${telefone ? `<p><strong>Telefone:</strong> ${telefone}</p>` : ''}
          ${empresa ? `<p><strong>Empresa:</strong> ${empresa}</p>` : ''}
          <p><strong>Mensagem:</strong></p>
          <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
            ${mensagem.replace(/\n/g, '<br>')}
          </div>
        </div>
        <p style="margin-top: 20px; color: #666;">
          <small>Enviado em ${new Date().toLocaleString('pt-BR')}</small>
        </p>
      </div>
    `,
  });

  // Email de confirmação para o cliente
  await sendEmail({
    to: email,
    subject: "Contato recebido - Orbee Labs",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Olá ${nome}!</h2>
        <p>Recebemos seu contato e nossa equipe entrará em contato em breve.</p>
        
        <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #0369a1; margin-top: 0;">O que acontece agora?</h3>
          <ul style="color: #0369a1;">
            <li>Nossa equipe analisará sua mensagem</li>
            <li>Entraremos em contato em até 24 horas</li>
            <li>Agendaremos uma conversa para entender suas necessidades</li>
          </ul>
        </div>

        <p>Obrigado por escolher a Orbee Labs!</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 14px;">
            <strong>Orbee Labs</strong><br>
            Agência Digital<br>
            📧 ${process.env.FROM_EMAIL}
          </p>
        </div>
      </div>
    `,
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
  await sendEmail({
    to: email,
    subject: "Bem-vindo à Newsletter Orbee Labs!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Bem-vindo${nome ? `, ${nome}` : ''}!</h2>
        <p>Você foi inscrito com sucesso na nossa newsletter!</p>
        
        <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #0369a1; margin-top: 0;">O que você receberá:</h3>
          <ul style="color: #0369a1;">
            <li>Dicas de marketing digital</li>
            <li>Cases de sucesso</li>
            <li>Novidades da Orbee Labs</li>
            <li>Ofertas exclusivas</li>
          </ul>
        </div>

        <p>Fique ligado nas nossas próximas atualizações!</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 14px;">
            <strong>Orbee Labs</strong><br>
            Agência Digital<br>
            📧 ${process.env.FROM_EMAIL}
          </p>
        </div>
      </div>
    `,
  });
}
