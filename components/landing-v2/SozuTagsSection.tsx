import Link from "next/link";
import type { LandingCopy, LandingLocale } from "@/lib/landing-copy";
import { SozuTagAvailabilitySearch } from "./SozuTagAvailabilitySearch";

const TAG_EXAMPLES = ["$joaquin", "$cafe.noma", "importadora.cl"] as const;

const ORANGE_GLOW =
  "radial-gradient(circle, rgba(255,128,0,0.05) 0%, rgba(255,128,0,0) 70%)";

type Props = {
  copy: LandingCopy;
  basePath: string;
  locale: LandingLocale;
};

export function SozuTagsSection({ copy, basePath, locale }: Props) {
  const t = copy.sozuTags;
  const p = (href: string) => `${basePath}${href}`;

  return (
    <section
      id="sozu-tags"
      aria-labelledby="sozu-tags-heading"
      className="relative scroll-mt-24 overflow-hidden border-b border-white/5 px-5 py-32 md:px-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 size-[800px] -translate-x-1/2"
        style={{ backgroundImage: ORANGE_GLOW }}
      />

      <div className="relative mx-auto max-w-[75rem]">
        <header className="mx-auto mb-16 max-w-[56rem] text-center md:mb-20">
          <div className="mb-6 flex items-center justify-center gap-2">
            <span className="size-2 rounded-full bg-[#ff8000]" aria-hidden />
            <p className="text-sm font-bold uppercase tracking-[0.1875rem] text-[#ff8000]">
              {t.eyebrow}
            </p>
          </div>
          <h2
            id="sozu-tags-heading"
            className="font-display mb-6 text-4xl font-bold tracking-[-0.02em] text-white md:text-[56px] md:leading-[64px] text-balance"
          >
            {t.title}
          </h2>
          <p className="mx-auto max-w-[42rem] text-lg leading-[30px] text-white/60 md:text-xl">
            {t.description}
          </p>
        </header>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 lg:items-start">
          <SozuTagAvailabilitySearch
            messages={copy.tagSearch}
            locale={locale}
            onboardingHref={`${basePath}/onboarding`}
            examples={TAG_EXAMPLES}
          />

          <div className="flex flex-col gap-6">
            <div className="grid gap-0 overflow-hidden rounded-[32px] border border-white/10 divide-y divide-white/10 sm:grid-cols-2 sm:divide-y-0 sm:divide-x">
              {t.benefits.map((b) => (
                <div key={b.title} className="bg-[#0d0d0d]/80 p-6 md:p-8">
                  <h3 className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#ff8000]">
                    {b.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/50">{b.body}</p>
                </div>
              ))}
            </div>

            <p className="text-sm leading-relaxed text-white/55 md:text-base">
              {t.identityLead}{" "}
              <span className="font-medium text-white">{t.identityLayer}</span>
              {t.identityAnd}
              <span className="font-medium text-white">{t.identityMoat}</span>
              {t.identityRest}
            </p>
          </div>
        </div>

        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.mustHaves.map((item) => (
            <li
              key={item.title}
              className="rounded-2xl border border-white/10 bg-[#0d0d0d]/60 p-5 text-sm"
            >
              <p className="mb-2 font-semibold text-white">{item.title}</p>
              <p className="leading-relaxed text-white/45">{item.body}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12 rounded-[32px] border border-[#ff8000]/20 bg-[rgba(255,128,0,0.06)] p-6 md:p-8">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#ff8000]">
            {t.killerEyebrow}
          </p>
          <p className="text-lg font-semibold text-white text-balance md:text-xl">
            {t.killerTitle}
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/50">
            {t.killerBody}
            <Link href={p("#smart-receipts")} className="text-[#ff8000] hover:underline">
              {t.killerReceiptsLink}
            </Link>
            {t.killerBodyAfter}
          </p>
        </div>
      </div>
    </section>
  );
}
