/**
 * Script para testar a sessão do NextAuth
 */

require('dotenv-flow').config({ path: './.env.local' });

const fetch = require('node-fetch');

const BASE_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

async function testSession() {
  console.log('🧪 Testando Sessão do NextAuth\n');
  console.log(`📍 URL Base: ${BASE_URL}`);
  console.log(`📧 Email: ${ADMIN_EMAIL}\n`);

  try {
    // 1. Fazer login
    console.log('1️⃣ Fazendo login...');
    const loginResponse = await fetch(`${BASE_URL}/api/auth/callback/credentials`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        redirect: 'false',
        json: 'true',
      }),
    });

    const loginData = await loginResponse.json();
    console.log('   Status:', loginResponse.status);
    console.log('   Resposta:', JSON.stringify(loginData, null, 2));

    // Pegar cookies da resposta
    const cookies = loginResponse.headers.get('set-cookie');
    console.log('\n2️⃣ Cookies recebidos:');
    if (cookies) {
      cookies.split(',').forEach(cookie => {
        console.log('   ', cookie.trim());
      });
    } else {
      console.log('   ⚠️ Nenhum cookie recebido!');
    }

    // 3. Testar sessão
    console.log('\n3️⃣ Testando sessão...');
    const sessionResponse = await fetch(`${BASE_URL}/api/auth/session`, {
      headers: {
        Cookie: cookies || '',
      },
    });

    const sessionData = await sessionResponse.json();
    console.log('   Status:', sessionResponse.status);
    console.log('   Sessão:', JSON.stringify(sessionData, null, 2));

    if (sessionData?.user) {
      console.log('\n✅ Sessão funcionando!');
      console.log('   Usuário:', sessionData.user.email);
      console.log('   Role:', sessionData.user.role);
    } else {
      console.log('\n❌ Sessão não encontrada!');
      console.log('   Possíveis causas:');
      console.log('   - NEXTAUTH_SECRET não configurado');
      console.log('   - NEXTAUTH_URL incorreto');
      console.log('   - Cookies não estão sendo definidos');
    }

  } catch (error) {
    console.error('\n❌ Erro no teste:', error.message);
  }
}

testSession();

