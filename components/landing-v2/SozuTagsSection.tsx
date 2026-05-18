import Link from "next/link";
import type { LandingCopy, LandingLocale } from "@/lib/landing-copy";
import { Section } from "./Section";
import { SozuTagAvailabilitySearch } from "./SozuTagAvailabilitySearch";

const TAG_EXAMPLES = ["$cafe.noma", "$joaquin", "$importadora.cl"] as const;

type Props = {
  copy: LandingCopy;
  basePath: string;
  locale: LandingLocale;
};

export function SozuTagsSection({ copy, basePath, locale }: Props) {
  const t = copy.sozuTags;
  const p = (href: string) => `${basePath}${href}`;

  return (
    <Section id="sozu-tags" eyebrow={t.eyebrow} title={t.title} description={t.description}>
      <SozuTagAvailabilitySearch
        messages={copy.tagSearch}
        locale={locale}
        onboardingHref={`${basePath}/onboarding`}
      />

      <div className="flex flex-wrap gap-3 mb-12">
        {TAG_EXAMPLES.map((tag) => (
          <span
            key={tag}
            className="font-mono text-sm md:text-base px-4 py-2 rounded-xl border border-primary/35 bg-primary/10 text-primary"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-0 border border-border/50 rounded-2xl overflow-hidden divide-y sm:divide-y-0 sm:divide-x divide-border/50">
        {t.benefits.map((b) => (
          <div key={b.title} className="p-6 md:p-8 bg-surface-elevated/30">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-3">
              {b.title}
            </h3>
            <p className="text-muted text-sm leading-relaxed">{b.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 md:mt-16 max-w-3xl space-y-6">
        <p className="text-foreground/85 leading-relaxed">
          {t.identityLead}{" "}
          <span className="text-foreground font-medium">{t.identityLayer}</span>
          {t.identityAnd}
          <span className="text-foreground font-medium">{t.identityMoat}</span>
          {t.identityRest}
        </p>
      </div>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {t.mustHaves.map((item) => (
          <li
            key={item.title}
            className="rounded-xl border border-border/50 bg-surface/50 p-5 text-sm"
          >
            <p className="font-medium text-foreground mb-2">{item.title}</p>
            <p className="text-muted leading-relaxed">{item.body}</p>
          </li>
        ))}
      </ul>

      <div className="mt-12 rounded-2xl border border-primary/25 bg-primary/5 p-6 md:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-3">
          {t.killerEyebrow}
        </p>
        <p className="text-lg md:text-xl font-semibold text-foreground text-balance">
          {t.killerTitle}
        </p>
        <p className="mt-4 text-muted text-sm leading-relaxed max-w-2xl">
          {t.killerBody}
          <Link href={p("#smart-receipts")} className="text-primary hover:underline">
            {t.killerReceiptsLink}
          </Link>
          {t.killerBodyAfter}
        </p>
      </div>
    </Section>
  );
}
