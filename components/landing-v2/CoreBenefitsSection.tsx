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
      withVideoBackground
    >
      <div className="grid gap-4 md:grid-cols-2">
        {copy.items.map((b) => (
          <div
            key={b.title}
            className="rounded-[32px] border border-border bg-surface/90 p-8 backdrop-blur-sm transition-[border-color,box-shadow] duration-300 hover:border-primary/20 hover:shadow-lg md:p-10"
          >
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.1875rem] text-primary">
              {b.title}
            </h3>
            <p className="leading-relaxed text-muted">{b.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
