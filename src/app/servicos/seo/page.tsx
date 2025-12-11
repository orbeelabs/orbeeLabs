import { redirect } from 'next/navigation';

/**
 * Redirect da rota antiga /servicos/seo para /servicos/seo-bh
 * Mantém compatibilidade com links antigos e SEO
 */
export default function SEORedirect() {
  redirect('/servicos/seo-bh');
}

