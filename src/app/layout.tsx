import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
// Import all available fonts for AI usage
import "../lib/fonts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ENEMPro - Simulados ENEM 2025 e 2026",
  description: "Há mais de 3 anos ajudando estudantes a conquistarem seus sonhos no ENEM. Simulados completos, correção de redação e preparação completa para o ENEM 2025 e 2026.",
  keywords: "ENEM, simulados, preparação, vestibular, redação, 2025, 2026",
  authors: [{ name: "ENEMPro" }],
  openGraph: {
    title: "ENEMPro - Simulados ENEM 2025 e 2026",
    description: "Há mais de 3 anos ajudando estudantes a conquistarem seus sonhos no ENEM. Simulados completos e preparação completa.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ENEMPro - Simulados ENEM 2025 e 2026",
    description: "Há mais de 3 anos ajudando estudantes a conquistarem seus sonhos no ENEM.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <Script src="/lasy-bridge.js" strategy="beforeInteractive" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}