#!/usr/bin/env node
/**
 * Script para verificar quais variáveis estão configuradas no .env.local
 * Compara com a lista completa de variáveis necessárias
 */

const fs = require('fs');
const path = require('path');

// Caminho do .env.local
const envPath = path.join(process.cwd(), '.env.local');

// Lista completa de variáveis necessárias
const variaveisNecessarias = {
  // Banco de Dados
  DATABASE_URL: { categoria: 'Banco de Dados', obrigatoria: true },
  
  // Autenticação
  NEXTAUTH_URL: { categoria: 'Autenticação', obrigatoria: true },
  NEXTAUTH_SECRET: { categoria: 'Autenticação', obrigatoria: true },
  ADMIN_EMAIL: { categoria: 'Autenticação', obrigatoria: true },
  ADMIN_PASSWORD: { categoria: 'Autenticação', obrigatoria: true },
  
  // Aplicação
  NEXT_PUBLIC_APP_URL: { categoria: 'Aplicação', obrigatoria: true },
  
  // Email
  RESEND_API_KEY: { categoria: 'Email', obrigatoria: true },
  FROM_EMAIL: { categoria: 'Email', obrigatoria: true },
  TEAM_EMAIL: { categoria: 'Email', obrigatoria: true },
  
  // Google Analytics
  NEXT_PUBLIC_GTM_ID: { categoria: 'Google Analytics', obrigatoria: false },
  
  // Google Calendar
  GOOGLE_CLIENT_ID: { categoria: 'Google Calendar', obrigatoria: false },
  GOOGLE_CLIENT_SECRET: { categoria: 'Google Calendar', obrigatoria: false },
  GOOGLE_REDIRECT_URI: { categoria: 'Google Calendar', obrigatoria: false },
  GOOGLE_CALENDAR_ID: { categoria: 'Google Calendar', obrigatoria: false },
  GOOGLE_PAGESPEED_API_KEY: { categoria: 'Google Calendar', obrigatoria: false },
  
  // CRM
  CRM_PROVIDER: { categoria: 'CRM', obrigatoria: false },
  PIPEDRIVE_API_TOKEN: { categoria: 'CRM', obrigatoria: false },
  PIPEDRIVE_OWNER_ID: { categoria: 'CRM', obrigatoria: false },
  RDSTATION_PUBLIC_TOKEN: { categoria: 'CRM', obrigatoria: false },
  RDSTATION_PRIVATE_TOKEN: { categoria: 'CRM', obrigatoria: false },
  
  // CMS
  REVALIDATE_SECRET: { categoria: 'CMS', obrigatoria: false },
  
  // FastAPI
  FASTAPI_URL: { categoria: 'FastAPI', obrigatoria: false },
  FASTAPI_SECRET: { categoria: 'FastAPI', obrigatoria: false },
  
  // Redis
  UPSTASH_REDIS_REST_URL: { categoria: 'Redis', obrigatoria: false },
  UPSTASH_REDIS_REST_TOKEN: { categoria: 'Redis', obrigatoria: false },
  
  // LGPD
  LGPD_CLEANUP_SECRET: { categoria: 'LGPD', obrigatoria: false },
};

// Função para ler e parsear .env.local
function lerEnvLocal() {
  if (!fs.existsSync(envPath)) {
    console.log('❌ Arquivo .env.local não encontrado!');
    return {};
  }
  
  const conteudo = fs.readFileSync(envPath, 'utf-8');
  const variaveis = {};
  
  conteudo.split('\n').forEach(linha => {
    linha = linha.trim();
    
    // Ignorar comentários e linhas vazias
    if (!linha || linha.startsWith('#')) {
      return;
    }
    
    // Parsear variável
    const match = linha.match(/^([A-Z_]+)=(.+)$/);
    if (match) {
      const [, nome, valor] = match;
      variaveis[nome] = valor.replace(/^["']|["']$/g, ''); // Remove aspas
    }
  });
  
  return variaveis;
}

// Função para verificar se valor está vazio ou placeholder
function valorValido(valor) {
  if (!valor) return false;
  const valorLower = valor.toLowerCase();
  return !valorLower.includes('coloque') && 
         !valorLower.includes('seu') && 
         !valorLower.includes('sua') &&
         !valorLower.includes('change-me') &&
         valor.trim().length > 0;
}

// Main
console.log('🔍 Verificando variáveis de ambiente...\n');

const variaveisConfiguradas = lerEnvLocal();

if (Object.keys(variaveisConfiguradas).length === 0) {
  console.log('⚠️  Nenhuma variável encontrada no .env.local\n');
  process.exit(1);
}

// Agrupar por categoria
const porCategoria = {};
Object.keys(variaveisNecessarias).forEach(variavel => {
  const info = variaveisNecessarias[variavel];
  if (!porCategoria[info.categoria]) {
    porCategoria[info.categoria] = [];
  }
  porCategoria[info.categoria].push({ nome: variavel, ...info });
});

// Verificar e exibir
let totalConfiguradas = 0;
let totalFaltando = 0;
let totalObrigatoriasFaltando = 0;

console.log('📊 STATUS DAS VARIÁVEIS:\n');

Object.keys(porCategoria).sort().forEach(categoria => {
  console.log(`\n📁 ${categoria}:`);
  console.log('─'.repeat(50));
  
  porCategoria[categoria].forEach(({ nome, obrigatoria }) => {
    const valor = variaveisConfiguradas[nome];
    const temValor = valor !== undefined;
    const valorEhValido = temValor && valorValido(valor);
    
    if (valorEhValido) {
      // Mascarar valores sensíveis
      const valorExibido = nome.includes('SECRET') || nome.includes('PASSWORD') || nome.includes('TOKEN') || nome.includes('KEY')
        ? '***' + valor.slice(-4)
        : valor.length > 50
        ? valor.substring(0, 47) + '...'
        : valor;
      
      console.log(`  ✅ ${nome.padEnd(35)} = ${valorExibido}`);
      totalConfiguradas++;
    } else if (temValor) {
      console.log(`  ⚠️  ${nome.padEnd(35)} = (valor inválido/placeholder)`);
      totalFaltando++;
      if (obrigatoria) totalObrigatoriasFaltando++;
    } else {
      const marcador = obrigatoria ? '❌' : '⚪';
      console.log(`  ${marcador} ${nome.padEnd(35)} = (não configurada)`);
      totalFaltando++;
      if (obrigatoria) totalObrigatoriasFaltando++;
    }
  });
});

// Resumo
console.log('\n' + '='.repeat(50));
console.log('📊 RESUMO:');
console.log('='.repeat(50));
console.log(`✅ Configuradas: ${totalConfiguradas}`);
console.log(`⚠️  Faltando: ${totalFaltando}`);
if (totalObrigatoriasFaltando > 0) {
  console.log(`❌ Obrigatórias faltando: ${totalObrigatoriasFaltando}`);
}
console.log('='.repeat(50));

// Variáveis extras (que não estão na lista)
const variaveisExtras = Object.keys(variaveisConfiguradas).filter(
  v => !variaveisNecessarias[v]
);

if (variaveisExtras.length > 0) {
  console.log('\n📌 Variáveis extras encontradas (não na lista padrão):');
  variaveisExtras.forEach(v => {
    console.log(`   • ${v}`);
  });
}

console.log('\n');

