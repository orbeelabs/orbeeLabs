import { generateOGImage, ogSize, ogContentType } from '@/lib/og-image';

export const alt = 'Contato — Orbee Labs | Marketing Digital em BH';
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return generateOGImage({
    title: 'Fale com a Orbee Labs',
    subtitle: 'Peça sua auditoria SEO gratuita. Belo Horizonte, MG — (31) 98255-6751',
    badge: 'Contato',
  });
}
