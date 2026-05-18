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
      <div className="grid gap-6 md:grid-cols-2 max-w-4xl">
        <blockquote className="rounded-2xl border border-border/60 p-8 md:p-10 bg-surface-elevated/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          <p className="text-lg md:text-xl text-foreground/90 leading-snug font-medium text-pretty">
            {copy.quoteLead}
            <span className="text-primary">{copy.quoteHighlight}</span>
            {copy.quoteRest}
          </p>
        </blockquote>
        <div className="rounded-2xl border border-border/60 p-8 md:p-10 bg-surface/60">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-4">
            {copy.feelEyebrow}
          </p>
          <p className="text-muted text-sm leading-relaxed">{copy.feelBody}</p>
        </div>
      </div>
    </Section>
  );
}
