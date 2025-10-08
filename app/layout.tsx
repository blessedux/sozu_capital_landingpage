import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://sozu.capital'),
  title: "The Economy of the Future | SOZU CAPITAL",
  description: "The entrepreneur's OS for the global economy. Sozu provides a private, borderless financial stack, from payments to treasury management, free from intermediaries and built for business sovereignty.",
  keywords: ["decentralized finance", "entrepreneur", "peer-to-peer", "cryptocurrency", "blockchain", "DeFi", "future economy", "sovereign finance"],
  authors: [{ name: "SOZU CAPITAL" }],
  creator: "SOZU CAPITAL",
  publisher: "SOZU CAPITAL",
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sozu.capital',
    siteName: 'SOZU CAPITAL',
    title: 'SOZU CAPITAL | The Entrepreneur\'s Operating System',
    description: 'The entrepreneur\'s OS for the global economy. Sozu provides a private, borderless financial stack—from payments to treasury management—free from intermediaries and built for business sovereignty.',
    images: [
      {
        url: '/sozucapital_logo_tb.png',
        width: 1200,
        height: 630,
        alt: 'SOZU CAPITAL - The Economy of the Future',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Economy of the Future | SOZU CAPITAL',
    description: 'The entrepreneur\'s OS for the global economy. Sozu provides a private, borderless financial stack—from payments to treasury management—free from intermediaries and built for business sovereignty.',
    images: ['/sozucapital_logo_tb.png'],
    creator: '@sozucapital',
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body
        className="antialiased"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
