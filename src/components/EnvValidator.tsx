/**
 * Componente para validar variáveis de ambiente no startup
 * Apenas executa em server-side
 */

'use server';

import { requireEnvVars } from '@/lib/env-validation';

export async function validateEnvironment() {
  try {
    requireEnvVars();
  } catch (error) {
    // Em produção, logar erro mas não quebrar a aplicação
    // O erro será visível nos logs do servidor
    console.error('❌ Erro crítico na validação de variáveis de ambiente:', error);
    throw error;
  }
}

