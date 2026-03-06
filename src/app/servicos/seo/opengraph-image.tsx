import { generateOGImage, ogSize, ogContentType } from '@/lib/og-image';

export const alt = 'SEO Técnico — Metodologia SEO-VX | Orbee Labs';
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return generateOGImage({
    title: 'SEO Técnico Avançado',
    subtitle: 'Metodologia proprietária SEO-VX. Sites construídos para o Google desde a primeira linha de código.',
    badge: 'SEO-VX',
  });
}
