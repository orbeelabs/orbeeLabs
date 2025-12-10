# 🚂 Configuração Railway - FastAPI Backend

## ⚠️ IMPORTANTE: Configurar Root Directory

O Railway precisa saber que o código Python está na pasta `backend`, não na raiz do projeto.

### 📋 Passos para Configurar:

1. **Acesse o Railway Dashboard**
   - Vá para o serviço `orbeeLabs`
   - Clique na aba **"Settings"**

2. **Configure o Root Directory**
   - Procure pela seção **"Build & Deploy"**
   - Encontre o campo **"Root Directory"**
   - Defina como: `/backend`
   - Salve as alterações

3. **Verifique as Variáveis de Ambiente**
   - Na aba **"Variables"**, certifique-se de ter:
     - `FASTAPI_SECRET` - Secret para autenticação
     - `PORT` - Porta (geralmente definida automaticamente pelo Railway)
     - `NEXT_PUBLIC_APP_URL` - URL do frontend (ex: `https://orbeelabs.com`)
     - `OPENAI_API_KEY` - (opcional) Se usar geração de conteúdo

4. **Redeploy**
   - Após configurar o Root Directory, o Railway deve fazer um novo deploy automaticamente
   - Ou clique em **"Deploy"** manualmente

### ✅ O que deve acontecer no Build:

Após configurar o Root Directory, os **Build Logs** devem mostrar:

```
Detected Python
Found requirements.txt
Installing dependencies from requirements.txt
...
Successfully installed fastapi uvicorn[standard] ...
```

E os **Deploy Logs** devem mostrar:

```
Starting uvicorn main:app --host 0.0.0.0 --port $PORT
Application startup complete.
```

### 🔍 Verificação:

Após o deploy, teste o endpoint de health check:

```bash
curl https://SUA-URL-RAILWAY/health
```

Deve retornar:
```json
{"status":"ok"}
```

---

## 📁 Estrutura de Arquivos Necessários:

```
backend/
├── main.py              ✅ (já existe)
├── requirements.txt     ✅ (já existe)
├── Procfile            ✅ (já existe)
├── runtime.txt         ✅ (já existe)
├── nixpacks.toml       ✅ (criado)
└── services/           ✅ (já existe)
```

Todos os arquivos necessários já estão presentes! Só falta configurar o Root Directory no Railway.

