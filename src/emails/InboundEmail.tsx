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

interface InboundEmailProps {
  from: string;
  to: string;
  subject: string;
  date: string;
  content: string;
}

export default function InboundEmail({
  from,
  to,
  subject,
  date,
  content,
}: InboundEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={h1}>E-mail recebido via webhook</Heading>
          </Section>

          <Section style={contentSection}>
            <Row>
              <Column>
                <Text style={label}>De:</Text>
                <Text style={value}>{from}</Text>
              </Column>
            </Row>

            <Row>
              <Column>
                <Text style={label}>Para:</Text>
                <Text style={value}>{to}</Text>
              </Column>
            </Row>

            <Row>
              <Column>
                <Text style={label}>Assunto:</Text>
                <Text style={value}>{subject}</Text>
              </Column>
            </Row>

            <Row>
              <Column>
                <Text style={label}>Data:</Text>
                <Text style={value}>
                  {new Date(date).toLocaleString('pt-BR')}
                </Text>
              </Column>
            </Row>

            <Row>
              <Column>
                <Text style={label}>Conteúdo:</Text>
                <Section style={contentBox}>
                  <div
                    style={contentText}
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                </Section>
              </Column>
            </Row>
          </Section>

          <Hr style={hr} />
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

const contentSection = {
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

const contentBox = {
  backgroundColor: '#1a1a1a',
  padding: '15px',
  borderRadius: '4px',
  marginTop: '10px',
};

const contentText = {
  color: '#e5e7eb',
  fontSize: '14px',
  lineHeight: '1.6',
};

const hr = {
  borderColor: '#374151',
  margin: '20px 0',
};

