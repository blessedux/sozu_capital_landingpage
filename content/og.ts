export const OG_SIZE = { width: 1200, height: 630 } as const;

export type OgLocale = "en" | "es";

export type OgCopy = {
  /** Overlay headline — matches the landing H1, wrapped for 1200×630. */
  titleLines: readonly [string, string];
  /** What the product does, in one line. */
  oneLiner: string;
  /** og:title / twitter:title */
  title: string;
  /** og:description / twitter:description */
  description: string;
  /** Longer page <title> + meta description */
  pageTitle: string;
  pageDescription: string;
  alt: string;
};

export const ogCopy: Record<OgLocale, OgCopy> = {
  en: {
    titleLines: ["Internet Money", "you can trust."],
    oneLiner: "Hold, send, and cash out digital dollars.",
    title: "Internet Money you can trust",
    description: "Hold, send, and cash out digital dollars.",
    pageTitle: "SOZU CAPITAL | Internet Money you can trust",
    pageDescription:
      "Hold, send, and cash out digital dollars — built to grow, not erode. Non-custodial money for Latin America.",
    alt: "SOZU — Internet Money you can trust. Hold, send, and cash out digital dollars.",
  },
  es: {
    titleLines: ["Dinero online", "que te pertenece."],
    oneLiner: "Ahorra, envía y retira dólares digitales.",
    title: "Dinero online que te pertenece",
    description: "Ahorra, envía y retira dólares digitales.",
    pageTitle: "SOZU CAPITAL | Dinero online que te pertenece",
    pageDescription:
      "Ahorra, envía y retira dólares digitales — hecho para crecer, sin erosión. Dinero no custodial para Latinoamérica.",
    alt: "SOZU — Dinero online que te pertenece. Ahorra, envía y retira dólares digitales.",
  },
};
