import type { LandingCopy } from "@/lib/landing-copy";
import { Section } from "./Section";

type Props = { copy: LandingCopy["smartReceipts"] };

export function SmartReceiptsSection({ copy }: Props) {
  return (
    <Section
      id="smart-receipts"
      eyebrow={copy.eyebrow}
      title={copy.title}
      description={copy.description}
    >
      <p className="mb-10 text-xl md:text-2xl font-semibold text-foreground text-balance max-w-2xl">
        {copy.pullQuote}
      </p>

      <div className="grid md:grid-cols-2 gap-4 mb-12">
        {copy.features.map((f) => (
          <div
            key={f.title}
            className="rounded-2xl border border-border/60 bg-surface-elevated/40 p-6 md:p-8"
          >
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-3">
              {f.title}
            </h3>
            <p className="text-muted text-sm leading-relaxed">{f.body}</p>
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4 max-w-4xl">
        {copy.benefits.map((b) => (
          <div key={b.title} className="rounded-xl border border-border/50 p-5 bg-surface/40">
            <h3 className="font-medium text-foreground mb-2">{b.title}</h3>
            <p className="text-muted text-sm leading-relaxed">{b.body}</p>
          </div>
        ))}
      </div>

      <p className="mt-10 text-sm text-muted max-w-2xl leading-relaxed italic">
        {copy.footnote}
      </p>
    </Section>
  );
}
