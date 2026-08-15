import Link from "next/link";
import type { LandingCopy, LandingLocale } from "@/lib/landing-copy";
import { SiteHeader } from "./SiteHeader";
import { FooterSection } from "./FooterSection";

export type RoadmapPageProps = {
  locale: LandingLocale;
  copy: LandingCopy;
};

type RoadmapItem = { title: string; body: string; timing?: string };

function RoadmapColumn({
  label,
  title,
  description,
  items,
  tone,
}: {
  label: string;
  title: string;
  description: string;
  items: RoadmapItem[];
  tone: "shipped" | "building" | "upcoming";
}) {
  const badgeClass =
    tone === "shipped"
      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
      : tone === "building"
        ? "border-[#ff8000]/30 bg-[#ff8000]/10 text-[#ff8000]"
        : "border-white/20 bg-white/5 text-white/70";

  return (
    <article className="flex flex-col gap-8 rounded-[32px] border border-white/5 bg-[#0d0d0d] p-8 md:p-10">
      <div className="flex flex-col gap-4">
        <span
          className={`inline-flex w-fit rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${badgeClass}`}
        >
          {label}
        </span>
        <h2 className="font-display text-2xl font-bold tracking-[-0.02em] text-white md:text-3xl">
          {title}
        </h2>
        <p className="text-base leading-7 text-white/60">{description}</p>
      </div>

      <ul className="flex flex-col gap-6">
        {items.map((item) => (
          <li
            key={item.title}
            className="border-t border-white/5 pt-6 first:border-t-0 first:pt-0"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h3 className="text-base font-semibold leading-6 text-white">{item.title}</h3>
              {item.timing ? (
                <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.15em] text-white/30">
                  {item.timing}
                </span>
              ) : null}
            </div>
            <p className="mt-2 text-sm leading-6 text-white/50">{item.body}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}

export function RoadmapPage({ locale, copy }: RoadmapPageProps) {
  const basePath = locale === "en" ? "/en" : "";
  const rm = copy.roadmapPage;

  return (
    <div className="landing-v2-grain min-h-screen bg-[#0a0a0a] text-white">
      <SiteHeader copy={copy} basePath={basePath} />
      <main className="relative z-[2] pt-20">
        <section
          aria-label={rm.ariaLabel}
          className="border-b border-white/5 py-20 md:py-28"
        >
          <div className="mx-auto max-w-[75rem] px-5 md:px-12 xl:px-20">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.1875rem] text-[#ff8000]">
              {rm.eyebrow}
            </p>
            <h1 className="max-w-3xl font-display text-3xl font-bold tracking-[-0.02em] text-white md:text-[48px] md:leading-[1.1]">
              {rm.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/60">{rm.description}</p>

            <div className="mt-16 grid gap-8 lg:grid-cols-3">
              <RoadmapColumn
                label={rm.shipped.label}
                title={rm.shipped.title}
                description={rm.shipped.description}
                items={rm.shipped.items}
                tone="shipped"
              />
              <RoadmapColumn
                label={rm.building.label}
                title={rm.building.title}
                description={rm.building.description}
                items={rm.building.items}
                tone="building"
              />
              <RoadmapColumn
                label={rm.upcoming2026.label}
                title={rm.upcoming2026.title}
                description={rm.upcoming2026.description}
                items={rm.upcoming2026.items}
                tone="upcoming"
              />
            </div>

            <p className="mt-12 max-w-2xl font-mono text-xs uppercase tracking-[0.15em] text-white/30">
              {rm.disclaimer}
            </p>

            <Link
              href={basePath || "/"}
              className="mt-10 inline-flex rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:border-[#ff8000]/30 hover:bg-white/10"
            >
              {rm.backCta}
            </Link>
          </div>
        </section>
      </main>
      <FooterSection copy={copy.footer} basePath={basePath} />
    </div>
  );
}
