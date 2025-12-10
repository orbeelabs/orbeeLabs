// Validações centralizadas para formulários
export const validationRules = {
  name: {
    required: 'Nome é obrigatório',
    minLength: {
      value: 2,
      message: 'Nome deve ter pelo menos 2 caracteres'
    }
  },
  
  email: {
    required: 'Email é obrigatório',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Email inválido'
    }
  },
  
  phone: {
    required: 'Telefone é obrigatório',
    pattern: {
      value: /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
      message: 'Formato de telefone inválido'
    }
  },
  
  company: {
    required: 'Empresa é obrigatória',
    minLength: {
      value: 2,
      message: 'Nome da empresa deve ter pelo menos 2 caracteres'
    }
  },
  
  website: {
    pattern: {
      value: /^https?:\/\/.+/,
      message: 'URL deve começar com http:// ou https://'
    }
  },
  
  message: {
    required: 'Mensagem é obrigatória',
    minLength: {
      value: 5,
      message: 'Mensagem deve ter pelo menos 5 caracteres'
    }
  }
};

// Função para formatar telefone
export const formatPhone = (value: string): string => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 11) {
    return numbers.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
  }
  return value;
};

// Opções para selects
export const selectOptions = {
  revenue: [
    { value: 'ate-10k', label: 'Até R$ 10mil' },
    { value: '10k-50k', label: 'R$ 10mil - R$ 50mil' },
    { value: '50k-100k', label: 'R$ 50mil - R$ 100mil' },
    { value: '100k-500k', label: 'R$ 100mil - R$ 500mil' },
    { value: '500k-mais', label: 'R$ 500mil+' }
  ],
  
  objective: [
    { value: 'mais-leads', label: 'Gerar mais leads qualificados' },
    { value: 'aumentar-vendas', label: 'Aumentar vendas online' },
    { value: 'visibilidade', label: 'Melhorar visibilidade no Google' },
    { value: 'site-novo', label: 'Criar/refazer website' },
    { value: 'competir', label: 'Superar concorrentes' },
    { value: 'outros', label: 'Outros objetivos' }
  ]
};

// Benefícios do formulário
export const formBenefits = [
  'Auditoria técnica do seu site',
  'Análise de concorrentes',
  'Oportunidades de crescimento',
  'Estratégia personalizada',
  'Estimativa de ROI'
];
