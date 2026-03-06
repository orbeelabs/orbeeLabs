import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GoogleTagManagerHead from "@/components/GoogleTagManagerHead";
import { GoogleTagManagerNoscript } from "@/components/GoogleTagManager";
import WebVitals from "@/components/WebVitals";
import CookieBanner from "@/components/CookieBanner";
import { Providers } from "@/components/providers";
import { OrganizationStructuredData, WebsiteStructuredData, LocalBusinessStructuredData } from "@/components/StructuredData";
import { requireEnvVars } from "@/lib/env-validation";
import ConsoleFilter from "@/components/ConsoleFilter";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

// Validar variáveis de ambiente no startup
requireEnvVars();

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: "Orbee Labs - Marketing Digital e Desenvolvimento Web | SEO-VX",
  description: "Agência de marketing digital especializada em SEO técnico, desenvolvimento web fullstack e estratégias de alta performance. Metodologia 'SEO-VX' para dominar os resultados de busca. ROI mensurável garantido.",
  keywords: "agência de SEO BH, marketing digital Belo Horizonte, SEO técnico BH, desenvolvimento web BH, agência digital BH, SEO-VX, SEO arquitetural, criação de sites BH, otimização de sites Belo Horizonte, marketing digital MG, desenvolvimento fullstack, consultoria SEO Belo Horizonte",
  authors: [{ name: "Orbee Labs", url: "https://orbeelabs.com" }],
  creator: "Orbee Labs",
  publisher: "Orbee Labs",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://orbeelabs.com",
  },
  openGraph: {
    title: "Orbee Labs - Marketing Digital e Desenvolvimento Web | SEO-VX",
    description: "Agência de marketing digital especializada em SEO técnico, desenvolvimento web fullstack e estratégias de alta performance. Metodologia 'SEO-VX' para dominar os resultados de busca.",
    type: "website",
    locale: "pt_BR",
    url: "https://orbeelabs.com",
    siteName: "Orbee Labs",
    images: [
      {
        url: "https://orbeelabs.com/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Orbee Labs - Marketing Digital e Desenvolvimento Web em BH",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Orbee Labs - Marketing Digital e Desenvolvimento Web",
    description: "Agência de marketing digital especializada em SEO técnico e desenvolvimento web fullstack. Metodologia 'SEO-VX' para resultados reais.",
    images: ["https://orbeelabs.com/opengraph-image"],
    creator: "@orbeelabs",
  },
  other: {
    'geo.position': '-19.9167;-43.9345',
    'geo.region': 'BR-MG',
    'geo.placename': 'Belo Horizonte',
    'ICBM': '-19.9167, -43.9345',
  },
  category: "Marketing Digital",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <GoogleTagManagerHead />
        <OrganizationStructuredData />
        <WebsiteStructuredData />
        <LocalBusinessStructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleTagManagerNoscript />
        <Providers>
          <ConsoleFilter />
          <WebVitals />
          {children}
          <SpeedInsights />
          <Analytics />
          <CookieBanner />
        </Providers>
      </body>
    </html>
  );
}
