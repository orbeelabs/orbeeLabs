import { generateOGImage, ogSize, ogContentType } from '@/lib/og-image';

export const alt = 'Marketing Digital para Serviços Profissionais em BH | Orbee Labs';
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return generateOGImage({
    title: 'Marketing Digital para Serviços Profissionais em BH',
    subtitle: 'SEO local e captação de clientes para advogados, contadores e consultores.',
    badge: 'Serviços Profissionais',
  });
}
