import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Hr,
  Row,
  Column,
} from '@react-email/components';
import * as React from 'react';

interface ContactTeamEmailProps {
  nome: string;
  email: string;
  telefone?: string;
  empresa?: string;
  mensagem: string;
}

export default function ContactTeamEmail({
  nome,
  email,
  telefone,
  empresa,
  mensagem,
}: ContactTeamEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={h1}>Novo contato recebido</Heading>
          </Section>

          <Section style={content}>
            <Row>
              <Column>
                <Text style={label}>Nome:</Text>
                <Text style={value}>{nome}</Text>
              </Column>
            </Row>

            <Row>
              <Column>
                <Text style={label}>Email:</Text>
                <Text style={value}>{email}</Text>
              </Column>
            </Row>

            {telefone && (
              <Row>
                <Column>
                  <Text style={label}>Telefone:</Text>
                  <Text style={value}>{telefone}</Text>
                </Column>
              </Row>
            )}

            {empresa && (
              <Row>
                <Column>
                  <Text style={label}>Empresa:</Text>
                  <Text style={value}>{empresa}</Text>
                </Column>
              </Row>
            )}

            <Row>
              <Column>
                <Text style={label}>Mensagem:</Text>
                <Section style={messageBox}>
                  <Text style={messageText}>{mensagem}</Text>
                </Section>
              </Column>
            </Row>
          </Section>

          <Hr style={hr} />

          <Section style={footer}>
            <Text style={footerText}>
              Enviado em {new Date().toLocaleString('pt-BR')}
            </Text>
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
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0',
};

const content = {
  backgroundColor: '#2a2a2a',
  padding: '20px',
  borderRadius: '8px',
  marginBottom: '20px',
};

const label = {
  color: '#9ca3af',
  fontSize: '14px',
  fontWeight: '600',
  margin: '0 0 5px 0',
};

const value = {
  color: '#ffffff',
  fontSize: '16px',
  margin: '0 0 15px 0',
};

const messageBox = {
  backgroundColor: '#1a1a1a',
  padding: '15px',
  borderRadius: '4px',
  marginTop: '10px',
};

const messageText = {
  color: '#e5e7eb',
  fontSize: '14px',
  lineHeight: '1.6',
  margin: '0',
  whiteSpace: 'pre-wrap',
};

const hr = {
  borderColor: '#374151',
  margin: '20px 0',
};

const footer = {
  textAlign: 'center' as const,
};

const footerText = {
  color: '#6b7280',
  fontSize: '12px',
  margin: '0',
};

