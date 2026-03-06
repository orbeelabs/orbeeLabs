import { generateOGImage, ogSize, ogContentType } from '@/lib/og-image';

export const alt = 'Landing Pages de Alta Conversão em BH | Orbee Labs';
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return generateOGImage({
    title: 'Landing Pages de Alta Conversão em BH',
    subtitle: 'Taxa de conversão 5-15%, performance 98+, copywriting persuasivo e A/B testing integrado.',
    badge: 'Conversão 5-15%',
  });
}
