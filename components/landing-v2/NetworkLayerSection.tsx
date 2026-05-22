import Image from "next/image";
import Link from "next/link";
import type { LandingCopy } from "@/lib/landing-copy";

type Props = {
  copy: LandingCopy["networkLayer"];
  basePath: string;
};

const ORANGE_GLOW =
  "radial-gradient(circle, rgba(255,128,0,0.05) 0%, rgba(255,128,0,0) 70%)";

function NetworkCard({
  icon,
  title,
  description,
  statIcon,
  statLabel,
  statTone,
}: LandingCopy["networkLayer"]["cards"][number]) {
  const statClass =
    statTone === "emerald"
      ? "text-[#34d399]"
      : statTone === "orange"
        ? "text-[#ff8000]"
        : "text-white/40";

  return (
    <article className="flex flex-col overflow-hidden rounded-[40px] border border-white/5 bg-[#0d0d0d] p-10">
      <div className="mb-8 flex size-14 items-center justify-center rounded-2xl bg-[rgba(255,128,0,0.1)]">
        <Image src={icon} alt="" width={28} height={28} aria-hidden />
      </div>
      <h3 className="mb-4 text-2xl font-bold leading-9 text-white">{title}</h3>
      <p className="mb-8 flex-1 text-base leading-[26px] text-white/50">{description}</p>
      <div className="flex items-center gap-2">
        <Image src={statIcon} alt="" width={16} height={14} aria-hidden />
        <span className={`text-sm font-semibold leading-[21px] ${statClass}`}>{statLabel}</span>
      </div>
    </article>
  );
}

export function NetworkLayerSection({ copy, basePath }: Props) {
  const hasBullets = copy.bullets && copy.bullets.length > 0;

  return (
    <section
      id="network"
      aria-label={copy.ariaLabel}
      className="relative isolate overflow-hidden bg-[#0a0a0a] px-5 py-32 md:px-20"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="relative sticky top-0 h-[100lvh] w-full overflow-hidden">
          <Image
            src="/data_node.webp"
            alt=""
            fill
            className="object-cover opacity-40"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#0a0a0a]/55" />
          <div
            className="absolute left-1/2 top-1/2 size-[800px] -translate-x-1/2 -translate-y-1/2"
            style={{ backgroundImage: ORANGE_GLOW }}
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[75rem]">
        <header className="mx-auto mb-12 max-w-[56rem] text-center">
          <div className="mb-6 flex items-center justify-center gap-2">
            <span className="size-2 rounded-full bg-[#ff8000]" aria-hidden />
            <p className="text-sm font-bold uppercase tracking-[0.1875rem] text-[#ff8000]">
              {copy.eyebrow}
            </p>
          </div>
          <h2 className="font-display mb-8 text-4xl font-bold tracking-[-0.02em] text-white md:text-[64px] md:leading-[72px]">
            {copy.title}
          </h2>
          <p className="mx-auto max-w-[54rem] text-lg leading-[34px] text-white/70 md:text-[22px]">
            {copy.description}
          </p>
        </header>

        {hasBullets ? (
          <ul className="mx-auto mb-8 flex max-w-[44rem] flex-col gap-3 text-left">
            {copy.bullets!.map((bullet) => (
              <li key={bullet} className="flex items-center gap-3">
                <span className="size-1.5 shrink-0 rounded-full bg-[#ff8000]" aria-hidden />
                <span className="text-base leading-6 text-white/50">{bullet}</span>
              </li>
            ))}
          </ul>
        ) : null}

        <p className="w-full text-center text-lg leading-7 text-white/40">
          {copy.tagline}
        </p>

        {copy.cta ? (
          <div className="mt-8 mb-20 flex justify-center">
            <Link
              href={`${basePath}/onboarding`}
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.06] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:border-[#ff8000]/50 hover:bg-[#ff8000]/10"
            >
              {copy.cta}
            </Link>
          </div>
        ) : (
          <div className="mb-20" />
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {copy.cards.map((card) => (
            <NetworkCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
