# 🚀 FastAPI Backend - Orbee Labs

Backend separado para processamento pesado de análises SEO, cálculos ROI e geração de conteúdo.

---

## 📋 Pré-requisitos

- Python 3.9+
- pip ou poetry

---

## 🚀 Instalação

### **1. Criar ambiente virtual**

```bash
cd backend
python -m venv venv

# Ativar ambiente virtual
# Linux/Mac:
source venv/bin/activate

# Windows:
venv\Scripts\activate
```

### **2. Instalar dependências**

```bash
pip install -r requirements.txt
```

### **3. Configurar variáveis de ambiente**

Copie `.env.example` para `.env`:

```bash
cp .env.example .env
```

Edite `.env` e configure:

```env
FASTAPI_SECRET=seu-secret-super-seguro-aqui
PORT=8000
NEXT_PUBLIC_APP_URL=http://localhost:3000
OPENAI_API_KEY=sk-...  # Opcional
```

---

## 🏃 Executar

### **Desenvolvimento**

```bash
uvicorn main:app --reload --port 8000
```

### **Produção**

```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

A API estará disponível em: `http://localhost:8000`

Documentação interativa: `http://localhost:8000/docs`

---

## 📚 Endpoints

### **Health Check**

```
GET /health
```

### **Análise SEO**

```
POST /api/v1/analyze-seo
Headers: X-API-Secret: <FASTAPI_SECRET>
Body: {
  "url": "https://example.com",
  "include_technical": true,
  "include_content": true,
  "include_performance": true
}
```

### **Cálculo ROI**

```
POST /api/v1/calculate-roi
Headers: X-API-Secret: <FASTAPI_SECRET>
Body: {
  "investimento_inicial": 10000,
  "investimento_mensal": 2000,
  "receita_mensal": 5000,
  "custo_operacional": 1000,
  "periodo_meses": 12,
  "taxa_desconto": 0.1
}
```

### **Geração de Conteúdo**

```
POST /api/v1/generate-content
Headers: X-API-Secret: <FASTAPI_SECRET>
Body: {
  "topic": "SEO para E-commerce",
  "content_type": "blog_post",
  "tone": "professional",
  "length": "medium",
  "keywords": ["SEO", "E-commerce"],
  "target_audience": "Empreendedores"
}
```

---

## 🔗 Integração com Next.js

No arquivo `.env.local` do Next.js, adicione:

```env
FASTAPI_URL=http://localhost:8000
FASTAPI_SECRET=seu-secret-super-seguro-aqui
```

---

## 🐳 Docker (Opcional)

```dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

---

## 📝 Notas

- A API requer autenticação via header `X-API-Secret`
- OpenAI é opcional (fallback para templates se não configurado)
- CORS está configurado para permitir requisições do Next.js

---

**Última Atualização:** Janeiro 2025

