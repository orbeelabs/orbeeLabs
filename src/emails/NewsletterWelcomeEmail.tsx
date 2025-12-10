import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Hr,
  Link,
} from '@react-email/components';
import * as React from 'react';

interface NewsletterWelcomeEmailProps {
  nome?: string;
}

export default function NewsletterWelcomeEmail({
  nome,
}: NewsletterWelcomeEmailProps) {
  const fromEmail = process.env.FROM_EMAIL || 'contato@orbeelabs.com';

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={h1}>
              Bem-vindo{nome ? `, ${nome}` : ''}!
            </Heading>
          </Section>

          <Section style={content}>
            <Text style={paragraph}>
              Você foi inscrito com sucesso na nossa newsletter!
            </Text>

            <Section style={infoBox}>
              <Heading style={h2}>O que você receberá:</Heading>
              <ul style={list}>
                <li style={listItem}>Dicas de marketing digital</li>
                <li style={listItem}>Cases de sucesso</li>
                <li style={listItem}>Novidades da Orbee Labs</li>
                <li style={listItem}>Ofertas exclusivas</li>
              </ul>
            </Section>

            <Text style={paragraph}>
              Fique ligado nas nossas próximas atualizações!
            </Text>
          </Section>

          <Hr style={hr} />

          <Section style={footer}>
            <Text style={footerTitle}>Orbee Labs</Text>
            <Text style={footerText}>Agência Digital</Text>
            <Link href={`mailto:${fromEmail}`} style={footerLink}>
              📧 {fromEmail}
            </Link>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#0a0a0a',
  fontFamily: '-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,\'Helvetica Neue\',Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#1a1a1a',
  margin: '0 auto',
  padding: '20px',
  maxWidth: '600px',
  borderRadius: '8px',
};

const header = {
  marginBottom: '20px',
};

const h1 = {
  color: '#fdb714',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '0',
};

const content = {
  marginBottom: '20px',
};

const paragraph = {
  color: '#e5e7eb',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 20px 0',
};

const infoBox = {
  backgroundColor: '#1e3a5f',
  padding: '20px',
  borderRadius: '8px',
  margin: '20px 0',
};

const h2 = {
  color: '#60a5fa',
  fontSize: '20px',
  fontWeight: '600',
  margin: '0 0 15px 0',
};

const list = {
  color: '#e5e7eb',
  fontSize: '16px',
  lineHeight: '1.8',
  margin: '0',
  paddingLeft: '20px',
};

const listItem = {
  margin: '0 0 10px 0',
};

const hr = {
  borderColor: '#374151',
  margin: '30px 0',
};

const footer = {
  textAlign: 'center' as const,
  paddingTop: '20px',
};

const footerTitle = {
  color: '#fdb714',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 5px 0',
};

const footerText = {
  color: '#9ca3af',
  fontSize: '14px',
  margin: '0 0 5px 0',
};

const footerLink = {
  color: '#60a5fa',
  fontSize: '14px',
  textDecoration: 'none',
};

