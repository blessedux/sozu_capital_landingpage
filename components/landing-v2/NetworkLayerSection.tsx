import Image from "next/image";
import type { LandingCopy } from "@/lib/landing-copy";

type Props = { copy: LandingCopy["networkLayer"] };

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

export function NetworkLayerSection({ copy }: Props) {
  return (
    <section
      id="network"
      aria-label={copy.ariaLabel}
      className="relative overflow-hidden px-5 py-32 md:px-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 size-[800px] -translate-x-1/2 -translate-y-1/2"
        style={{ backgroundImage: ORANGE_GLOW }}
      />

      <div className="relative mx-auto max-w-[75rem]">
        <header className="mx-auto mb-20 max-w-[56rem] text-center">
          <div className="mb-6 flex items-center justify-center gap-2">
            <span className="size-2 rounded-full bg-[#ff8000]" aria-hidden />
            <p className="text-sm font-bold uppercase tracking-[0.1875rem] text-[#ff8000]">
              {copy.eyebrow}
            </p>
          </div>
          <h2 className="font-display mb-8 text-4xl font-bold tracking-[-0.02em] text-white md:text-[64px] md:leading-[72px]">
            {copy.title}
          </h2>
          <p className="mx-auto mb-6 max-w-[54rem] text-lg leading-[34px] text-white/70 md:text-[22px]">
            {copy.description}
          </p>
          <p className="text-lg leading-7 text-white/40">{copy.tagline}</p>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {copy.cards.map((card) => (
            <NetworkCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
