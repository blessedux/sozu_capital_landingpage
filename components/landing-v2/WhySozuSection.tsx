import type { LandingCopy } from "@/lib/landing-copy";
import { Section } from "./Section";

type Props = { copy: LandingCopy["whySozu"] };

export function WhySozuSection({ copy }: Props) {
  return (
    <Section
      id="why-sozu"
      eyebrow={copy.eyebrow}
      title={copy.title}
      description={copy.description}
    >
      <div className="grid max-w-4xl gap-6 md:grid-cols-2">
        <blockquote className="rounded-[32px] border border-white/5 bg-[#111] p-8 md:p-10">
          <p className="text-lg font-medium leading-snug text-white md:text-xl">
            {copy.quoteLead}
            <span className="text-[#ff8000]">{copy.quoteHighlight}</span>
            {copy.quoteRest}
          </p>
        </blockquote>
        <div className="rounded-[32px] border border-white/5 bg-white/[0.03] p-8 md:p-10">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.1875rem] text-[#ff8000]">
            {copy.feelEyebrow}
          </p>
          <p className="text-sm leading-relaxed text-white/55">{copy.feelBody}</p>
        </div>
      </div>
    </Section>
  );
}
