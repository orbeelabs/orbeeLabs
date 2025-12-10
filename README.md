# 🚀 Orbee Labs 2.0 - Site Institucional

> **Sistema completo de marketing digital com painel administrativo moderno**

[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.17.1-2D3748?style=flat-square&logo=prisma)](https://prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

## 📋 Visão Geral

O **Orbee Labs 2.0** é um site institucional moderno e completo para uma agência de marketing digital, desenvolvido com as mais recentes tecnologias web. O projeto inclui um painel administrativo robusto, sistema de autenticação, banco de dados PostgreSQL e funcionalidades avançadas como calculadora de ROI e auditoria SEO.

### ✨ Principais Características

- 🎨 **Design Moderno**: Interface glass morphism com animações suaves
- 📱 **Totalmente Responsivo**: Funciona perfeitamente em todos os dispositivos
- 🔐 **Sistema de Autenticação**: NextAuth.js com proteção de rotas
- 📊 **Painel Administrativo**: Gestão completa de contatos, newsletter e auditorias
- 🗄️ **Banco de Dados**: PostgreSQL com Prisma ORM
- 📧 **Sistema de Email**: Integração com Resend para envio automático
- 🚀 **Performance**: Otimizado para velocidade e SEO
- 🛡️ **Segurança**: Score 100/100 - CSP, sanitização HTML, rate limiting, proteção XSS, LGPD compliance

## 🏗️ Arquitetura do Projeto

```
orbee-labs-2.0/
├── 📁 src/
│   ├── 📁 app/                    # App Router (Next.js 15)
│   │   ├── 📁 admin/             # Painel administrativo
│   │   ├── 📁 api/               # API Routes
│   │   └── 📄 pages/             # Páginas públicas
│   ├── 📁 components/            # Componentes React
│   │   ├── 📁 ui/                # Componentes de interface
│   │   └── 📁 forms/             # Formulários
│   ├── 📁 lib/                   # Utilitários e configurações
│   └── 📁 types/                 # Definições TypeScript
├── 📁 prisma/                    # Schema e migrações do banco
├── 📁 public/                    # Arquivos estáticos
└── 📁 documentos/                # Documentação do projeto
```

## 🚀 Início Rápido

### Pré-requisitos

- **Node.js** 18+ 
- **npm** ou **yarn**
- **PostgreSQL** (ou conta no Neon.tech)

### 1. Clone o Repositório

```bash
git clone https://github.com/seu-usuario/orbee-labs-2.0.git
cd orbee-labs-2.0
```

### 2. Instale as Dependências

```bash
npm install
# ou
yarn install
```

### 3. Configure as Variáveis de Ambiente

Copie o arquivo de exemplo e configure suas variáveis:

```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local` com suas configurações:

```env
# Banco de Dados
DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="sua-chave-secreta-aqui"
ADMIN_EMAIL="seu-email@orbeelabs.com"
ADMIN_PASSWORD="sua-senha-segura"

# Resend (para emails)
RESEND_API_KEY="re_sua_chave_resend"
FROM_EMAIL="contato@orbeelabs.com"
TEAM_EMAIL="equipe@orbeelabs.com"

# Google Analytics / Tag Manager (opcional)
NEXT_PUBLIC_GTM_ID="GTM-SEUCODIGO"

# Google Calendar (opcional)
GOOGLE_CLIENT_ID="seu-client-id"
GOOGLE_CLIENT_SECRET="seu-client-secret"
GOOGLE_CALENDAR_ID="seu-calendar-id"

# CRM (opcional - escolha um)
CRM_PROVIDER="pipedrive|rdstation|none"
# Nota: HubSpot temporariamente desabilitado (Janeiro 2025)
# Pipedrive
PIPEDRIVE_API_TOKEN="seu-token"
PIPEDRIVE_OWNER_ID="owner-id-opcional"
# RD Station
RDSTATION_PUBLIC_TOKEN="seu-public-token"
RDSTATION_PRIVATE_TOKEN="seu-private-token"
```

### 4. Configure o Banco de Dados

```bash
# Gerar o cliente Prisma
npx prisma generate

# Aplicar migrações e popular com dados iniciais
npx prisma db push --force-reset
npm run db:seed
```

### 5. Execute o Projeto

```bash
npm run dev
# ou
yarn dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🔐 Acesso ao Painel Administrativo

- **URL Local**: `http://localhost:3000/login`
- **URL Produção**: `https://orbeelabs.com/login`
- **Email**: `[CONFIGURAR NO .env.local]`
- **Senha**: `[CONFIGURAR NO .env.local]`

### Configuração das Credenciais

Configure as variáveis de ambiente no arquivo `.env.local`:

```env
ADMIN_EMAIL="seu-email@orbeelabs.com"
ADMIN_PASSWORD="sua-senha-segura"
```

## 📚 Funcionalidades Detalhadas

### 🌐 Páginas Públicas

#### Páginas Principais
- **Home** (`/`): Landing page com hero section, serviços e animações
- **Sobre** (`/sobre`): História e equipe da empresa
- **Contato** (`/contato`): Formulário de contato completo
- **Calculadora ROI** (`/calculadora-roi`): Simulador de ROI com múltiplos cenários e comparação
- **Calculadora ROI - Histórico** (`/calculadora-roi/historico`): Histórico de cálculos salvos (requer login)
- **Auditoria SEO** (`/auditoria-seo`): Ferramenta de análise SEO com exportação PDF
- **Portfolio** (`/portfolio`): Cases de sucesso
- **Blog** (`/blog`): Artigos e conteúdo educacional

#### Páginas de Serviços (9 páginas)
- **Serviços** (`/servicos`): Página principal de serviços
- **SEO Belo Horizonte** (`/servicos/seo-bh`): Serviço de SEO com metodologia "SEO Cabuloso"
- **Desenvolvimento Web BH** (`/servicos/desenvolvimento-web-bh`): Desenvolvimento web fullstack
- **Tráfego Pago BH** (`/servicos/trafego-pago-bh`): Gestão de campanhas pagas
- **Marketing Digital** (`/servicos/marketing`): Marketing digital estratégico
- **E-commerce** (`/servicos/ecommerce`): Lojas virtuais de alta performance
- **Landing Pages** (`/servicos/landing-pages`): Landing pages de alta conversão
- **Analytics** (`/servicos/analytics`): Analytics e business intelligence
- **Gestão de Redes Sociais** (`/servicos/gestao-redes-sociais`): Gestão completa de redes sociais
- **Consultoria** (`/servicos/consultoria-marketing-digital`): Consultoria em marketing digital

#### Páginas Institucionais (5 páginas)
- **Carreiras** (`/carreiras`): Oportunidades de trabalho e benefícios
- **Parceiros** (`/parceiros`): Programa de parcerias
- **Recursos** (`/recursos`): Biblioteca de e-books, templates e ferramentas
- **Webinars** (`/webinars`): Eventos online e gravações
- **Depoimentos** (`/depoimentos`): Social proof e cases de clientes

#### Páginas de Setores (3 páginas)
- **Saúde** (`/setores/saude`): Marketing digital para profissionais de saúde
- **Educação** (`/setores/educacao`): Marketing digital para instituições de ensino
- **Serviços Profissionais** (`/setores/servicos-profissionais`): Marketing para profissionais liberais

### ⚙️ Painel Administrativo

- **Dashboard** (`/admin`): Visão geral e estatísticas
- **Contatos** (`/admin/contacts`): Gestão completa de leads e contatos
- **Newsletter** (`/admin/newsletter`): Gestão de assinantes da newsletter
- **Auditorias** (`/admin/audits`): Histórico de análises SEO realizadas

### 🔌 APIs Disponíveis

#### APIs Públicas
- `POST /api/contato` - Envio de formulário de contato (com integração CRM)
- `POST /api/newsletter` - Inscrição na newsletter (com integração CRM)
- `POST /api/analyze-seo` - Análise SEO de URLs (com integração CRM)
- `POST /api/roi` - Salvar cálculo de ROI (com histórico para usuários logados)
- `GET /api/roi` - Buscar histórico de cálculos ROI (requer autenticação)
- `GET /api/blog` - Listar posts do blog
- `GET /api/blog/[slug]` - Buscar post específico
- `GET /api/portfolio` - Listar cases do portfolio
- `GET /api/portfolio/[slug]` - Buscar case específico
- `POST /api/inbound-email` - Processar emails recebidos via webhook

#### APIs Administrativas (requerem autenticação)
- `GET /api/admin/contacts` - Listar contatos
- `GET /api/admin/contacts/count` - Contar contatos
- `DELETE /api/admin/contacts/[id]` - Deletar contato
- `GET /api/admin/newsletter` - Listar assinantes
- `GET /api/admin/newsletter/count` - Contar assinantes
- `GET /api/admin/audits` - Listar auditorias
- `GET /api/admin/audits/count` - Contar auditorias
- `GET /api/admin/roi/count` - Contar cálculos ROI

### 🎨 Componentes UI Disponíveis

**Componentes Base:**
- Button, Input, Label, Textarea, Select
- Card, Badge, Avatar, Skeleton
- Dialog, Sheet, Popover, Tooltip
- Tabs, Accordion, Alert, Progress
- Table, Separator, Switch, Checkbox, Radio Group

**Componentes Avançados:**
- Breadcrumb (navegação hierárquica)
- Pagination (paginação de resultados)
- Hover Card (cards com hover)
- Scroll Area (área de scroll customizada)
- Alert Dialog (diálogos de confirmação)
- Collapsible (conteúdo expansível)
- Slider (controle deslizante)
- Calendar (seletor de datas)
- Form (formulários com react-hook-form)
- Drawer (painel lateral)
- Toggle / Toggle Group (botões toggle)

### 🔗 Integrações Externas

- **CRM**: Suporte para Pipedrive e RD Station (HubSpot temporariamente desabilitado)
- **Email**: Resend para emails transacionais
- **Templates Email**: React Email para templates profissionais
- **Google Calendar**: Agendamento de reuniões
- **Google Tag Manager**: Analytics e tracking
- **Google Search Console**: Integração via sitemap

### 📊 Funcionalidades Avançadas

- **Exportação PDF**: Auditorias SEO exportáveis em PDF
- **Compartilhamento Social**: Compartilhamento em múltiplas plataformas
- **Histórico de Cálculos**: Salvamento e histórico de cálculos ROI
- **Comparação de Cenários**: Comparação visual de múltiplos cenários ROI
- **Filtros e Busca**: Filtros avançados em recursos, webinars e depoimentos
- **SEO Otimizado**: Meta tags, Schema Markup, Sitemap dinâmico
- **Performance**: ParticleField otimizado com Canvas API

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Next.js 15.5.4** - Framework React com App Router
- **React 19.1.0** - Biblioteca de interface
- **TypeScript 5.7** - Tipagem estática
- **Tailwind CSS 3.4** - Framework CSS
- **Framer Motion** - Animações
- **Radix UI** - Componentes acessíveis

### Backend
- **Next.js API Routes** - API serverless
- **Prisma 6.17.1** - ORM para banco de dados
- **PostgreSQL** - Banco de dados relacional
- **NextAuth.js 5.0** - Autenticação
- **Zod** - Validação de schemas

### Serviços Externos
- **Resend** - Envio de emails transacionais
- **Neon.tech** - Banco PostgreSQL na nuvem
- **Vercel** - Deploy e hospedagem
- **Google Analytics / GTM** - Analytics e tracking
- **Pipedrive / RD Station** - Integração CRM (opcional) - HubSpot temporariamente desabilitado
- **Google Calendar API** - Agendamento de reuniões

## 📦 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Servidor de desenvolvimento

# Build e Deploy
npm run build        # Build de produção
npm run start        # Servidor de produção
npm run lint         # Verificação de código

# Banco de Dados
npm run db:seed      # Popular banco com dados iniciais
npm run db:studio   # Interface visual do banco
npm run db:reset    # Resetar banco e popular novamente
npx prisma generate  # Gerar cliente Prisma

# Testes
npm run test        # Executar todos os testes
npm run test:watch  # Executar testes em modo watch
npm run test:coverage # Executar testes com relatório de cobertura
npm run test:ci     # Executar testes em CI/CD
```

## 🚀 Deploy

### Deploy na Vercel (Recomendado)

1. **Conecte seu repositório** na [Vercel](https://vercel.com)
2. **Configure as variáveis de ambiente** no painel da Vercel
3. **Deploy automático** a cada push na branch main

### Variáveis de Ambiente para Produção

```env
DATABASE_URL="sua-url-postgresql-producao"
NEXTAUTH_URL="https://seu-dominio.com"
NEXTAUTH_SECRET="chave-secreta-forte"
RESEND_API_KEY="sua-chave-resend"
FROM_EMAIL="contato@seu-dominio.com"
TEAM_EMAIL="equipe@seu-dominio.com"
```

## 📊 Status do Projeto

| Funcionalidade | Status | Completude |
|----------------|--------|------------|
| Frontend | ✅ Completo | 100% |
| Backend | ✅ Completo | 100% |
| Banco de Dados | ✅ Completo | 100% |
| Autenticação | ✅ Completo | 100% |
| Painel Admin | ✅ Completo | 100% |
| Sistema de Email | ✅ Completo | 100% |
| Integração CRM | ✅ Completo | 100% |
| Páginas de Serviços | ✅ Completo | 100% (9 páginas) |
| Páginas Institucionais | ✅ Completo | 100% (5 páginas) |
| Componentes UI | ✅ Completo | 100% (30+ componentes) |
| Segurança | ✅ Completo | 100% (Score: 100/100) |
| Testes | ⚠️ Em Progresso | ~15% (54 testes passando) |
| Documentação | ✅ Completo | 100% |

**Progresso Geral: ~90% Pronto para Produção**

**Segurança: 100/100** 🟢 EXCELENTE - Todas as medidas críticas implementadas

### ✅ Funcionalidades Implementadas

- ✅ Sistema de testes com Jest e React Testing Library
- ✅ Exportação PDF de auditorias SEO
- ✅ Calculadora ROI com múltiplos cenários e comparação
- ✅ Histórico de cálculos ROI (com autenticação)
- ✅ Compartilhamento social avançado
- ✅ Integração CRM (Pipedrive, RD Station) - HubSpot temporariamente desabilitado
- ✅ Templates de email com React Email
- ✅ ParticleField otimizado com Canvas API
- ✅ 9 páginas de serviços completas
- ✅ 5 páginas institucionais completas
- ✅ 30+ componentes UI (shadcn/ui)
- ✅ Sitemap dinâmico completo
- ✅ SEO otimizado (Schema Markup, meta tags)
- ✅ **Segurança 100%**: Content Security Policy (CSP), sanitização HTML, rate limiting no login, Logger centralizado
- ✅ **LGPD Compliance**: Exportação, exclusão, correção de dados, retenção automática

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

Para suporte e dúvidas:

- **Email**: contato@orbeelabs.com
- **Website**: [orbeelabs.com](https://orbeelabs.com)
- **Documentação**: Veja a pasta `documentos/` para documentação detalhada

---

**Desenvolvido com ❤️ pela equipe Orbee Labs**

*Última atualização: Janeiro 2025*