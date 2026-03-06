import { generateOGImage, ogSize, ogContentType } from '@/lib/og-image';

export const alt = 'Tráfego Pago em BH — Google Ads e Meta Ads | Orbee Labs';
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return generateOGImage({
    title: 'Tráfego Pago em BH',
    subtitle: 'Google Ads, Meta Ads e LinkedIn Ads com estratégia híbrida SEO+Ads. ROI comprovado.',
    badge: 'ROI Comprovado',
  });
}
