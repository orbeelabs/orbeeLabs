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
- 🛡️ **Segurança**: Validação de dados, rate limiting e proteção de rotas

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

# Resend (para emails)
RESEND_API_KEY="re_sua_chave_resend"

# Google Analytics (opcional)
NEXT_PUBLIC_GTM_ID="GTM-SEUCODIGO"

# Email de envio
FROM_EMAIL="contato@orbeelabs.com"
TEAM_EMAIL="equipe@orbeelabs.com"
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

- **URL**: `http://localhost:3000/login`
- **Email**: `admin@orbeelabs.com`
- **Senha**: `[CONFIGURAR NO .env.local]`

## 📚 Funcionalidades Detalhadas

### 🌐 Páginas Públicas

- **Home** (`/`): Landing page com hero section e serviços
- **Sobre** (`/sobre`): História e equipe da empresa
- **Serviços** (`/servicos`): Metodologia SEO Cabuloso
- **Portfolio** (`/portfolio`): Cases de sucesso
- **Contato** (`/contato`): Formulário de contato
- **Calculadora ROI** (`/calculadora-roi`): Simulador de ROI
- **Auditoria SEO** (`/auditoria-seo`): Ferramenta de análise

### ⚙️ Painel Administrativo

- **Dashboard** (`/admin`): Visão geral e estatísticas
- **Contatos** (`/admin/contacts`): Gestão de leads
- **Newsletter** (`/admin/newsletter`): Gestão de assinantes
- **Auditorias** (`/admin/audits`): Histórico de análises SEO

### 🔌 APIs Disponíveis

- `POST /api/contato` - Envio de formulário de contato
- `POST /api/newsletter` - Inscrição na newsletter
- `POST /api/analyze-seo` - Análise SEO de URLs
- `GET/POST/DELETE /api/admin/*` - Operações administrativas

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
- **Google Analytics** - Analytics (opcional)

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
npx prisma studio   # Interface visual do banco
npx prisma generate  # Gerar cliente Prisma
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
| Deploy | ✅ Completo | 100% |

**Total: 100% Completo e Pronto para Produção** 🎉

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