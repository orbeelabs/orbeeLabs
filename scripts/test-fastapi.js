/**
 * Script para testar a integração com FastAPI
 */

require('dotenv').config({ path: '.env.local' });

let FASTAPI_URL = process.env.FASTAPI_URL || 'http://localhost:8000';
const FASTAPI_SECRET = process.env.FASTAPI_SECRET;

// Adicionar protocolo se não tiver
if (FASTAPI_URL && !FASTAPI_URL.startsWith('http://') && !FASTAPI_URL.startsWith('https://')) {
  FASTAPI_URL = `https://${FASTAPI_URL}`;
}

async function testFastAPI() {
  console.log('🧪 Testando FastAPI Backend...\n');
  console.log(`📍 URL: ${FASTAPI_URL}`);
  console.log(`🔑 Secret configurado: ${FASTAPI_SECRET ? '✅ Sim' : '❌ Não'}\n`);

  if (!FASTAPI_SECRET) {
    console.error('❌ ERRO: FASTAPI_SECRET não está configurado no .env.local');
    process.exit(1);
  }

  // Teste 1: Health Check (sem autenticação)
  console.log('1️⃣ Testando Health Check...');
  try {
    const healthResponse = await fetch(`${FASTAPI_URL}/health`);
    const healthData = await healthResponse.json();
    
    if (healthResponse.ok) {
      console.log('   ✅ Health Check OK:', healthData);
    } else {
      console.log('   ❌ Health Check falhou:', healthData);
    }
  } catch (error) {
    console.log('   ❌ Erro no Health Check:', error.message);
  }

  console.log('\n');

  // Teste 2: Endpoint protegido (com autenticação)
  console.log('2️⃣ Testando endpoint protegido (com autenticação)...');
  try {
    const protectedResponse = await fetch(`${FASTAPI_URL}/api/v1/analyze-seo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Secret': FASTAPI_SECRET,
      },
      body: JSON.stringify({
        url: 'https://orbeelabs.com',
        include_technical: true,
        include_content: true,
        include_performance: false,
      }),
    });

    if (protectedResponse.ok) {
      const data = await protectedResponse.json();
      console.log('   ✅ Endpoint protegido OK!');
      console.log('   📊 Resposta:', JSON.stringify(data, null, 2).substring(0, 200) + '...');
    } else {
      const error = await protectedResponse.json().catch(() => ({ detail: 'Erro desconhecido' }));
      console.log('   ❌ Endpoint protegido falhou:', error);
      console.log('   Status:', protectedResponse.status);
    }
  } catch (error) {
    console.log('   ❌ Erro no endpoint protegido:', error.message);
  }

  console.log('\n');

  // Teste 3: Endpoint sem autenticação (deve falhar)
  console.log('3️⃣ Testando endpoint sem autenticação (deve falhar)...');
  try {
    const noAuthResponse = await fetch(`${FASTAPI_URL}/api/v1/analyze-seo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: 'https://orbeelabs.com',
      }),
    });

    if (noAuthResponse.status === 403 || noAuthResponse.status === 401) {
      console.log('   ✅ Segurança OK! Endpoint bloqueou requisição sem autenticação');
    } else {
      console.log('   ⚠️ Atenção: Endpoint aceitou requisição sem autenticação');
      console.log('   Status:', noAuthResponse.status);
    }
  } catch (error) {
    console.log('   ❌ Erro no teste de segurança:', error.message);
  }

  console.log('\n');

  // Teste 4: Documentação
  console.log('4️⃣ Verificando documentação...');
  try {
    const docsResponse = await fetch(`${FASTAPI_URL}/docs`);
    if (docsResponse.ok) {
      console.log('   ✅ Documentação acessível:', `${FASTAPI_URL}/docs`);
    } else {
      console.log('   ⚠️ Documentação não acessível');
    }
  } catch (error) {
    console.log('   ⚠️ Erro ao acessar documentação:', error.message);
  }

  console.log('\n✅ Testes concluídos!\n');
}

testFastAPI().catch(console.error);

