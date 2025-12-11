#!/bin/bash

# Script para limpar cache do projeto Next.js

echo "🧹 Limpando cache do projeto..."

# Parar servidor se estiver rodando
echo "1️⃣ Parando servidor Next.js..."
pkill -f "next dev" 2>/dev/null || echo "   ℹ️ Nenhum servidor rodando"

# Limpar cache do Next.js
echo "2️⃣ Removendo cache do Next.js (.next)..."
rm -rf .next
echo "   ✅ Cache do Next.js removido"

# Limpar cache do Turbopack
echo "3️⃣ Removendo cache do Turbopack..."
rm -rf .turbo
echo "   ✅ Cache do Turbopack removido"

# Limpar cache do node_modules
echo "4️⃣ Removendo cache do node_modules..."
rm -rf node_modules/.cache
echo "   ✅ Cache do node_modules removido"

# Limpar cache do Prisma (se houver)
echo "5️⃣ Removendo cache do Prisma..."
rm -rf prisma/migrations/.cache 2>/dev/null
echo "   ✅ Cache do Prisma removido (se existir)"

echo ""
echo "✅ Limpeza completa!"
echo ""
echo "💡 Próximos passos:"
echo "   1. Reinicie o servidor: npm run dev"
echo "   2. Limpe o cache do navegador (F12 → Application → Clear storage)"
echo "   3. Teste o login novamente"

