import Link from "next/link";
import type { LandingCopy } from "@/lib/landing-copy";

type Props = {
  copy: LandingCopy["pricing"];
  basePath: string;
};

export function PricingSection({ copy, basePath }: Props) {
  const ctaHref = `${basePath}/onboarding`;

  return (
    <section id="pricing" aria-label={copy.ariaLabel} className="px-5 py-32 md:px-20">
      <div className="mx-auto flex max-w-[75rem] flex-col gap-20">
        <header className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <h1 className="font-display text-4xl font-bold tracking-[-0.02em] text-white md:text-[56px] md:leading-[1.1]">
            {copy.title}
          </h1>
          <p className="text-lg leading-8 text-white/60">{copy.description}</p>
        </header>

        <div className="rounded-[40px] border border-white/10 bg-[#111]/80 p-8 backdrop-blur-[6px] md:p-12 lg:p-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.1875rem] text-[#ff8000]">
              {copy.model.eyebrow}
            </p>
            <h2 className="font-display text-3xl font-bold tracking-[-0.02em] text-white md:text-[40px] md:leading-[1.15]">
              {copy.model.title}
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/60">{copy.model.description}</p>
          </div>

          <ul className="mt-14 grid gap-4 md:grid-cols-3 md:gap-6">
            {copy.items.map((item) => (
              <li
                key={item.name}
                className="flex flex-col rounded-[32px] border border-white/10 bg-black/40 p-8 backdrop-blur-[6px]"
              >
                <div className="mb-6 flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                  {item.badge ? (
                    <span className="shrink-0 rounded-full bg-[#ff8000]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#ff8000]">
                      {item.badge}
                    </span>
                  ) : null}
                </div>
                <p className="mb-4 flex items-baseline gap-2">
                  <span className="font-display text-4xl font-bold tracking-tight text-white">
                    {item.price}
                  </span>
                  {item.period ? (
                    <span className="text-sm text-white/45">{item.period}</span>
                  ) : null}
                </p>
                <p className="mt-auto text-sm leading-relaxed text-white/55">{item.description}</p>
              </li>
            ))}
          </ul>

          <p className="mx-auto mt-10 max-w-2xl text-center font-mono text-xs uppercase tracking-[0.12em] text-white/35">
            {copy.model.footnote}
          </p>

          <div className="mt-10 flex justify-center">
            <Link
              href={ctaHref}
              className="inline-flex rounded-full bg-[#ff8000] px-8 py-3.5 text-sm font-bold text-black shadow-[0_0_10px_rgba(255,128,0,0.3)] transition-colors hover:bg-[#ff8000]/90"
            >
              {copy.cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
