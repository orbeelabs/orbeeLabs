# ⚙️ CONFIGURAÇÃO - ORBEE LABS 2.0
## Guia Completo de Setup e Configuração

**Projeto:** Orbee Labs 2.0  
**Última Atualização:** 10 de dezembro de 2024  
**Status:** 🟡 **PARCIALMENTE CONFIGURADO** (Email OK, Banco não existe)

---

## 🚀 INÍCIO RÁPIDO

### 1. Configurar Variáveis de Ambiente
Crie o arquivo `.env.local` na raiz do projeto:

```bash
# Banco de Dados PostgreSQL (Neon) - OBRIGATÓRIO
DATABASE_URL="postgresql://neondb_owner:npg_K4mAJnIvEQ0j@ep-snowy-frost-adu9nzem-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

# Email (OBRIGATÓRIO - Configure com suas chaves reais)
RESEND_API_KEY=re_1234567890abcdef
FROM_EMAIL=contato@orbeelabs.com
TEAM_EMAIL=equipe@orbeelabs.com

# Autenticação (OPCIONAL)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-minimum-32-characters

# Google APIs (OPCIONAL)
GOOGLE_PAGESPEED_API_KEY=your-google-pagespeed-api-key
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
GOOGLE_TAG_MANAGER_ID=GTM-XXXXXXX

# Segurança (OPCIONAL)
CORS_ORIGIN=http://localhost:3000

# Rate Limiting (OPCIONAL)
UPSTASH_REDIS_REST_URL=your-upstash-redis-url
UPSTASH_REDIS_REST_TOKEN=your-upstash-redis-token
```

### 2. Instalar e Configurar
```bash
# Instalar dependências
npm install

# Configurar banco de dados
npx prisma generate
npx prisma db push

# Popular banco com dados iniciais
npm run db:seed

# Executar projeto
npm run dev
```

### 3. Acessar o Projeto
- **Site:** http://localhost:3000
- **Dashboard Admin:** http://localhost:3000/dashboard
- **Prisma Studio:** `npx prisma studio`

---

## 📧 CONFIGURAÇÃO DE EMAIL (RESEND)

### Passo a Passo Completo

