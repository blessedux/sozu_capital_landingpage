import type { Metadata } from "next";

const base = "https://sozu.capital";

const shared: Pick<
  Metadata,
  "metadataBase" | "robots" | "authors" | "creator" | "publisher" | "icons"
> = {
  metadataBase: new URL(base),
  authors: [{ name: "SOZU CAPITAL" }],
  creator: "SOZU CAPITAL",
  publisher: "SOZU CAPITAL",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const metadataEs: Metadata = {
  ...shared,
  title: "SOZU CAPITAL | Dinero smart para Latinoamérica",
  description:
    "Dinero smart para personas y negocios en Latinoamérica: pagos y financiamiento en dólares digitales estables (USDC en Stellar)—billetera no custodial, flujos globales y crédito integrado. Cobra, paga y finánciate con menos fricción y custodia tuya.",
  keywords: [
    "DeFi",
    "Latinoamérica",
    "USDC",
    "Stellar",
    "pagos",
    "stablecoin",
    "no custodial",
    "Sozu",
    "fintech",
  ],
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: base,
    siteName: "SOZU CAPITAL",
    title: "SOZU CAPITAL | Dinero smart para Latinoamérica",
    description:
      "Infraestructura de pagos y financiamiento no custodial en USDC (Stellar): billetera, flujo de caja, rampas y crédito en un solo stack.",
    images: [{ url: "/android-chrome-192x192.png", width: 192, height: 192, alt: "SOZU CAPITAL" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SOZU CAPITAL | Dinero smart",
    description:
      "Dinero smart en Latinoamérica: Sozu—pagos USDC (Stellar) no custodial, billetera, rampas y financiamiento en un solo lugar.",
    images: ["/android-chrome-192x192.png"],
    creator: "@sozucapital",
  },
  alternates: {
    canonical: base,
    languages: { es: base, en: `${base}/en` },
  },
};

export const metadataEn: Metadata = {
  ...shared,
  title: "SOZU CAPITAL | Smart money for Latin America",
  description:
    "Smart money for people and businesses in Latin America: payments and financing on stable digital dollars (USDC on Stellar)—non-custodial wallet, global flows, and integrated credit. Collect, pay, and finance with less friction and custody that stays yours.",
  keywords: [
    "decentralized finance",
    "Latin America",
    "USDC",
    "Stellar",
    "payments",
    "stablecoin",
    "non-custodial",
    "Sozu",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${base}/en`,
    siteName: "SOZU CAPITAL",
    title: "SOZU CAPITAL | Smart money for Latin America",
    description:
      "Smart money for Latin America and beyond: non-custodial payments and financing on USDC (Stellar)—wallet, cash flow, ramps, and credit in one stack.",
    images: [{ url: "/android-chrome-192x192.png", width: 192, height: 192, alt: "SOZU CAPITAL" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Economy of the Future | SOZU CAPITAL",
    description:
      "Smart money for Latin America: Sozu—non-custodial USDC (Stellar) payments, wallet, ramps, and financing in one place.",
    images: ["/android-chrome-192x192.png"],
    creator: "@sozucapital",
  },
  alternates: {
    canonical: `${base}/en`,
    languages: { es: base, en: `${base}/en` },
  },
};
