import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GTM from "@/components/GTM";
import WebVitals from "@/components/WebVitals";
import { Providers } from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Orbee Labs - Marketing Digital e Desenvolvimento Web",
  description: "Transformamos negócios com marketing digital de alta performance e desenvolvimento web fullstack. Especialistas em gerar resultados reais e mensuráveis.",
  keywords: "marketing digital, SEO, desenvolvimento web, React, Next.js, agência digital",
  authors: [{ name: "Orbee Labs" }],
  openGraph: {
    title: "Orbee Labs - Marketing Digital e Desenvolvimento Web",
    description: "Transformamos negócios com marketing digital de alta performance e desenvolvimento web fullstack.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Orbee Labs - Marketing Digital e Desenvolvimento Web",
    description: "Transformamos negócios com marketing digital de alta performance e desenvolvimento web fullstack.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <GTM />
          <WebVitals />
          {children}
        </Providers>
      </body>
    </html>
  );
}
