import type { Metadata } from "next";
import { ogCopy } from "@/content/og";

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
  title: ogCopy.es.pageTitle,
  description: ogCopy.es.pageDescription,
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
    title: ogCopy.es.title,
    description: ogCopy.es.description,
  },
  twitter: {
    card: "summary_large_image",
    title: ogCopy.es.title,
    description: ogCopy.es.description,
    creator: "@sozucapital",
  },
  alternates: {
    canonical: base,
    languages: { es: base, en: `${base}/en` },
  },
};

export const metadataEn: Metadata = {
  ...shared,
  title: ogCopy.en.pageTitle,
  description: ogCopy.en.pageDescription,
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
    title: ogCopy.en.title,
    description: ogCopy.en.description,
  },
  twitter: {
    card: "summary_large_image",
    title: ogCopy.en.title,
    description: ogCopy.en.description,
    creator: "@sozucapital",
  },
  alternates: {
    canonical: `${base}/en`,
    languages: { es: base, en: `${base}/en` },
  },
};
