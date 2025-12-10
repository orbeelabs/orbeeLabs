# 🔐 Variáveis de Ambiente - Railway (FastAPI Backend)

## ✅ Variáveis OBRIGATÓRIAS

Essas variáveis **DEVEM** ser configuradas no Railway:

### 1. `FASTAPI_SECRET` ⚠️ **CRÍTICO**

**Descrição:** Secret para autenticação entre o Next.js (Vercel) e o FastAPI (Railway)

**Valor:** Use o mesmo valor que está no `.env.local` do Next.js

**Exemplo:**
```
FASTAPI_SECRET=b1kJK2TbGckXPruz/GgZSnsJ51m/qcjPn7B8VfhG6Xs=
```

**⚠️ IMPORTANTE:** 
- Deve ser **exatamente igual** ao valor configurado na Vercel
- Use um secret forte (pode gerar com: `openssl rand -base64 32`)

---

### 2. `NEXT_PUBLIC_APP_URL` ✅

**Descrição:** URL do frontend (Next.js na Vercel) para configurar CORS

**Valor para produção:**
```
NEXT_PUBLIC_APP_URL=https://orbeelabs.com
```

**Uso:** Permite que o frontend faça requisições para o backend (CORS)

---

## 🔧 Variáveis OPCIONAIS

Essas variáveis são **opcionais** e só precisam ser configuradas se você usar essas funcionalidades:

### 3. `OPENAI_API_KEY` (Opcional)

**Descrição:** Chave da API OpenAI para geração de conteúdo com IA

**Quando usar:** 
- ✅ Se você quiser usar o endpoint `/api/v1/generate-content` com IA real
- ❌ Se não configurar, o endpoint retorna templates pré-definidos (funciona, mas sem IA)

**Formato:**
```
OPENAI_API_KEY=sk-...
```

**Onde obter:** https://platform.openai.com/api-keys

---

## 🤖 Variáveis Automáticas do Railway

Essas variáveis são **definidas automaticamente** pelo Railway - **NÃO configure manualmente:**

- `PORT` - Porta onde o servidor deve rodar (Railway define automaticamente)

---

## 📋 Checklist de Configuração

### No Railway Dashboard:

1. ✅ Acesse o serviço `orbeeLabs`
2. ✅ Vá em **Settings** → **Variables**
3. ✅ Adicione as variáveis:

```
FASTAPI_SECRET=b1kJK2TbGckXPruz/GgZSnsJ51m/qcjPn7B8VfhG6Xs=
NEXT_PUBLIC_APP_URL=https://orbeelabs.com
```

4. ✅ (Opcional) Se usar geração de conteúdo com IA:
```
OPENAI_API_KEY=sk-...
```

5. ✅ Salve as alterações
6. ✅ O Railway fará um novo deploy automaticamente

---

## 🔗 Sincronização com Vercel

**IMPORTANTE:** O `FASTAPI_SECRET` deve ser **exatamente igual** em:

1. ✅ **Railway** (backend FastAPI)
2. ✅ **Vercel** (frontend Next.js)

Se os valores forem diferentes, as requisições do Next.js para o FastAPI serão rejeitadas com erro 401.

---

## 🧪 Teste após Configurar

Após configurar as variáveis e o deploy completar:

1. **Teste o health check:**
```bash
curl https://SUA-URL-RAILWAY/health
```

Deve retornar:
```json
{"status":"healthy","service":"orbee-labs-api"}
```

2. **Teste autenticação (do Next.js):**
O Next.js deve conseguir fazer requisições para o FastAPI usando o header:
```
X-API-Secret: <FASTAPI_SECRET>
```

---

## 📝 Resumo Rápido

### Mínimo necessário (funciona sem IA):
```
FASTAPI_SECRET=b1kJK2TbGckXPruz/GgZSnsJ51m/qcjPn7B8VfhG6Xs=
NEXT_PUBLIC_APP_URL=https://orbeelabs.com
```

### Completo (com geração de conteúdo IA):
```
FASTAPI_SECRET=b1kJK2TbGckXPruz/GgZSnsJ51m/qcjPn7B8VfhG6Xs=
NEXT_PUBLIC_APP_URL=https://orbeelabs.com
OPENAI_API_KEY=sk-...
```

---

**Última atualização:** Dezembro 2025

