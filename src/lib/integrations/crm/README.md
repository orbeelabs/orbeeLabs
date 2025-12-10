# Integração com CRMs

Este módulo fornece integração com múltiplos CRMs: Pipedrive e RD Station.

**Nota:** HubSpot foi temporariamente desabilitado em Janeiro 2025. O código permanece no repositório mas está comentado e não será usado até nova decisão.

## Configuração

### Variáveis de Ambiente

Adicione as seguintes variáveis no arquivo `.env.local`:

#### Para Pipedrive:
```env
CRM_PROVIDER=pipedrive
PIPEDRIVE_API_TOKEN=seu_token_aqui
PIPEDRIVE_OWNER_ID=owner_id_opcional
```

#### Para RD Station:
```env
CRM_PROVIDER=rdstation
RDSTATION_PUBLIC_TOKEN=seu_public_token
RDSTATION_PRIVATE_TOKEN=seu_private_token
```

#### Para desabilitar CRM:
```env
CRM_PROVIDER=none
```

## Como Obter as Credenciais

### Pipedrive
1. Acesse https://app.pipedrive.com
2. Vá em Settings > Personal > API
3. Copie o API Token
4. (Opcional) Copie o Owner ID do seu usuário

### RD Station
1. Acesse https://app.rdstation.com.br
2. Vá em Configurações > Integrações > API
3. Crie uma nova aplicação
4. Copie o Public Token e Private Token

## Uso

A integração é automática. Quando um formulário é enviado:

1. **Formulário de Contato** (`/api/contato`): Envia para CRM automaticamente
2. **Auditoria SEO** (`/api/analyze-seo`): Envia para CRM se dados do formulário foram fornecidos
3. **Newsletter** (`/api/newsletter`): Envia para CRM opcionalmente

## Campos Mapeados

### Contato
- `name` → Nome completo
- `email` → Email
- `phone` → Telefone
- `company` → Empresa
- `website` → Website
- `message` → Mensagem
- `source` → Origem (website, seo-audit, newsletter)
- `tags` → Tags para categorização

### Campos Customizados (por CRM)

#### Pipedrive
- Campos customizados podem ser mapeados via `customFields`

#### RD Station
- Campos customizados via `cf_*` são suportados

## Tratamento de Erros

A integração com CRM **não bloqueia** o fluxo principal:
- Se o CRM falhar, o contato ainda é salvo no banco
- Se o CRM falhar, o email ainda é enviado
- Erros são logados mas não interrompem o processo

## Logs

Todos os eventos são logados via `logApiSuccess` e `logApiError`:
- Sucessos: `logApiSuccess('CRM', 'createContact', { contactId, crmContactId })`
- Erros: `logApiError(error, 'CRM', 'createContact', { email })`

