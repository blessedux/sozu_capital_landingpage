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
      <p className="mb-10 max-w-2xl text-xl font-semibold leading-snug text-white md:text-2xl">
        {copy.pullQuote}
      </p>

      <div className="mb-8 grid gap-4 md:grid-cols-2">
        {copy.features.map((f) => (
          <div
            key={f.title}
            className="rounded-[32px] border border-white/5 bg-[#111] p-8 transition-[border-color] duration-300 hover:border-[#ff8000]/20"
          >
            <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.1875rem] text-[#ff8000]">
              {f.title}
            </h3>
            <p className="text-sm leading-relaxed text-white/55">{f.body}</p>
          </div>
        ))}
      </div>

      <div className="grid max-w-4xl gap-4 sm:grid-cols-2">
        {copy.benefits.map((b) => (
          <div key={b.title} className="rounded-2xl border border-white/5 bg-white/[0.03] p-6">
            <h3 className="mb-2 font-semibold text-white">{b.title}</h3>
            <p className="text-sm leading-relaxed text-white/55">{b.body}</p>
          </div>
        ))}
      </div>

      <p className="mt-10 max-w-2xl text-sm italic leading-relaxed text-white/35">
        {copy.footnote}
      </p>
    </Section>
  );
}
