import { generateOGImage, ogSize, ogContentType } from '@/lib/og-image';

export const alt = 'SEO Técnico em BH — Metodologia SEO-VX | Orbee Labs';
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return generateOGImage({
    title: 'SEO Técnico em BH',
    subtitle: 'Metodologia proprietária SEO-VX. Resultados comprovados — primeira página em 60 dias.',
    badge: 'Metodologia SEO-VX',
  });
}
