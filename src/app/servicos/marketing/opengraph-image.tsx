import { generateOGImage, ogSize, ogContentType } from '@/lib/og-image';

export const alt = 'Marketing Digital Estratégico em BH | Orbee Labs';
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return generateOGImage({
    title: 'Marketing Digital Estratégico em BH',
    subtitle: 'Estratégias data-driven com SEO, Google Ads, Email Marketing e automação para crescimento sustentável.',
    badge: 'Data-Driven',
  });
}
