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
      <div className="max-w-2xl space-y-6 text-muted leading-relaxed">
        <p>{copy.p1}</p>
        <p>{copy.p2}</p>
        <p className="text-sm font-mono text-foreground/40 uppercase tracking-[0.15em]">
          {copy.disclaimer}
        </p>
      </div>
    </Section>
  );
}
