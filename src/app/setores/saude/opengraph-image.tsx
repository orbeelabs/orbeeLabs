import { generateOGImage, ogSize, ogContentType } from '@/lib/og-image';

export const alt = 'Marketing Digital para Saúde em BH | Orbee Labs';
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return generateOGImage({
    title: 'Marketing Digital para Saúde em BH',
    subtitle: 'SEO médico, captação de pacientes e estratégias para clínicas e profissionais de saúde.',
    badge: 'Setor Saúde',
  });
}
