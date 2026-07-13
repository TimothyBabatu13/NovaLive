import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NovaLive - Watch & Stream Live',
  description: 'NovaLive is a live streaming platform where you can watch and stream your favorite content.',
  keywords: 'live, stream, twitch, clone, novalive',
  authors: [{ name: 'NovaLive Team' }],
  openGraph: {
    title: 'NovaLive - Watch & Stream Live',
    description: 'NovaLive is a live streaming platform where you can watch and stream your favorite content.',
    url: 'https://novalive.com',
    siteName: 'NovaLive',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'NovaLive',
    }],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
