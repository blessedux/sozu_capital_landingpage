import type { LandingCopy } from "@/lib/landing-copy";
import { Section } from "./Section";

type Props = { copy: LandingCopy["products"] };

export function ProductsSection({ copy }: Props) {
  return (
    <Section
      id="products"
      eyebrow={copy.eyebrow}
      title={copy.title}
      description={copy.description}
    >
      <div className="grid md:grid-cols-3 gap-6">
        {copy.items.map((p) => (
          <article
            key={p.name}
            className="group rounded-2xl border border-border/60 bg-surface-elevated/35 p-8 flex flex-col min-h-[220px] hover:border-primary/35 hover:bg-surface-elevated/55 transition-colors"
          >
            <h3 className="text-xl font-semibold text-foreground mb-4">{p.name}</h3>
            <p className="text-muted text-sm leading-relaxed mt-auto">{p.summary}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
