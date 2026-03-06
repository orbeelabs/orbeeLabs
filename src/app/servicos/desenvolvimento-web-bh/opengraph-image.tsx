import { generateOGImage, ogSize, ogContentType } from '@/lib/og-image';

export const alt = 'Desenvolvimento Web em BH — Sites de Alta Performance | Orbee Labs';
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return generateOGImage({
    title: 'Desenvolvimento Web em BH',
    subtitle: 'Next.js, React e TypeScript. Performance 98+, SEO integrado, carregamento em 0.7s.',
    badge: 'Performance 98+',
  });
}
