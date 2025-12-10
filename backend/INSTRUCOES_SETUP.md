# 🚀 Instruções de Setup - FastAPI Backend

## ✅ O Que Já Foi Configurado

- ✅ Secret gerado e adicionado ao `.env.local` do Next.js
- ✅ Secret adicionado ao `.env` do backend
- ✅ Variáveis de ambiente configuradas
- ✅ Script de setup criado

## 📋 Próximos Passos

### 1. Instalar Dependências

Execute o script de setup:

```bash
cd backend
./setup.sh
```

Ou manualmente:

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate  # Windows

pip install -r requirements.txt
```

### 2. Executar o Servidor

```bash
# Com o ambiente virtual ativado
uvicorn main:app --reload --port 8000
```

O servidor estará disponível em: `http://localhost:8000`

### 3. Testar a API

Acesse a documentação interativa:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### 4. Health Check

Teste se está funcionando:
```bash
curl http://localhost:8000/health
```

Deve retornar:
```json
{"status": "healthy", "service": "orbee-labs-api"}
```

## 🔑 Secrets Configurados

- **FASTAPI_SECRET**: `b1kJK2TbGckXPruz/GgZSnsJ51m/qcjPn7B8VfhG6Xs=`
- **FASTAPI_URL** (local): `http://localhost:8000`

## 📝 Notas

- O FastAPI é **opcional**. Se não executar, o Next.js processará tudo localmente.
- Para produção, você precisará fazer deploy do FastAPI (Vercel, Railway, Render, etc.)
- O secret deve ser o mesmo no Next.js e no FastAPI

## 🚀 Deploy em Produção

Quando estiver pronto para produção:

1. Faça deploy do backend FastAPI (Vercel, Railway, Render, etc.)
2. Atualize `FASTAPI_URL` no `.env.local` com a URL de produção
3. Configure o mesmo `FASTAPI_SECRET` no ambiente de produção

---

**Status:** ✅ Configurado e pronto para executar localmente

