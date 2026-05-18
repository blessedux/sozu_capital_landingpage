import type { LandingCopy } from "@/lib/landing-copy";
import { Section } from "./Section";

type Props = { copy: LandingCopy["coreBenefits"] };

export function CoreBenefitsSection({ copy }: Props) {
  return (
    <Section
      id="core-benefits"
      eyebrow={copy.eyebrow}
      title={copy.title}
      description={copy.description}
    >
      <div className="grid gap-4 md:grid-cols-2">
        {copy.items.map((b) => (
          <div
            key={b.title}
            className="rounded-2xl border border-border/60 bg-surface-elevated/40 p-8 md:p-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
          >
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-4">
              {b.title}
            </h3>
            <p className="text-muted leading-relaxed">{b.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
