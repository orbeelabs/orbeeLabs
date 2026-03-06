import { generateOGImage, ogSize, ogContentType } from '@/lib/og-image';

export const alt = 'Sobre a Orbee Labs — Agência de Marketing Digital em BH';
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return generateOGImage({
    title: 'Sobre a Orbee Labs',
    subtitle: '3 fundadoras, metodologia SEO-VX e uma missão: transformar negócios em BH através de tecnologia e marketing digital.',
    badge: 'Quem Somos',
  });
}
