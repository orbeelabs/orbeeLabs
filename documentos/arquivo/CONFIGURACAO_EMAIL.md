# 📧 CONFIGURAÇÃO DE EMAIL - RESEND + GODADDY

## 🎯 **STATUS ATUAL**
- ✅ **Domínio:** Comprado na GoDaddy
- ✅ **Resend:** Conta criada
- ❌ **DNS:** Não configurado
- ❌ **Projeto:** Não integrado

---

## 📋 **PASSOS PARA CONFIGURAR**

### **1. CONFIGURAÇÃO NO RESEND**

#### **1.1 Acessar o Resend:**
1. Vá para [resend.com](https://resend.com)
2. Faça login na sua conta
3. Clique em **"Domains"** no menu lateral
4. Clique em **"Add Domain"**

#### **1.2 Adicionar Domínio:**
1. Digite seu domínio: `orbeelabs.com` (ou seu domínio)
2. Clique em **"Add"**
3. **COPIE** todos os registros DNS que aparecerem

#### **1.3 Registros DNS Necessários:**
```
Tipo: TXT
Nome: @
Valor: resend._domainkey.orbeelabs.com

Tipo: MX
Nome: @
Valor: feedback-smtp.us-east-1.amazonses.com
Prioridade: 10

Tipo: CNAME
Nome: resend
Valor: resend.com
```

---

### **2. CONFIGURAÇÃO NA GODADDY**

#### **2.1 Acessar DNS Management:**
1. Faça login na GoDaddy
2. Vá em **"My Products"**
3. Clique em **"DNS"** ao lado do seu domínio
4. Clique em **"Manage"**

#### **2.2 Adicionar Registros:**
1. Clique em **"Add"** para cada registro
2. **Cole exatamente** os valores do Resend
3. Salve cada registro
4. **Aguarde propagação** (5-30 minutos)

#### **2.3 Verificar Configuração:**
1. Volte ao Resend
2. Clique em **"Verify"** no seu domínio
3. Aguarde a verificação (pode demorar até 24h)

---

### **3. CONFIGURAÇÃO NO PROJETO**

#### **3.1 Instalar Dependências:**
```bash
npm install resend @react-email/components
```

#### **3.2 Variáveis de Ambiente:**
Adicione no arquivo `.env.local`:
```bash
# Email (Resend)
RESEND_API_KEY="re_xxxxxxxxx"
FROM_EMAIL="contato@orbeelabs.com"
TEAM_EMAIL="equipe@orbeelabs.com"
```

#### **3.3 Criar Serviço de Email:**
```typescript
// src/lib/email.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: `Orbee Labs <${process.env.FROM_EMAIL}>`,
      to,
      subject,
      html,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    throw error;
  }
}
```

#### **3.4 API Route para Contato:**
```typescript
// src/app/api/contato/route.ts
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Enviar email para a equipe
    await sendEmail({
      to: process.env.TEAM_EMAIL!,
      subject: `Novo contato: ${body.nome}`,
      html: `
        <h2>Novo contato recebido</h2>
        <p><strong>Nome:</strong> ${body.nome}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Telefone:</strong> ${body.telefone}</p>
        <p><strong>Empresa:</strong> ${body.empresa}</p>
        <p><strong>Mensagem:</strong> ${body.mensagem}</p>
      `,
    });

    // Enviar confirmação para o cliente
    await sendEmail({
      to: body.email,
      subject: "Contato recebido - Orbee Labs",
      html: `
        <h2>Olá ${body.nome}!</h2>
        <p>Recebemos seu contato e entraremos em contato em breve.</p>
        <p>Obrigado por escolher a Orbee Labs!</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao enviar email" },
      { status: 500 }
    );
  }
}
```

---

## 🧪 **TESTANDO A CONFIGURAÇÃO**

### **1. Teste Manual:**
```typescript
// Teste rápido no console
import { sendEmail } from "@/lib/email";

await sendEmail({
  to: "seu-email@gmail.com",
  subject: "Teste de configuração",
  html: "<h1>Email funcionando!</h1>",
});
```

### **2. Teste via Formulário:**
1. Preencha o formulário de contato
2. Verifique se recebeu o email
3. Verifique se a equipe recebeu a notificação

---

## ⚠️ **PROBLEMAS COMUNS**

### **1. Domínio não verificado:**
- **Causa:** DNS não propagou
- **Solução:** Aguardar até 24h

### **2. Email não enviado:**
- **Causa:** API Key incorreta
- **Solução:** Verificar `.env.local`

### **3. Spam:**
- **Causa:** Domínio novo
- **Solução:** Configurar SPF, DKIM, DMARC

---

## 🚀 **PRÓXIMOS PASSOS**

### **1. Configuração Avançada:**
- Templates de email profissionais
- Sistema de newsletter
- Automações de follow-up

### **2. Monitoramento:**
- Logs de envio
- Taxa de entrega
- Bounces e reclamações

### **3. Integração:**
- CRM (HubSpot, Pipedrive)
- Analytics (Google Analytics)
- Chat (Intercom, Zendesk)

---

## 📞 **SUPORTE**

**Resend:** [docs.resend.com](https://docs.resend.com)
**GoDaddy:** [help.godaddy.com](https://help.godaddy.com)

---

**Status:** Aguardando configuração DNS
**Próximo passo:** Configurar registros DNS na GoDaddy

