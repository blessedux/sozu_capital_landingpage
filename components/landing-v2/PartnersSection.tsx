import type { LandingCopy } from "@/lib/landing-copy";
import { PartnersMarquee } from "./PartnersMarquee";
import { PARTNER_LOGOS } from "./partner-logos";

type Props = { copy: LandingCopy["partners"] };

export function PartnersSection({ copy }: Props) {
  return (
    <section
      id="partners"
      aria-label={copy.ariaLabel}
      className="relative z-[11] flex flex-col items-center gap-8 bg-background py-16"
    >
      <p className="relative z-10 max-w-md text-center text-sm font-medium uppercase leading-5 tracking-[0.2em] text-muted">
        {copy.heading}
      </p>

      <PartnersMarquee logos={PARTNER_LOGOS} className="relative z-10 w-full" />
    </section>
  );
}
