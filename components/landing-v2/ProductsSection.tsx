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
      <div className="grid gap-6 md:grid-cols-3">
        {copy.items.map((p) => (
          <article
            key={p.name}
            className="group flex min-h-[220px] flex-col rounded-[32px] border border-white/5 bg-[#111] p-8 transition-[border-color,box-shadow] duration-300 hover:border-[#ff8000]/25 hover:shadow-[0_0_48px_rgba(255,128,0,0.1)]"
          >
            <h3 className="mb-4 text-xl font-semibold text-white">{p.name}</h3>
            <p className="mt-auto text-sm leading-relaxed text-white/55">{p.summary}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
