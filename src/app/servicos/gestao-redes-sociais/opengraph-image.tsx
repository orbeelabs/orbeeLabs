import { generateOGImage, ogSize, ogContentType } from '@/lib/og-image';

export const alt = 'Gestão de Redes Sociais em BH | Orbee Labs';
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return generateOGImage({
    title: 'Gestão de Redes Sociais em BH',
    subtitle: 'Criação de conteúdo, estratégia de crescimento e anúncios pagos no Instagram, Facebook e LinkedIn.',
    badge: 'Social Media',
  });
}
