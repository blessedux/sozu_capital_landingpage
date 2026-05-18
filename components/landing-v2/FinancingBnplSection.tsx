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
      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        <div className="rounded-2xl border border-border/50 bg-surface-elevated/35 p-6 md:p-8 border-l-[3px] border-l-primary">
          <h3 className="font-semibold text-lg mb-3">{copy.bnplTitle}</h3>
          <p className="text-muted text-sm leading-relaxed">{copy.bnplBody}</p>
        </div>
        <div className="rounded-2xl border border-border/50 bg-surface-elevated/35 p-6 md:p-8">
          <h3 className="font-semibold text-lg mb-3">{copy.wcTitle}</h3>
          <p className="text-muted text-sm leading-relaxed">{copy.wcBody}</p>
        </div>
      </div>
    </Section>
  );
}
