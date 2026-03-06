import { generateOGImage, ogSize, ogContentType } from '@/lib/og-image';

export const alt = 'Blog — Orbee Labs | Marketing Digital e SEO em BH';
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return generateOGImage({
    title: 'Blog Orbee Labs',
    subtitle: 'Artigos sobre SEO técnico, marketing digital, desenvolvimento web e cases de sucesso em BH.',
    badge: 'Conteúdo Especializado',
  });
}
