import type { LandingCopy } from "@/lib/landing-copy";
import { PartnersMarquee } from "./PartnersMarquee";
import { PARTNER_LOGOS } from "./partner-logos";

type Props = { copy: LandingCopy["partners"] };

export function PartnersSection({ copy }: Props) {
  return (
    <section
      id="partners"
      aria-label={copy.ariaLabel}
      className="flex flex-col items-center gap-12 !bg-transparent py-24"
    >
      <p className="max-w-md text-center text-sm font-medium uppercase leading-5 tracking-[0.2em] text-[#6b7280]">
        {copy.heading}
      </p>

      <PartnersMarquee logos={PARTNER_LOGOS} className="w-full" />
    </section>
  );
}
