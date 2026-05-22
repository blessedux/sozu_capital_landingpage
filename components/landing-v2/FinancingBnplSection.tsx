import type { LandingCopy } from "@/lib/landing-copy";
import { Section } from "./Section";

type Props = { copy: LandingCopy["financing"] };

export function FinancingBnplSection({ copy }: Props) {
  return (
    <Section
      id="financing-bnpl"
      eyebrow={copy.eyebrow}
      title={copy.title}
      description={copy.description}
    >
      <div className="grid gap-6 md:grid-cols-2 md:gap-8">
        <div className="rounded-[32px] border border-l-[3px] border-white/5 border-l-[#ff8000] bg-[#111] p-8 transition-[box-shadow] duration-300 hover:shadow-[0_0_48px_rgba(255,128,0,0.1)]">
          <h3 className="mb-3 text-lg font-semibold text-white">{copy.bnplTitle}</h3>
          <p className="text-sm leading-relaxed text-white/55">{copy.bnplBody}</p>
        </div>
        <div className="rounded-[32px] border border-white/5 bg-[#111] p-8 transition-[border-color,box-shadow] duration-300 hover:border-[#ff8000]/20 hover:shadow-[0_0_48px_rgba(255,128,0,0.08)]">
          <h3 className="mb-3 text-lg font-semibold text-white">{copy.wcTitle}</h3>
          <p className="text-sm leading-relaxed text-white/55">{copy.wcBody}</p>
        </div>
      </div>
    </Section>
  );
}
