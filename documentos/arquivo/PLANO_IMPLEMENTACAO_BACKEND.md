# 🏗️ PLANO DE IMPLEMENTAÇÃO - BACKEND ORBEE LABS 2.0
## Guia Completo para Criar o Backend do Zero

**Projeto:** Orbee Labs 2.0 - Backend Implementation  
**Data:** 04 de outubro de 2025  
**Status:** 🔴 Backend não existe - precisa ser criado do zero  
**Prioridade:** CRÍTICA

---

## 📋 ÍNDICE

1. [Visão Geral da Arquitetura](#visão-geral)
2. [Stack Tecnológica Recomendada](#stack)
3. [Estrutura de Pastas](#estrutura)
4. [Database Schema](#database)
5. [API Routes Detalhadas](#api-routes)
6. [Autenticação e Autorização](#auth)
7. [Integrações Externas](#integracoes)
8. [Segurança](#seguranca)
9. [Deployment](#deployment)
10. [Cronograma](#cronograma)

---

## 🎯 VISÃO GERAL DA ARQUITETURA {#visão-geral}

### Arquitetura Atual vs. Proposta

#### ❌ ATUAL (Problemática):
```
Frontend (Next.js)
    ↓
  Nada! (dados mockados no frontend)
```

#### ✅ PROPOSTA (Solução):
```
Frontend (Next.js)
    ↓
API Routes (Next.js)
    ↓
Business Logic Layer
    ↓
Database (PostgreSQL)
    ↓
External APIs (Google, SendGrid, etc)
```

---

## 🛠️ STACK TECNOLÓGICA RECOMENDADA {#stack}

### Core Backend

```typescript
// package.json - Adicionar dependências
{
  "dependencies": {
    // Database & ORM
    "@prisma/client": "^5.7.0",
    "prisma": "^5.7.0",
    
    // Authentication
    "next-auth": "^4.24.5",
    "bcryptjs": "^2.4.3",
    
    // Validation
    "zod": "^4.1.11", // ✅ já instalado
    
    // Email
    "resend": "^2.1.0",
    "@react-email/components": "^0.0.14",
    
    // File Upload
    "@vercel/blob": "^0.16.1",
    
    // Rate Limiting
    "@upstash/ratelimit": "^1.0.0",
    "@upstash/redis": "^1.26.0",
    
    // Analytics
    "@vercel/analytics": "^1.1.1",
    
    // Error Tracking
    "@sentry/nextjs": "^7.91.0",
    
    // API Client
    "axios": "^1.12.2", // ✅ já instalado
    
    // Utils
    "date-fns": "^4.1.0", // ✅ já instalado
    "slugify": "^1.6.6",
    "nanoid": "^5.0.4"
  },
  "devDependencies": {
    // Prisma
    "prisma": "^5.7.0",
    
    // Types
    "@types/bcryptjs": "^2.4.6",
    
    // Testing
    "vitest": "^1.1.0",
    "@testing-library/react": "^16.3.0" // ✅ já instalado
  }
}
```

### Por que essa stack?

**Prisma:**
- ✅ TypeScript first
- ✅ Migrations automáticas
- ✅ Type-safe queries
- ✅ Prisma Studio (GUI)

**NextAuth.js:**
- ✅ Integração perfeita com Next.js
- ✅ Suporte OAuth
- ✅ Session management
- ✅ CSRF protection

**Resend:**
- ✅ API moderna
- ✅ Templates React
- ✅ Delivery garantido
- ✅ Analytics

**Vercel:**
- ✅ Deploy automático
- ✅ Edge functions
- ✅ Postgres integrado
- ✅ Blob storage

---

## 📁 ESTRUTURA DE PASTAS {#estrutura}

### Estrutura Completa Proposta:

```
orbee-labs-2.0/
├── prisma/
│   ├── schema.prisma          ⭐ CRIAR
│   ├── migrations/            ⭐ CRIAR
│   └── seed.ts                ⭐ CRIAR
│
├── src/
│   ├── app/
│   │   ├── api/               ⚠️ EXPANDIR
│   │   │   ├── auth/          ⭐ CRIAR
│   │   │   │   ├── [...nextauth]/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── register/route.ts
│   │   │   │   └── reset-password/route.ts
│   │   │   │
│   │   │   ├── leads/         ⭐ CRIAR
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/route.ts
│   │   │   │
│   │   │   ├── contact/       ⭐ CRIAR
│   │   │   │   └── route.ts
│   │   │   │
│   │   │   ├── auditoria/     ⭐ CRIAR
│   │   │   │   ├── route.ts
│   │   │   │   ├── [id]/route.ts
│   │   │   │   └── [id]/pdf/route.ts
│   │   │   │
│   │   │   ├── roi/           ⭐ CRIAR
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/route.ts
│   │   │   │
│   │   │   ├── portfolio/     ⭐ CRIAR
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/route.ts
│   │   │   │
│   │   │   ├── blog/          ⭐ CRIAR
│   │   │   │   ├── route.ts
│   │   │   │   └── [slug]/route.ts
│   │   │   │
│   │   │   ├── newsletter/    ⭐ CRIAR
│   │   │   │   ├── subscribe/route.ts
│   │   │   │   └── unsubscribe/route.ts
│   │   │   │
│   │   │   ├── webhook/       ⭐ CRIAR
│   │   │   │   ├── stripe/route.ts
│   │   │   │   └── hubspot/route.ts
│   │   │   │
│   │   │   └── admin/         ⭐ CRIAR
│   │   │       ├── leads/route.ts
│   │   │       ├── analytics/route.ts
│   │   │       └── settings/route.ts
│   │   │
│   │   └── admin/             ⭐ CRIAR
│   │       ├── layout.tsx
│   │       ├── dashboard/page.tsx
│   │       ├── leads/page.tsx
│   │       └── ...
│   │
│   ├── lib/
│   │   ├── prisma.ts          ⭐ CRIAR
│   │   ├── auth.ts            ⭐ CRIAR
│   │   ├── email.ts           ⭐ CRIAR
│   │   ├── validations/       ⭐ CRIAR
│   │   │   ├── lead.ts
│   │   │   ├── contact.ts
│   │   │   └── user.ts
│   │   ├── services/          ⭐ CRIAR
│   │   │   ├── seo-analyzer.ts ✅ (melhorar)
│   │   │   ├── roi-calculator.ts
│   │   │   ├── email-service.ts
│   │   │   └── storage-service.ts
│   │   └── utils/
│   │       ├── rate-limit.ts  ⭐ CRIAR
│   │       ├── errors.ts      ⭐ CRIAR
│   │       └── helpers.ts     ⭐ CRIAR
│   │
│   ├── middleware.ts          ⭐ CRIAR
│   └── types/
│       ├── api.ts             ⭐ CRIAR
│       ├── database.ts        ⭐ CRIAR
│       └── services.ts        ⭐ CRIAR
│
├── emails/                    ⭐ CRIAR
│   ├── templates/
│   │   ├── welcome.tsx
│   │   ├── contact-confirmation.tsx
│   │   ├── auditoria-report.tsx
│   │   └── newsletter.tsx
│   └── index.ts
│
├── .env.local                 ⚠️ CONFIGURAR
├── .env.example               ⭐ CRIAR
└── docker-compose.yml         ⭐ CRIAR (opcional)
```

---

## 🗄️ DATABASE SCHEMA {#database}

### Prisma Schema Completo

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ========================================
// AUTENTICAÇÃO E USUÁRIOS
// ========================================

model User {
  id            String    @id @default(cuid())
  name          String
  email         String    @unique
  emailVerified DateTime?
  image         String?
  password      String?
  role          UserRole  @default(USER)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  // Relações
  accounts      Account[]
  sessions      Session[]
  posts         Post[]
  
  @@map("users")
}

enum UserRole {
  USER
  ADMIN
  EDITOR
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@map("accounts")
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("sessions")
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
  @@map("verification_tokens")
}

// ========================================
// LEADS E CONTATOS
// ========================================

model Lead {
  id           String       @id @default(cuid())
  name         String
  email        String
  phone        String?
  company      String?
  website      String?
  revenue      String?
  objective    String?
  challenge    String?      @db.Text
  source       String?      // origem do lead (website, landing page, etc)
  status       LeadStatus   @default(NEW)
  score        Int?         // lead scoring
  
  createdAt    DateTime     @default(now())
  updatedAt    DateTime     @updatedAt
  
  // Relações
  auditorias   AuditoriaSEO[]
  calculosRoi  CalculoROI[]
  notes        LeadNote[]
  
  @@index([email])
  @@index([status])
  @@index([createdAt])
  @@map("leads")
}

enum LeadStatus {
  NEW
  CONTACTED
  QUALIFIED
  PROPOSAL_SENT
  NEGOTIATING
  WON
  LOST
  ARCHIVED
}

model LeadNote {
  id        String   @id @default(cuid())
  leadId    String
  content   String   @db.Text
  createdBy String?
  createdAt DateTime @default(now())
  
  lead      Lead     @relation(fields: [leadId], references: [id], onDelete: Cascade)
  
  @@index([leadId])
  @@map("lead_notes")
}

// ========================================
// AUDITORIA SEO
// ========================================

model AuditoriaSEO {
  id                String   @id @default(cuid())
  leadId            String?
  url               String
  score             Int
  resultadoCompleto Json     // todo o resultado da análise
  
  // Métricas principais (desnormalizadas para facilitar queries)
  titleLength       Int?
  descriptionLength Int?
  h1Count           Int?
  imagesTotal       Int?
  imagesWithoutAlt  Int?
  wordCount         Int?
  isHttps           Boolean?
  
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  lead              Lead?    @relation(fields: [leadId], references: [id])
  
  @@index([leadId])
  @@index([url])
  @@index([createdAt])
  @@map("auditorias_seo")
}

// ========================================
// CALCULADORA ROI
// ========================================

model CalculoROI {
  id                  String   @id @default(cuid())
  leadId              String?
  
  // Inputs
  investimentoInicial Float
  investimentoMensal  Float
  tempoInvestimento   Int
  receitaMensal       Float
  crescimentoMensal   Float
  custoPorLead        Float?
  conversao           Float?
  
  // Outputs
  roi                 Float
  payback             Float
  lucroTotal          Float
  receitaTotal        Float
  
  resultadoCompleto   Json     // dados dos gráficos, projeções, etc
  
  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt
  
  lead                Lead?    @relation(fields: [leadId], references: [id])
  
  @@index([leadId])
  @@index([createdAt])
  @@map("calculos_roi")
}

// ========================================
// PORTFOLIO
// ========================================

model Projeto {
  id           String   @id @default(cuid())
  titulo       String
  slug         String   @unique
  descricao    String   @db.Text
  categoria    String
  industria    String
  
  challenge    String   @db.Text
  solution     String   @db.Text
  duration     String
  
  resultados   String[] // array de strings
  servicos     String[] // array de strings
  tecnologias  String[] // array de strings
  
  imageUrl     String?
  siteUrl      String?
  
  destaque     Boolean  @default(false)
  ativo        Boolean  @default(true)
  ordem        Int      @default(0)
  
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  
  @@index([slug])
  @@index([categoria])
  @@index([ativo])
  @@map("projetos")
}

// ========================================
// BLOG
// ========================================

model Post {
  id          String     @id @default(cuid())
  titulo      String
  slug        String     @unique
  conteudo    String     @db.Text
  resumo      String?    @db.Text
  imagemCapa  String?
  
  autorId     String
  categoriaId String?
  
  status      PostStatus @default(DRAFT)
  destaque    Boolean    @default(false)
  
  views       Int        @default(0)
  
  publishedAt DateTime?
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
  
  autor       User       @relation(fields: [autorId], references: [id])
  categoria   Categoria? @relation(fields: [categoriaId], references: [id])
  tags        Tag[]      @relation("PostToTag")
  
  @@index([slug])
  @@index([status])
  @@index([publishedAt])
  @@map("posts")
}

enum PostStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}

model Categoria {
  id          String   @id @default(cuid())
  nome        String   @unique
  slug        String   @unique
  descricao   String?  @db.Text
  
  posts       Post[]
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@map("categorias")
}

model Tag {
  id          String   @id @default(cuid())
  nome        String   @unique
  slug        String   @unique
  
  posts       Post[]   @relation("PostToTag")
  
  createdAt   DateTime @default(now())
  
  @@map("tags")
}

// ========================================
// NEWSLETTER
// ========================================

model NewsletterSubscriber {
  id           String             @id @default(cuid())
  email        String             @unique
  nome         String?
  status       SubscriberStatus   @default(ACTIVE)
  source       String?            // de onde veio a inscrição
  
  subscribedAt DateTime           @default(now())
  updatedAt    DateTime           @updatedAt
  
  @@index([email])
  @@index([status])
  @@map("newsletter_subscribers")
}

enum SubscriberStatus {
  ACTIVE
  UNSUBSCRIBED
  BOUNCED
  COMPLAINED
}

// ========================================
// DEPOIMENTOS
// ========================================

model Depoimento {
  id          String   @id @default(cuid())
  nome        String
  cargo       String
  empresa     String
  avatar      String?
  conteudo    String   @db.Text
  rating      Int      @default(5)
  
  aprovado    Boolean  @default(false)
  destaque    Boolean  @default(false)
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@index([aprovado])
  @@index([destaque])
  @@map("depoimentos")
}

// ========================================
// ANALYTICS (opcional - se quiser seu próprio)
// ========================================

model PageView {
  id          String   @id @default(cuid())
  path        String
  referrer    String?
  userAgent   String?
  country     String?
  
  createdAt   DateTime @default(now())
  
  @@index([path])
  @@index([createdAt])
  @@map("page_views")
}

model Event {
  id          String   @id @default(cuid())
  name        String
  properties  Json?
  userId      String?
  sessionId   String?
  
  createdAt   DateTime @default(now())
  
  @@index([name])
  @@index([createdAt])
  @@map("events")
}
```

### Comandos Prisma:

```bash
# Instalar Prisma
npm install -D prisma
npm install @prisma/client

# Inicializar Prisma
npx prisma init

# Criar migration
npx prisma migrate dev --name init

# Gerar client
npx prisma generate

# Abrir Prisma Studio (GUI)
npx prisma studio

# Reset database (desenvolvimento)
npx prisma migrate reset

# Seed database
npx prisma db seed
```

---

## 🔌 API ROUTES DETALHADAS {#api-routes}

### 1. Autenticação

#### `/api/auth/[...nextauth]/route.ts`

```typescript
import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password || ""
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

### 2. Leads

#### `/api/leads/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { leadSchema } from "@/lib/validations/lead";
import { rateLimit } from "@/lib/rate-limit";
import { sendEmail } from "@/lib/email";

// GET /api/leads - Listar todos (admin only)
export async function GET(request: NextRequest) {
  try {
    // Verificar autenticação
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    
    const where = status ? { status } : {};
    
    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          auditorias: {
            orderBy: { createdAt: "desc" },
            take: 1,
          },
          calculosRoi: {
            orderBy: { createdAt: "desc" },
            take: 1,
          },
        },
      }),
      prisma.lead.count({ where }),
    ]);

    return NextResponse.json({
      leads,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching leads:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/leads - Criar novo lead
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const identifier = request.ip ?? "anonymous";
    const { success } = await rateLimit.limit(identifier);
    
    if (!success) {
      return NextResponse.json(
        { error: "Too many requests" },
        { status: 429 }
      );
    }

    // Validar dados
    const body = await request.json();
    const validated = leadSchema.parse(body);

    // Criar lead
    const lead = await prisma.lead.create({
      data: {
        ...validated,
        source: "website",
        status: "NEW",
      },
    });

    // Enviar emails
    await Promise.all([
      // Email de confirmação para o lead
      sendEmail({
        to: lead.email,
        subject: "Obrigado pelo seu interesse!",
        template: "contact-confirmation",
        data: { name: lead.name },
      }),
      
      // Notificação para a equipe
      sendEmail({
        to: process.env.TEAM_EMAIL!,
        subject: `Novo lead: ${lead.name}`,
        template: "new-lead-notification",
        data: lead,
      }),
    ]);

    return NextResponse.json({ lead }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }
    
    console.error("Error creating lead:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

### 3. Auditoria SEO

#### `/api/auditoria/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { seoAnalyzer } from "@/lib/services/seo-analyzer";
import { auditoriaSchema } from "@/lib/validations/auditoria";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const identifier = request.ip ?? "anonymous";
    const { success } = await rateLimit.limit(identifier);
    
    if (!success) {
      return NextResponse.json(
        { error: "Too many requests. Try again later." },
        { status: 429 }
      );
    }

    // Validar
    const body = await request.json();
    const { url, leadData } = auditoriaSchema.parse(body);

    // Analisar site
    const resultado = await seoAnalyzer.analyze(url);

    // Criar ou buscar lead
    let lead;
    if (leadData?.email) {
      lead = await prisma.lead.upsert({
        where: { email: leadData.email },
        update: leadData,
        create: {
          ...leadData,
          source: "auditoria-seo",
          status: "NEW",
        },
      });
    }

    // Salvar auditoria
    const auditoria = await prisma.auditoriaSEO.create({
      data: {
        leadId: lead?.id,
        url: resultado.url,
        score: resultado.overallScore,
        resultadoCompleto: resultado as any,
        titleLength: resultado.technical.title.length,
        descriptionLength: resultado.technical.description.length,
        h1Count: resultado.technical.headings.h1,
        imagesTotal: resultado.technical.images.total,
        imagesWithoutAlt: resultado.technical.images.withoutAlt,
        wordCount: resultado.content.wordCount,
        isHttps: resultado.security.https,
      },
    });

    // Enviar relatório por email (se houver lead)
    if (lead) {
      await sendEmail({
        to: lead.email,
        subject: `Auditoria SEO Completa - ${url}`,
        template: "auditoria-report",
        data: {
          name: lead.name,
          url,
          score: resultado.overallScore,
          downloadLink: `${process.env.NEXT_PUBLIC_URL}/api/auditoria/${auditoria.id}/pdf`,
        },
      });
    }

    return NextResponse.json({
      auditoria: {
        id: auditoria.id,
        ...resultado,
      },
    });
  } catch (error) {
    console.error("Error in SEO audit:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to analyze website" },
      { status: 500 }
    );
  }
}

// GET /api/auditoria/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const auditoria = await prisma.auditoriaSEO.findUnique({
      where: { id: params.id },
      include: {
        lead: true,
      },
    });

    if (!auditoria) {
      return NextResponse.json(
        { error: "Audit not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ auditoria });
  } catch (error) {
    console.error("Error fetching audit:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

### 4. Calculadora ROI

#### `/api/roi/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { roiSchema } from "@/lib/validations/roi";
import { calculateROI } from "@/lib/services/roi-calculator";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const identifier = request.ip ?? "anonymous";
    const { success } = await rateLimit.limit(identifier);
    
    if (!success) {
      return NextResponse.json(
        { error: "Too many requests" },
        { status: 429 }
      );
    }

    // Validar
    const body = await request.json();
    const validated = roiSchema.parse(body);

    // Calcular ROI
    const resultado = calculateROI(validated);

    // Criar ou buscar lead (se fornecido)
    let lead;
    if (validated.leadData?.email) {
      lead = await prisma.lead.upsert({
        where: { email: validated.leadData.email },
        update: validated.leadData,
        create: {
          ...validated.leadData,
          source: "calculadora-roi",
          status: "NEW",
        },
      });
    }

    // Salvar cálculo
    const calculo = await prisma.calculoROI.create({
      data: {
        leadId: lead?.id,
        investimentoInicial: validated.investimentoInicial,
        investimentoMensal: validated.investimentoMensal,
        tempoInvestimento: validated.tempoInvestimento,
        receitaMensal: validated.receitaMensal,
        crescimentoMensal: validated.crescimentoMensal,
        custoPorLead: validated.custoPorLead,
        conversao: validated.conversao,
        roi: resultado.roi,
        payback: resultado.payback,
        lucroTotal: resultado.lucro,
        receitaTotal: resultado.receitaTotal,
        resultadoCompleto: resultado as any,
      },
    });

    return NextResponse.json({
      calculo: {
        id: calculo.id,
        ...resultado,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }
    
    console.error("Error calculating ROI:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

---

## 🔐 AUTENTICAÇÃO E AUTORIZAÇÃO {#auth}

### Middleware de Proteção

```typescript
// src/middleware.ts

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdmin = token?.role === "ADMIN";
    const isEditor = token?.role === "EDITOR" || isAdmin;
    
    // Proteger rotas /admin
    if (req.nextUrl.pathname.startsWith("/admin")) {
      if (!isAdmin) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
    
    // Proteger API routes /api/admin
    if (req.nextUrl.pathname.startsWith("/api/admin")) {
      if (!isAdmin) {
        return NextResponse.json(
          { error: "Unauthorized" },
          { status: 401 }
        );
      }
    }
    
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
```

---

## 🔌 INTEGRAÇÕES EXTERNAS {#integracoes}

### 1. Serviço de Email (Resend)

```typescript
// src/lib/email.ts

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  template: string;
  data: Record<string, any>;
}

export async function sendEmail({
  to,
  subject,
  template,
  data,
}: SendEmailOptions) {
  try {
    const { default: Template } = await import(
      `@/emails/templates/${template}`
    );

    const { data: result, error } = await resend.emails.send({
      from: "Orbee Labs <contato@orbeelabs.com>",
      to,
      subject,
      react: Template(data),
    });

    if (error) {
      throw new Error(error.message);
    }

    return result;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
}
```

### 2. Rate Limiting (Upstash)

```typescript
// src/lib/rate-limit.ts

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export const rateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "1 m"), // 5 requests per minute
  analytics: true,
  prefix: "orbee-labs",
});
```

---

## 🛡️ SEGURANÇA {#seguranca}

### Validações com Zod

```typescript
// src/lib/validations/lead.ts

import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  company: z.string().optional(),
  website: z.string().url("URL inválida").optional().or(z.literal("")),
  revenue: z.string().optional(),
  objective: z.string().optional(),
  challenge: z.string().min(10, "Descreva seu desafio em pelo menos 10 caracteres"),
});

export type LeadInput = z.infer<typeof leadSchema>;
```

### Variáveis de Ambiente

```bash
# .env.example

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/orbeelabs"

# Next Auth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="gerar-secret-forte-aqui"

# Google OAuth (opcional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Email (Resend)
RESEND_API_KEY=""
FROM_EMAIL="contato@orbeelabs.com"
TEAM_EMAIL="equipe@orbeelabs.com"

# Google APIs
GOOGLE_PAGESPEED_API_KEY=""

# Rate Limiting (Upstash)
UPSTASH_REDIS_REST_URL=""
UPSTASH_REDIS_REST_TOKEN=""

# Analytics
NEXT_PUBLIC_GA_ID=""
NEXT_PUBLIC_GTM_ID=""

# Sentry (opcional)
SENTRY_DSN=""
```

---

## 🚀 DEPLOYMENT {#deployment}

### Vercel (Recomendado)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy production
vercel --prod
```

### Configurar Vercel Postgres

```bash
# Via dashboard Vercel:
1. Ir em Storage
2. Criar Postgres database
3. Conectar ao projeto
4. Copiar DATABASE_URL automática
```

---

## 📅 CRONOGRAMA DE IMPLEMENTAÇÃO {#cronograma}

### Semana 1: Setup e Fundação
- [ ] Dia 1-2: Setup Prisma + Database
- [ ] Dia 3-4: Autenticação NextAuth
- [ ] Dia 5: Rate limiting e segurança básica

### Semana 2: APIs Core
- [ ] Dia 1-2: API Leads + Contact
- [ ] Dia 3: API Auditoria SEO
- [ ] Dia 4: API Calculadora ROI
- [ ] Dia 5: Integrações email

### Semana 3: Features Avançadas
- [ ] Dia 1-2: Blog CMS
- [ ] Dia 3: Newsletter
- [ ] Dia 4: Portfolio CRUD
- [ ] Dia 5: Testes e fixes

### Semana 4: Admin e Deploy
- [ ] Dia 1-2: Dashboard admin
- [ ] Dia 3: Páginas legais
- [ ] Dia 4: Deploy staging
- [ ] Dia 5: Deploy produção

---

**TOTAL ESTIMADO:** 4 semanas (1 desenvolvedor fullstack)

---

## ✅ CHECKLIST FINAL

Antes de colocar em produção:

### Backend
- [ ] Banco de dados em produção
- [ ] Todas as APIs testadas
- [ ] Rate limiting ativo
- [ ] Variáveis de ambiente configuradas
- [ ] Backups automáticos

### Segurança
- [ ] HTTPS forçado
- [ ] CORS configurado
- [ ] Validações em todas as APIs
- [ ] Autenticação funcionando
- [ ] Rate limiting testado

### Funcional
- [ ] Formulários salvando
- [ ] Emails sendo enviados
- [ ] Auditorias rodando
- [ ] ROI calculando
- [ ] Admin dashboard funcional

---

**Documento criado em:** 04/10/2025  
**Para:** Diana Camila & Izabela Fissicaro  
**Projeto:** Orbee Labs 2.0 - Backend Implementation
