# 🧩 Componentes e Funcionalidades Faltantes

**Projeto:** Orbee Labs 2.0  
**Status:** Identificados e documentados  
**Categoria:** Componentes UI e Funcionalidades Específicas

---

## 🔔 **SISTEMA DE NOTIFICAÇÕES**

### **1. Toaster Component**
**Descrição:** Sistema de notificações toast  
**Uso:** Feedback de ações do usuário  
**Dependências:** `@radix-ui/react-toast`

```tsx
// Exemplo de uso
import { toast } from "@/components/ui/toaster"

const handleSubmit = () => {
  toast({
    title: "Sucesso!",
    description: "Formulário enviado com sucesso.",
  })
}
```

**Funcionalidades:**
- ✅ Notificações de sucesso
- ✅ Notificações de erro
- ✅ Notificações de aviso
- ✅ Auto-dismiss configurável
- ✅ Posicionamento customizável

### **2. Sonner Component**
**Descrição:** Sistema de toast alternativo  
**Uso:** Notificações mais elegantes  
**Dependências:** `sonner`

```tsx
// Exemplo de uso
import { toast } from "sonner"

const handleAction = () => {
  toast.success("Ação realizada com sucesso!")
  toast.error("Algo deu errado!")
}
```

### **3. TooltipProvider**
**Descrição:** Sistema de tooltips  
**Uso:** Dicas e informações adicionais  
**Dependências:** `@radix-ui/react-tooltip`

```tsx
// Exemplo de uso
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>Hover me</TooltipTrigger>
    <TooltipContent>
      <p>Informação adicional</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

---

## 📊 **GERENCIAMENTO DE ESTADO**

### **4. QueryClient (React Query)**
**Descrição:** Cache e sincronização de dados  
**Uso:** Gerenciamento de estado do servidor  
**Dependências:** `@tanstack/react-query`

```tsx
// Configuração
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos
      cacheTime: 10 * 60 * 1000, // 10 minutos
    },
  },
})

// Provider
<QueryClientProvider client={queryClient}>
  <App />
</QueryClientProvider>
```

**Funcionalidades:**
- ✅ Cache automático
- ✅ Sincronização em background
- ✅ Retry automático
- ✅ Loading states
- ✅ Error handling

---

## 🧮 **FUNCIONALIDADES ESPECÍFICAS**

### **5. Calculadora de ROI**
**Descrição:** Ferramenta interativa de cálculo de ROI  
**Localização:** `/calculadora-roi`  
**Tipo:** Componente complexo

**Funcionalidades:**
- ✅ Cálculos em tempo real
- ✅ Múltiplas métricas (tráfego, leads, vendas)
- ✅ Cenários comparativos
- ✅ Exportação de resultados
- ✅ Gráficos interativos

**Métricas Incluídas:**
- Tráfego orgânico atual vs projetado
- Leads qualificados
- Taxa de conversão
- Ticket médio
- ROI esperado
- Payback period

**Componentes Necessários:**
```tsx
// Estrutura sugerida
<ROICalculator>
  <ROIForm />
  <ROIResults />
  <ROICharts />
  <ROIExport />
</ROICalculator>
```

### **6. Auditoria SEO**
**Descrição:** Sistema de auditoria automática  
**Localização:** `/auditoria-seo`  
**Tipo:** Formulário multi-step + API

**Funcionalidades:**
- ✅ Análise técnica do site
- ✅ Verificação de SEO on-page
- ✅ Análise de velocidade
- ✅ Verificação mobile-friendly
- ✅ Relatório em PDF
- ✅ Agendamento de consultoria

**Etapas do Formulário:**
1. **URL do Site** - Validação e análise inicial
2. **Informações do Negócio** - Contexto e objetivos
3. **Análise em Tempo Real** - Verificações técnicas
4. **Relatório Gerado** - Resultados e recomendações
5. **Agendamento** - Consultoria gratuita

**Componentes Necessários:**
```tsx
// Estrutura sugerida
<AuditForm>
  <AuditStep1 />
  <AuditStep2 />
  <AuditAnalysis />
  <AuditReport />
  <AuditScheduling />
</AuditForm>
```

### **7. Sistema de Blog**
**Descrição:** Blog completo com MDX  
**Localização:** `/blog`  
**Tipo:** Sistema de conteúdo

**Funcionalidades:**
- ✅ Listagem de posts
- ✅ Páginas individuais
- ✅ Sistema de categorias
- ✅ Sistema de tags
- ✅ Busca
- ✅ Newsletter
- ✅ SEO otimizado

**Estrutura de Arquivos:**
```
src/
├── app/blog/
│   ├── page.tsx (listagem)
│   ├── [slug]/
│   │   └── page.tsx (post individual)
│   ├── categoria/[categoria]/
│   │   └── page.tsx
│   └── tag/[tag]/
│       └── page.tsx
├── content/
│   └── blog/
│       ├── post-1.mdx
│       ├── post-2.mdx
│       └── ...
└── components/blog/
    ├── BlogPostCard.tsx
    ├── BlogPost.tsx
    ├── BlogSearch.tsx
    └── BlogNewsletter.tsx
