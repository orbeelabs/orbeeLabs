# 🔍 Diagnóstico Railway - Erro "uvicorn: command not found"

## ❌ Problema Atual

O erro `uvicorn: command not found` significa que o Railway **não instalou as dependências Python**.

---

## ✅ Checklist de Verificação

### 1. Root Directory está configurado? ⚠️ **CRÍTICO**

**Como verificar:**
1. No Railway Dashboard, vá em **Settings**
2. Procure **"Build & Deploy"** → **"Root Directory"**
3. Deve estar: `/backend`

**Se NÃO estiver configurado:**
- Configure como `/backend`
- Salve
- Faça um novo deploy

---

### 2. Build Logs mostram instalação de dependências?

**Como verificar:**
1. No Railway, vá em **"Build Logs"** (não Deploy Logs)
2. Procure por linhas como:
   ```
   Installing dependencies from requirements.txt
   Successfully installed fastapi uvicorn...
   ```

**Se NÃO aparecer:**
- O Railway não está encontrando o `requirements.txt`
- Verifique se o Root Directory está configurado

---

### 3. Arquivos estão no lugar certo?

Verifique se estes arquivos existem em `/backend`:
- ✅ `requirements.txt`
- ✅ `main.py`
- ✅ `Procfile`
- ✅ `nixpacks.toml`
- ✅ `runtime.txt`

---

## 🔧 Solução Passo a Passo

### Passo 1: Configurar Root Directory

1. **Railway Dashboard** → Serviço `orbeeLabs`
2. **Settings** → **Build & Deploy**
3. **Root Directory**: `/backend`
4. **Salvar**

### Passo 2: Verificar Build Logs

Após configurar, veja os **Build Logs** (não Deploy Logs). Deve aparecer:

```
Detected Python
Found requirements.txt
Installing dependencies...
Successfully installed fastapi==0.115.0 uvicorn[standard]==0.32.0 ...
```

### Passo 3: Se ainda não funcionar

Se mesmo com Root Directory configurado não funcionar:

1. **Forçar rebuild:**
   - Settings → Build & Deploy
   - Clique em **"Clear Build Cache"**
   - Faça um novo deploy

2. **Verificar se está usando Nixpacks:**
   - Build Logs devem mostrar "Using Nixpacks"
   - Se mostrar "Railpack", pode ser o problema

---

## 📸 O que me enviar para diagnóstico

Se ainda não funcionar, me envie:

1. **Screenshot dos Build Logs** (não Deploy Logs)
   - Deve mostrar se detectou Python
   - Deve mostrar se encontrou requirements.txt
   - Deve mostrar se instalou dependências

2. **Screenshot das Settings:**
   - Seção "Build & Deploy"
   - Mostrando o Root Directory configurado

3. **Screenshot das Variables:**
   - Para verificar se as variáveis estão corretas

---

## 🎯 Resumo Rápido

**O problema é:** Railway não está instalando dependências

**A causa mais provável é:** Root Directory não configurado como `/backend`

**A solução é:** Configurar Root Directory = `/backend` e fazer novo deploy

---

**Última atualização:** Dezembro 2025

