import { generateOGImage, ogSize, ogContentType } from '@/lib/og-image';

export const alt = 'E-commerce de Alta Performance em BH | Orbee Labs';
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return generateOGImage({
    title: 'E-commerce de Alta Performance em BH',
    subtitle: 'Lojas virtuais que convertem. Performance 98+, SEO integrado e +200% de vendas online.',
    badge: '+200% Vendas',
  });
}
