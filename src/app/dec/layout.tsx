import type { Metadata } from 'next';

/**
 * Layout minimal para a página oculta /dec (apresentação).
 * Sem Navigation, Footer ou Breadcrumb — página standalone.
 * Não listada em navegação nem sitemap.
 */
export const metadata: Metadata = {
  title: 'Apresentação | Orbee Labs',
  robots: { index: false, follow: false },
};

export default function DecLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
