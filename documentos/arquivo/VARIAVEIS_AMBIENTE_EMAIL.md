# 📧 CONFIGURAÇÃO DE EMAIL - VARIÁVEIS DE AMBIENTE

# Copie este arquivo para .env.local e configure com seus dados reais

# ===========================================
# EMAIL (RESEND)
# ===========================================

# API Key do Resend (obtenha em: https://resend.com/api-keys)
RESEND_API_KEY="re_xxxxxxxxx"

# Email de envio (deve ser do domínio verificado)
FROM_EMAIL="contato@orbeelabs.com"

# Email da equipe (para receber notificações)
TEAM_EMAIL="equipe@orbeelabs.com"

# ===========================================
# OUTRAS CONFIGURAÇÕES (OPCIONAIS)
# ===========================================

# Next.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="seu-secret-super-seguro-aqui"

# Google APIs (opcional)
GOOGLE_PAGESPEED_API_KEY=""

# Analytics (opcional)
NEXT_PUBLIC_GA_ID=""
NEXT_PUBLIC_GTM_ID=""

# ===========================================
# INSTRUÇÕES DE CONFIGURAÇÃO
# ===========================================

# 1. Acesse https://resend.com
# 2. Crie uma conta ou faça login
# 3. Vá em "API Keys" e crie uma nova chave
# 4. Copie a chave e cole em RESEND_API_KEY
# 5. Configure seu domínio no Resend
# 6. Adicione os registros DNS na GoDaddy
# 7. Aguarde a verificação do domínio
# 8. Teste o envio de emails

# ===========================================
# TESTE DE CONFIGURAÇÃO
# ===========================================

# Para testar se está funcionando:
# 1. Execute: npm run dev
# 2. Acesse: http://localhost:3000/contato
# 3. Preencha o formulário
# 4. Verifique se recebeu os emails

# ===========================================
# PROBLEMAS COMUNS
# ===========================================

# ❌ "Invalid API key"
# ✅ Verifique se RESEND_API_KEY está correto

# ❌ "Domain not verified"
# ✅ Configure os registros DNS na GoDaddy

# ❌ "Email not sent"
# ✅ Verifique se FROM_EMAIL é do domínio verificado

# ❌ "Rate limit exceeded"
# ✅ Aguarde ou aumente o limite no Resend

