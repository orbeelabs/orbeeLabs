import { generateOGImage, ogSize, ogContentType } from '@/lib/og-image';

export const alt = 'Portfolio — Cases de Sucesso | Orbee Labs';
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return generateOGImage({
    title: 'Cases de Sucesso',
    subtitle: 'Resultados reais: +400% ROI, 100% de ocupação e primeira página do Google em 60 dias.',
    badge: 'Portfolio',
  });
}
