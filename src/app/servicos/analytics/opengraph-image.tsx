import { generateOGImage, ogSize, ogContentType } from '@/lib/og-image';

export const alt = 'Analytics e Business Intelligence em BH | Orbee Labs';
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return generateOGImage({
    title: 'Analytics e Business Intelligence em BH',
    subtitle: 'Dashboards personalizados, relatórios automatizados e insights acionáveis para decisões baseadas em dados.',
    badge: 'Data Intelligence',
  });
}
