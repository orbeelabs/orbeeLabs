import { generateOGImage, ogSize, ogContentType } from '@/lib/og-image';

export const alt = 'Marketing Digital para Educação em BH | Orbee Labs';
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return generateOGImage({
    title: 'Marketing Digital para Educação em BH',
    subtitle: 'Captação de alunos, SEO educacional e estratégias para instituições de ensino e edtechs.',
    badge: 'Setor Educação',
  });
}