#### 1. Criar Conta no Resend
1. Acesse [resend.com](https://resend.com)
2. Crie uma conta gratuita
3. Verifique seu email

#### 2. Configurar Domínio
1. No dashboard do Resend, vá em **"Domains"**
2. Clique em **"Add Domain"**
3. Digite seu domínio: `orbeelabs.com`
4. **COPIE** todos os registros DNS que aparecerem

#### 3. Configurar DNS na GoDaddy
1. Faça login na GoDaddy
2. Vá em **"My Products"** → **"DNS"**
3. Clique em **"Manage"** ao lado do seu domínio
4. Adicione os registros DNS do Resend:
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
5. Aguarde propagação (5-30 minutos)

#### 4. Verificar Domínio
1. Volte ao Resend
2. Clique em **"Verify"** no seu domínio
3. Aguarde verificação (até 24h)

#### 5. Obter API Key
1. No Resend, vá em **"API Keys"**
2. Clique em **"Create API Key"**
3. Copie a chave gerada
4. Cole no arquivo `.env.local` em `RESEND_API_KEY`

### Teste de Configuração
```bash
# Testar envio de email
npm run dev
# Acesse: http://localhost:3000/contato
# Preencha o formulário e verifique se recebeu os emails
```

---

## 🗄️ CONFIGURAÇÃO DO BANCO DE DADOS

### Banco PostgreSQL (Neon)
O banco já está configurado e funcionando:

**String de Conexão:**
```
postgresql://neondb_owner:npg_K4mAJnIvEQ0j@ep-snowy-frost-adu9nzem-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

### Comandos Prisma
```bash
# Gerar cliente Prisma
npx prisma generate

# Aplicar mudanças no banco
npx prisma db push

# Abrir interface gráfica
npx prisma studio

# Resetar banco (desenvolvimento)
npx prisma migrate reset

# Popular com dados iniciais
npm run db:seed
```

### Estrutura do Banco
O banco possui 15 tabelas principais:
- **users** - Usuários do sistema
- **accounts** - Contas de autenticação
- **sessions** - Sessões de usuário
- **posts** - Posts do blog
- **categories** - Categorias
- **tags** - Tags
- **contacts** - Contatos recebidos
- **newsletter** - Assinantes newsletter
- **seo_data** - Dados SEO
- **projects** - Projetos do portfólio
- **services** - Serviços oferecidos
- **testimonials** - Depoimentos
- **seo_audits** - Auditorias SEO realizadas
- **roi_calculations** - Cálculos de ROI

---

## 🔐 CONFIGURAÇÃO DE AUTENTICAÇÃO

### NextAuth.js
O sistema de autenticação está configurado com:

- **Login por email/senha**
- **Login com Google OAuth**
- **Proteção de rotas**
- **Sessões persistentes**

### Configuração Google OAuth (Opcional)
1. Acesse [Google Cloud Console](https://console.cloud.google.com)
2. Crie um novo projeto ou selecione existente
3. Ative a API "Google+ API"
4. Vá em **"Credenciais"** → **"Criar credenciais"** → **"ID do cliente OAuth"**
5. Configure:
   - **Tipo:** Aplicação web
   - **Origens JavaScript autorizadas:** `http://localhost:3000`
   - **URIs de redirecionamento autorizados:** `http://localhost:3000/api/auth/callback/google`
6. Copie o Client ID e Client Secret
7. Adicione no `.env.local`:
   ```bash
   GOOGLE_CLIENT_ID=seu-client-id
   GOOGLE_CLIENT_SECRET=seu-client-secret
   ```

### Páginas de Autenticação
- **Login:** `/auth/signin`
- **Cadastro:** `/auth/signup`
- **Dashboard:** `/dashboard` (protegido)

---

## 📊 CONFIGURAÇÃO DE ANALYTICS

### Google Analytics 4 (Opcional)
1. Acesse [Google Analytics](https://analytics.google.com)
2. Crie uma propriedade GA4
3. Copie o Measurement ID (formato: G-XXXXXXXXXX)
4. Adicione no `.env.local`:
   ```bash
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

### Google Tag Manager (Opcional)
1. Acesse [Google Tag Manager](https://tagmanager.google.com)
2. Crie um container
3. Copie o Container ID (formato: GTM-XXXXXXX)
4. Adicione no `.env.local`:
   ```bash
   NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
   ```

---

## 🛡️ CONFIGURAÇÃO DE SEGURANÇA

### Rate Limiting (Opcional)
Para implementar rate limiting com Upstash Redis:

1. Acesse [Upstash](https://upstash.com)
2. Crie uma conta gratuita
3. Crie um banco Redis
4. Copie a URL e Token
5. Adicione no `.env.local`:
   ```bash
   UPSTASH_REDIS_REST_URL=sua-url-redis
   UPSTASH_REDIS_REST_TOKEN=seu-token-redis
   ```

### Variáveis de Segurança
```bash
# Secret para NextAuth (obrigatório)
NEXTAUTH_SECRET=seu-secret-super-seguro-minimo-32-caracteres

# CORS (opcional)
CORS_ORIGIN=http://localhost:3000
```

---

## 🚀 DEPLOY EM PRODUÇÃO

### Vercel (Recomendado)
1. Instale a CLI do Vercel:
   ```bash
   npm i -g vercel
   ```

2. Faça login:
   ```bash
   vercel login
   ```

3. Configure o projeto:
   ```bash
   vercel
   ```

4. Configure as variáveis de ambiente no dashboard do Vercel

5. Deploy:
   ```bash
   vercel --prod
   ```

### Variáveis de Ambiente para Produção
```bash
# Banco de dados (já configurado)
DATABASE_URL=sua-string-de-conexao-neon

# Email (obrigatório)
RESEND_API_KEY=sua-chave-resend
FROM_EMAIL=contato@orbeelabs.com
TEAM_EMAIL=equipe@orbeelabs.com

# Autenticação
NEXTAUTH_URL=https://orbeelabs.com
NEXTAUTH_SECRET=seu-secret-super-seguro

# Analytics (opcional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

---

## 🧪 TESTES E VALIDAÇÃO

### Teste de Funcionalidades
1. **Formulário de Contato:**
   - Acesse `/contato`
   - Preencha e envie
   - Verifique se recebeu os emails

2. **Newsletter:**
   - Inscreva-se na newsletter
   - Verifique email de confirmação

3. **Auditoria SEO:**
   - Acesse `/auditoria-seo`
   - Digite uma URL
   - Verifique se a análise funciona

4. **Calculadora ROI:**
   - Acesse `/calculadora-roi`
   - Preencha os dados
   - Verifique os cálculos

5. **Autenticação:**
   - Acesse `/auth/signin`
   - Faça login
   - Verifique acesso ao dashboard

### Comandos de Teste
```bash
# Executar testes
npm test

# Verificar linting
npm run lint

# Build de produção
npm run build

# Verificar performance
npm run lighthouse
```

---

## ⚠️ PROBLEMAS COMUNS E SOLUÇÕES

### Email não envia
- **Causa:** API Key incorreta ou domínio não verificado
- **Solução:** Verificar configuração do Resend e DNS

### Banco de dados não conecta
- **Causa:** String de conexão incorreta
- **Solução:** Verificar DATABASE_URL no .env.local

### Autenticação não funciona
- **Causa:** NEXTAUTH_SECRET não configurado
- **Solução:** Gerar secret forte de 32+ caracteres

### Build falha
- **Causa:** Variáveis de ambiente faltando
- **Solução:** Verificar se todas as variáveis obrigatórias estão configuradas

### Performance lenta
- **Causa:** Sem cache ou otimizações
- **Solução:** Implementar Redis e otimizações de imagem

---

## 📞 SUPORTE

### Documentação Oficial
- **Next.js:** [nextjs.org/docs](https://nextjs.org/docs)
- **Prisma:** [prisma.io/docs](https://prisma.io/docs)
- **Resend:** [resend.com/docs](https://resend.com/docs)
- **NextAuth:** [next-auth.js.org](https://next-auth.js.org)

### Comandos Úteis
```bash
# Ver logs do banco
npx prisma studio

# Resetar banco
npx prisma migrate reset

# Gerar novo cliente Prisma
npx prisma generate

# Verificar status do banco
npx prisma db status

# Backup do banco
npx prisma db pull
```

---

**Documento criado em:** 10 de dezembro de 2024  
**Status:** Pronto para uso  
**Próximo passo:** Configurar variáveis de ambiente e executar o projeto
