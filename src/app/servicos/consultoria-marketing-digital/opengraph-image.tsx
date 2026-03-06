import { generateOGImage, ogSize, ogContentType } from '@/lib/og-image';

export const alt = 'Consultoria em Marketing Digital em BH | Orbee Labs';
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return generateOGImage({
    title: 'Consultoria em Marketing Digital em BH',
    subtitle: 'Estratégia personalizada, planejamento executável e definição de KPIs para crescimento sustentável.',
    badge: 'Consultoria Estratégica',
  });
}
