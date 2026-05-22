import type { LandingCopy } from "@/lib/landing-copy";
import { PartnersMarquee } from "./PartnersMarquee";
import { PARTNER_LOGOS } from "./partner-logos";

type Props = { copy: LandingCopy["partners"] };

export function PartnersSection({ copy }: Props) {
  return (
    <section
      id="partners"
      aria-label={copy.ariaLabel}
      className="relative z-[11] -mt-28 flex flex-col items-center gap-8 pb-24 pt-28"
    >
      {/* Full-section background: transparent top → black bottom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, #000000 60%)",
        }}
      />

      {/* Frosted-glass veil over the hero bleed-through zone */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-56"
        style={{
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          maskImage: "linear-gradient(to bottom, black 0%, black 40%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 40%, transparent 100%)",
        }}
      />

      {/* Content sits above both gradient and blur layers */}
      <p className="relative z-10 max-w-md text-center text-sm font-medium uppercase leading-5 tracking-[0.2em] text-[#6b7280]">
        {copy.heading}
      </p>

      <PartnersMarquee logos={PARTNER_LOGOS} className="relative z-10 w-full" />
    </section>
  );
}