```

---

## 🎨 **COMPONENTES UI ADICIONAIS**

### **8. Accordion**
**Descrição:** Componente de acordeão  
**Uso:** FAQ, conteúdo expansível  
**Dependências:** `@radix-ui/react-accordion`

### **9. Alert Dialog**
**Descrição:** Diálogos de confirmação  
**Uso:** Confirmações de ações críticas  
**Dependências:** `@radix-ui/react-alert-dialog`

### **10. Carousel**
**Descrição:** Carrossel de imagens/conteúdo  
**Uso:** Galeria, depoimentos  
**Dependências:** `@radix-ui/react-carousel`

### **11. Command**
**Descrição:** Interface de comando  
**Uso:** Busca, seleção rápida  
**Dependências:** `@radix-ui/react-command`

### **12. Dialog**
**Descrição:** Modais e diálogos  
**Uso:** Formulários, detalhes  
**Dependências:** `@radix-ui/react-dialog`

### **13. Dropdown Menu**
**Descrição:** Menu dropdown  
**Uso:** Ações, navegação  
**Dependências:** `@radix-ui/react-dropdown-menu`

### **14. Hover Card**
**Descrição:** Card que aparece no hover  
**Uso:** Preview de conteúdo  
**Dependências:** `@radix-ui/react-hover-card`

### **15. Popover**
**Descrição:** Popover para conteúdo adicional  
**Uso:** Formulários, informações  
**Dependências:** `@radix-ui/react-popover`

### **16. Progress**
**Descrição:** Barra de progresso  
**Uso:** Loading, etapas  
**Dependências:** `@radix-ui/react-progress`

### **17. Select**
**Descrição:** Select customizado  
**Uso:** Formulários, filtros  
**Dependências:** `@radix-ui/react-select`

### **18. Sheet**
**Descrição:** Painel lateral deslizante  
**Uso:** Menu mobile, detalhes  
**Dependências:** `@radix-ui/react-sheet`

### **19. Tabs**
**Descrição:** Sistema de abas  
**Uso:** Organização de conteúdo  
**Dependências:** `@radix-ui/react-tabs`

---

## 📦 **DEPENDÊNCIAS NECESSÁRIAS**

### **Instalação das Dependências**
```bash
# Sistema de notificações
npm install @radix-ui/react-toast sonner

# Tooltips
npm install @radix-ui/react-tooltip

# React Query
npm install @tanstack/react-query

# Componentes UI adicionais
npm install @radix-ui/react-accordion
npm install @radix-ui/react-alert-dialog
npm install @radix-ui/react-carousel
npm install @radix-ui/react-command
npm install @radix-ui/react-dialog
npm install @radix-ui/react-dropdown-menu
npm install @radix-ui/react-hover-card
npm install @radix-ui/react-popover
npm install @radix-ui/react-progress
npm install @radix-ui/react-select
npm install @radix-ui/react-sheet
npm install @radix-ui/react-tabs

# Para o blog (MDX)
npm install @next/mdx @mdx-js/loader @mdx-js/react

# Para gráficos (Calculadora de ROI)
npm install recharts

# Para geração de PDF (Auditoria SEO)
npm install jspdf html2canvas
```

---

## 🚀 **IMPLEMENTAÇÃO SUGERIDA**

### **Fase 1: Sistema Base**
1. Instalar dependências básicas
2. Configurar Toaster e Sonner
3. Implementar TooltipProvider
4. Configurar QueryClient

### **Fase 2: Funcionalidades Específicas**
1. Desenvolver Calculadora de ROI
2. Implementar Auditoria SEO
3. Criar sistema de Blog

### **Fase 3: Componentes UI**
1. Implementar componentes Radix UI
2. Criar componentes customizados
3. Integrar com design system

### **Fase 4: Otimização**
1. Testes de performance
2. Otimização de bundle
3. SEO e acessibilidade

---

## 📊 **IMPACTO NO PROJETO**

### **Bundle Size**
- **Atual:** ~500KB
- **Com dependências:** ~800KB (+60%)
- **Otimizado:** ~650KB (+30%)

### **Performance**
- **Lazy loading** para componentes pesados
- **Code splitting** por página
- **Tree shaking** para dependências

### **UX/UI**
- **Feedback visual** melhorado
- **Interatividade** aumentada
- **Acessibilidade** aprimorada

---

**Documento criado em:** $(date)  
**Status:** Aguardando aprovação para implementação  
**Próximo passo:** Instalação das dependências prioritárias
