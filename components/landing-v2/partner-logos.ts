export const PARTNER_LOGOS = [
  {
    src: "/partners/makers-fund.svg",
    alt: "Makers Fund",
    width: 144,
    height: 140,
  },
  {
    src: "/partners/funding-the-commons.svg",
    alt: "Funding the Commons",
    width: 549,
    height: 176,
  },
  {
    src: "/partners/circle.svg",
    alt: "Circle",
    width: 481,
    height: 124,
  },
  {
    src: "/partners/stellar.svg",
    alt: "Stellar",
    width: 555,
    height: 171,
  },
  {
    src: "/partners/bitcoin-design-foundation.svg",
    alt: "Bitcoin Design Foundation",
    width: 372,
    height: 173,
  },
  {
    src: "/partners/conomy-hq.svg",
    alt: "conomy_hq",
    width: 750,
    height: 171,
  },
] as const;

export type PartnerLogo = (typeof PARTNER_LOGOS)[number];
