import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GoogleTagManagerHead from "@/components/GoogleTagManagerHead";
import { GoogleTagManagerNoscript } from "@/components/GoogleTagManager";
import WebVitals from "@/components/WebVitals";
import CookieBanner from "@/components/CookieBanner";
import { Providers } from "@/components/providers";
import { OrganizationStructuredData, WebsiteStructuredData } from "@/components/StructuredData";
import { requireEnvVars } from "@/lib/env-validation";
import ConsoleFilter from "@/components/ConsoleFilter";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Validar variáveis de ambiente no startup
requireEnvVars();

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Orbee Labs - Marketing Digital e Desenvolvimento Web | SEO Cabuloso",
  description: "Agência de marketing digital especializada em SEO técnico, desenvolvimento web fullstack e estratégias de alta performance. Metodologia 'SEO Cabuloso' para dominar os resultados de busca. ROI mensurável garantido.",
  keywords: "marketing digital, SEO técnico, desenvolvimento web, React, Next.js, agência digital, SEO Cabuloso, marketing de alta performance, desenvolvimento fullstack, otimização de sites, estratégias digitais, ROI digital",
  authors: [{ name: "Orbee Labs", url: "https://orbeelabs.com" }],
  creator: "Orbee Labs",
  publisher: "Orbee Labs",
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
    title: "Orbee Labs - Marketing Digital e Desenvolvimento Web | SEO Cabuloso",
    description: "Agência de marketing digital especializada em SEO técnico, desenvolvimento web fullstack e estratégias de alta performance. Metodologia 'SEO Cabuloso' para dominar os resultados de busca.",
    type: "website",
    locale: "pt_BR",
    url: "https://orbeelabs.com",
    siteName: "Orbee Labs",
    images: [
      {
        url: "https://orbeelabs.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Orbee Labs - Marketing Digital e Desenvolvimento Web",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Orbee Labs - Marketing Digital e Desenvolvimento Web",
    description: "Agência de marketing digital especializada em SEO técnico e desenvolvimento web fullstack. Metodologia 'SEO Cabuloso' para resultados reais.",
    images: ["https://orbeelabs.com/og-image.jpg"],
    creator: "@orbeelabs",
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
    yahoo: "yahoo-site-verification-code",
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
        <GoogleTagManagerHead />
        <OrganizationStructuredData />
        <WebsiteStructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleTagManagerNoscript />
        <Providers>
          <ConsoleFilter />
          <WebVitals />
          <SpeedInsights />
          {children}
          <CookieBanner />
        </Providers>
      </body>
    </html>
  );
}
