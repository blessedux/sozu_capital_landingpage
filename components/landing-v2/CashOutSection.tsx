import type { LandingCopy } from "@/lib/landing-copy";
import { Section } from "./Section";

type Props = { copy: LandingCopy["cashOut"] };

export function CashOutSection({ copy }: Props) {
  return (
    <Section
      id="cash-out"
      eyebrow={copy.eyebrow}
      title={copy.title}
      description={copy.description}
    >
      <div className="max-w-2xl space-y-6 leading-relaxed text-white/60">
        <p>{copy.p1}</p>
        <p>{copy.p2}</p>
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-white/30">
          {copy.disclaimer}
        </p>
      </div>
    </Section>
  );
}
