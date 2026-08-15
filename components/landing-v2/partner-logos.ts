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
