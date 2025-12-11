/**
 * Validação de variáveis de ambiente críticas
 * Executa no startup da aplicação para garantir que todas as variáveis necessárias estão configuradas
 */

interface EnvVar {
  name: string;
  required: boolean;
  description: string;
  validate?: (value: string) => boolean;
}

const criticalEnvVars: EnvVar[] = [
  {
    name: 'DATABASE_URL',
    required: true,
    description: 'URL de conexão com o banco de dados',
    validate: (value) => value.startsWith('postgresql://') || value.startsWith('postgres://'),
  },
  {
    name: 'NEXTAUTH_SECRET',
    required: true,
    description: 'Secret para assinatura de tokens JWT do NextAuth',
    validate: (value) => value.length >= 32,
  },
  {
    name: 'NEXTAUTH_URL',
    required: true,
    description: 'URL base da aplicação',
  },
  {
    name: 'ADMIN_EMAIL',
    required: true,
    description: 'Email do administrador',
    validate: (value) => value.includes('@'),
  },
  {
    name: 'ADMIN_PASSWORD',
    required: true,
    description: 'Senha do administrador (hash)',
    validate: (value) => value.length >= 8,
  },
  {
    name: 'RESEND_API_KEY',
    required: true,
    description: 'API Key do Resend para envio de emails',
    validate: (value) => value.startsWith('re_'),
  },
  {
    name: 'FROM_EMAIL',
    required: true,
    description: 'Email remetente para envio de emails',
    validate: (value) => value.includes('@'),
  },
  {
    name: 'TEAM_EMAIL',
    required: true,
    description: 'Email da equipe para receber notificações',
    validate: (value) => value.includes('@'),
  },
];

const optionalEnvVars: EnvVar[] = [
  {
    name: 'NEXT_PUBLIC_APP_URL',
    required: false,
    description: 'URL pública da aplicação',
  },
  {
    name: 'NEXT_PUBLIC_GTM_ID',
    required: false,
    description: 'Google Tag Manager ID',
  },
  {
    name: 'GOOGLE_CLIENT_ID',
    required: false,
    description: 'Google OAuth Client ID',
  },
  {
    name: 'GOOGLE_CLIENT_SECRET',
    required: false,
    description: 'Google OAuth Client Secret',
  },
  {
    name: 'FASTAPI_SECRET',
    required: false,
    description: 'Secret para autenticação com FastAPI',
  },
  {
    name: 'FASTAPI_URL',
    required: false,
    description: 'URL do backend FastAPI',
  },
  {
    name: 'CRM_PROVIDER',
    required: false,
    description: 'Provedor de CRM (pipedrive, rdstation, none)',
  },
  {
    name: 'REVALIDATE_SECRET',
    required: false,
    description: 'Secret para revalidação de cache',
  },
];

export function validateEnvVars(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Validar variáveis críticas
  for (const envVar of criticalEnvVars) {
    const value = process.env[envVar.name];

    if (!value) {
      if (envVar.required) {
        errors.push(`❌ ${envVar.name} é obrigatória: ${envVar.description}`);
      }
      continue;
    }

    // Validar formato se houver validação customizada
    if (envVar.validate && !envVar.validate(value)) {
      errors.push(`⚠️ ${envVar.name} tem formato inválido: ${envVar.description}`);
    }
  }

  // Validar variáveis opcionais se estiverem configuradas
  for (const envVar of optionalEnvVars) {
    const value = process.env[envVar.name];

    if (value && envVar.validate && !envVar.validate(value)) {
      errors.push(`⚠️ ${envVar.name} tem formato inválido: ${envVar.description}`);
    }
  }

  // Validações específicas condicionais
  if (process.env.CRM_PROVIDER && process.env.CRM_PROVIDER !== 'none') {
    if (process.env.CRM_PROVIDER === 'pipedrive' && !process.env.PIPEDRIVE_API_TOKEN) {
      errors.push('⚠️ PIPEDRIVE_API_TOKEN é obrigatória quando CRM_PROVIDER=pipedrive');
    }
    if (process.env.CRM_PROVIDER === 'rdstation') {
      if (!process.env.RDSTATION_PUBLIC_TOKEN || !process.env.RDSTATION_PRIVATE_TOKEN) {
        errors.push('⚠️ RDSTATION_PUBLIC_TOKEN e RDSTATION_PRIVATE_TOKEN são obrigatórias quando CRM_PROVIDER=rdstation');
      }
    }
  }

  if (process.env.FASTAPI_URL && !process.env.FASTAPI_SECRET) {
    errors.push('⚠️ FASTAPI_SECRET é obrigatória quando FASTAPI_URL está configurada');
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return { valid: true, errors: [] };
}

/**
 * Valida variáveis de ambiente e lança erro se houver problemas críticos
 * Use no início da aplicação (app/layout.tsx ou middleware)
 */
export function requireEnvVars(): void {
  // Em desenvolvimento, apenas avisar
  if (process.env.NODE_ENV === 'development') {
    const { valid, errors } = validateEnvVars();
    if (!valid) {
      console.warn('⚠️ Variáveis de ambiente com problemas:');
      errors.forEach(error => console.warn(error));
      console.warn('A aplicação pode não funcionar corretamente.\n');
    }
    return;
  }

  // Em produção, lançar erro se houver problemas críticos
  const { valid, errors } = validateEnvVars();
  if (!valid) {
    const criticalErrors = errors.filter(e => e.startsWith('❌'));
    if (criticalErrors.length > 0) {
      throw new Error(
        `Variáveis de ambiente críticas não configuradas:\n${criticalErrors.join('\n')}`
      );
    }
  }
}

