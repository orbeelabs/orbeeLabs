/**
 * Teste completo do FastAPI - Todos os endpoints
 */

require('dotenv').config({ path: '.env.local' });

let FASTAPI_URL = process.env.FASTAPI_URL || 'http://localhost:8000';
const FASTAPI_SECRET = process.env.FASTAPI_SECRET;

// Adicionar protocolo se não tiver
if (FASTAPI_URL && !FASTAPI_URL.startsWith('http://') && !FASTAPI_URL.startsWith('https://')) {
  FASTAPI_URL = `https://${FASTAPI_URL}`;
}

const headers = {
  'Content-Type': 'application/json',
  'X-API-Secret': FASTAPI_SECRET,
};

async function testEndpoint(name, endpoint, method = 'GET', body = null) {
  try {
    const options = {
      method,
      headers,
    };
    
    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${FASTAPI_URL}${endpoint}`, options);
    const data = await response.json().catch(() => ({ error: 'Resposta não é JSON' }));

    if (response.ok) {
      console.log(`   ✅ ${name}: OK`);
      if (data && typeof data === 'object' && Object.keys(data).length > 0) {
        const preview = JSON.stringify(data).substring(0, 150);
        console.log(`      📊 Resposta: ${preview}...`);
      }
      return true;
    } else {
      console.log(`   ❌ ${name}: Falhou (${response.status})`);
      console.log(`      Erro: ${data.detail || data.error || 'Desconhecido'}`);
      return false;
    }
  } catch (error) {
    console.log(`   ❌ ${name}: Erro - ${error.message}`);
    return false;
  }
}

async function runTests() {
  console.log('🧪 Teste Completo do FastAPI Backend\n');
  console.log(`📍 URL: ${FASTAPI_URL}\n`);

  if (!FASTAPI_SECRET) {
    console.error('❌ ERRO: FASTAPI_SECRET não configurado');
    process.exit(1);
  }

  const results = {
    passed: 0,
    failed: 0,
  };

  // Teste 1: Health Check
  console.log('1️⃣ Health Check');
  const healthOk = await testEndpoint('Health Check', '/health');
  if (healthOk) results.passed++; else results.failed++;

  console.log('\n');

  // Teste 2: Análise SEO
  console.log('2️⃣ Análise SEO');
  const seoOk = await testEndpoint(
    'Análise SEO',
    '/api/v1/analyze-seo',
    'POST',
    {
      url: 'https://orbeelabs.com',
      include_technical: true,
      include_content: true,
      include_performance: false,
    }
  );
  if (seoOk) results.passed++; else results.failed++;

  console.log('\n');

  // Teste 3: Cálculo ROI
  console.log('3️⃣ Cálculo ROI');
  const roiOk = await testEndpoint(
    'Cálculo ROI',
    '/api/v1/calculate-roi',
    'POST',
    {
      investimento_inicial: 10000,
      investimento_mensal: 2000,
      receita_mensal: 5000,
      periodo_meses: 12,
    }
  );
  if (roiOk) results.passed++; else results.failed++;

  console.log('\n');

  // Teste 4: Geração de Conteúdo (se OpenAI estiver configurado)
  console.log('4️⃣ Geração de Conteúdo');
  const contentOk = await testEndpoint(
    'Geração de Conteúdo',
    '/api/v1/generate-content',
    'POST',
    {
      topic: 'Marketing Digital',
      content_type: 'blog_post',
      tone: 'professional',
      length: 'short',
    }
  );
  if (contentOk) results.passed++; else results.failed++;

  console.log('\n');

  // Resumo
  console.log('📊 Resumo dos Testes');
  console.log(`   ✅ Passou: ${results.passed}`);
  console.log(`   ❌ Falhou: ${results.failed}`);
  console.log(`   📈 Taxa de sucesso: ${((results.passed / (results.passed + results.failed)) * 100).toFixed(1)}%`);

  console.log('\n');

  // Verificar documentação
  console.log('📚 Documentação');
  console.log(`   🔗 Swagger UI: ${FASTAPI_URL}/docs`);
  console.log(`   🔗 ReDoc: ${FASTAPI_URL}/redoc`);

  console.log('\n✅ Testes concluídos!\n');

  if (results.failed === 0) {
    console.log('🎉 Todos os testes passaram! FastAPI está funcionando perfeitamente!');
  } else {
    console.log('⚠️ Alguns testes falharam. Verifique os logs acima.');
  }
}

runTests().catch(console.error);

