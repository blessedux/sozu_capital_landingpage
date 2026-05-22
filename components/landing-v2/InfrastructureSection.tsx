import Image from "next/image";
import type { LandingCopy } from "@/lib/landing-copy";

type Props = { copy: LandingCopy["infrastructure"] };

const LAYER_STYLES: Record<
  LandingCopy["infrastructure"]["stackLayers"][number]["variant"],
  string
> = {
  app: "border-[rgba(255,128,0,0.2)] bg-[rgba(255,128,0,0.05)]",
  intel: "border-white/10 bg-white/5",
  trust: "border-[rgba(52,211,153,0.2)] bg-[rgba(52,211,153,0.05)]",
  global: "border-white/10 bg-white/5",
};

const STACK_GLOW =
  "radial-gradient(circle, rgba(255,128,0,0.1) 0%, rgba(255,128,0,0) 70%)";

export function InfrastructureSection({ copy }: Props) {
  return (
    <section
      id="infrastructure"
      aria-label={copy.ariaLabel}
      className="relative overflow-hidden bg-[#0d0d0d] px-5 py-32 md:px-20"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-45"
      >
        <source src="/sozu_coins_pingpong.webm" type="video/webm" />
      </video>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[#0d0d0d]/45"
      />

      <div className="relative z-10 mx-auto grid max-w-[75rem] grid-cols-1 items-center gap-20 lg:grid-cols-2">
        <div>
          <p className="pb-6 text-sm font-bold uppercase tracking-[0.1875rem] text-[#df774f]">
            {copy.eyebrow}
          </p>
          <h2 className="font-display pb-8 text-4xl font-bold leading-tight tracking-[-0.02em] text-white md:text-[56px] md:leading-[62px]">
            {copy.titleLine1}
            <br />
            {copy.titleLine2}
          </h2>
          <p className="pb-8 text-lg leading-8 text-white/70 md:text-xl">{copy.description}</p>
          <blockquote className="border-l-2 border-[rgba(255,128,0,0.3)] pl-6 text-lg leading-[30px] text-white/40">
            {copy.quoteLine1}
            <br />
            {copy.quoteLine2}
          </blockquote>
          <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {copy.features.map((feature) => (
              <li key={feature.label} className="flex items-center gap-4">
                <Image src={feature.icon} alt="" width={20} height={20} aria-hidden />
                <span className="text-base font-medium text-white/80">{feature.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative flex min-h-[600px] items-center justify-center">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ backgroundImage: STACK_GLOW }}
          />
          <div className="relative w-full rounded-[48px] border border-white/10 bg-transparent p-12 backdrop-blur-[6px]">
            <div className="flex flex-col gap-6">
              {copy.stackLayers.map((layer) => (
                <div
                  key={layer.label}
                  className={`flex min-h-20 items-center rounded-2xl border px-6 py-4 ${LAYER_STYLES[layer.variant]}`}
                >
                  <span className="text-sm font-medium leading-snug tracking-[0.02em] text-white">
                    {layer.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-12 rounded-3xl border border-white/5 bg-black/40 p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs font-bold tracking-[0.12em] text-white">
                  {copy.uptimeLabel}
                </span>
                <span className="text-xs font-bold text-white">{copy.uptimeValue}</span>
              </div>
              <div className="h-1 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-full rounded-full bg-[#34d399]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
