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
            className="rounded-[32px] border border-white/10 bg-black/40 p-8 backdrop-blur-[6px] transition-[border-color,box-shadow] duration-300 hover:border-[#ff8000]/20 hover:shadow-[0_0_40px_rgba(255,128,0,0.07)] md:p-10"
          >
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.1875rem] text-[#ff8000]">
              {b.title}
            </h3>
            <p className="leading-relaxed text-white/55">{b.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
