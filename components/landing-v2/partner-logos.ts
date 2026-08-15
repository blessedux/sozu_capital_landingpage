export const PARTNER_LOGOS = [
  {
    src: "/partners/funding-the-commons.svg",
    alt: "Funding the Commons",
    href: "https://fundingthecommons.io/",
    width: 549,
    height: 176,
  },
  {
    src: "/partners/circle.svg",
    alt: "Circle",
    href: "https://circle.com/",
    width: 481,
    height: 124,
  },
  {
    src: "/partners/bitcoin-design-foundation.svg",
    alt: "Bitcoin Design Foundation",
    href: "https://bitcoindesignfoundation.org/",
    width: 372,
    height: 173,
    scale: 0.5,
  },
  {
    src: "/partners/unblck_pfp_nobg.svg",
    alt: "Unblck",
    href: "https://www.unblck.cl/",
    width: 1254,
    height: 1254,
    scale: 0.5,
  },
  {
    src: "/partners/stellar.svg",
    alt: "Stellar",
    href: "https://stellar.org/",
    width: 555,
    height: 171,
  },
] as const;

export type PartnerLogo = (typeof PARTNER_LOGOS)[number];

export function partnerLogoScale(logo: PartnerLogo): number {
  return "scale" in logo && typeof logo.scale === "number" ? logo.scale : 1;
}
