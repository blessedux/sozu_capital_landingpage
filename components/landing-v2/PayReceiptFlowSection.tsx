import type { LandingCopy } from "@/lib/landing-copy";
import { Section } from "./Section";

type Props = { copy: LandingCopy["payFlow"] };

export function PayReceiptFlowSection({ copy }: Props) {
  return (
    <Section
      id="pay-receipt-flow"
      eyebrow={copy.eyebrow}
      title={copy.title}
      description={copy.description}
    >
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14 items-start">
        <div>
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-6">
            {copy.stepsTitle}
          </h3>
          <ol className="space-y-4">
            {copy.steps.map((step, i) => (
              <li key={step} className="flex gap-4">
                <span className="font-mono text-sm text-primary shrink-0 w-8">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-muted leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-lg font-medium text-foreground text-balance">{copy.tagline}</p>
        </div>

        <div className="rounded-2xl border border-border/60 bg-surface-elevated/45 p-6 md:p-8 space-y-6">
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-3">
              {copy.posTitle}
            </h3>
            <p className="text-muted text-sm leading-relaxed">{copy.posBody}</p>
          </div>
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-3">
              {copy.optimizeTitle}
            </h3>
            <p className="text-muted text-sm leading-relaxed">{copy.optimizeBody}</p>
          </div>
          <p className="text-xs text-foreground/45 font-mono uppercase tracking-wider pt-2 border-t border-border/40">
            {copy.footnote}
          </p>
        </div>
      </div>
    </Section>
  );
}
