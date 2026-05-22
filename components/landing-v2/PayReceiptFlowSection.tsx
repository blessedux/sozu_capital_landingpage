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
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.1875rem] text-[#ff8000]">
            {copy.stepsTitle}
          </h3>
          <ol className="space-y-4">
            {copy.steps.map((step, i) => (
              <li key={step} className="flex gap-4">
                <span className="w-8 shrink-0 font-mono text-sm text-[#ff8000]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="leading-relaxed text-white/60">{step}</span>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-lg font-medium text-white">{copy.tagline}</p>
        </div>

        <div className="space-y-6 rounded-[32px] border border-white/5 bg-[#111] p-8">
          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.1875rem] text-[#ff8000]">
              {copy.posTitle}
            </h3>
            <p className="text-sm leading-relaxed text-white/55">{copy.posBody}</p>
          </div>
          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.1875rem] text-[#ff8000]">
              {copy.optimizeTitle}
            </h3>
            <p className="text-sm leading-relaxed text-white/55">{copy.optimizeBody}</p>
          </div>
          <p className="border-t border-white/10 pt-3 font-mono text-xs uppercase tracking-wider text-white/30">
            {copy.footnote}
          </p>
        </div>
      </div>
    </Section>
  );
}
