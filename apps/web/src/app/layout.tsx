import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import '@/styles/globals.css';
import { siteConfig } from '@/lib/constants';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — Voice AI Platform`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: siteConfig.name,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <Header />
        {children}
        <Footer />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
