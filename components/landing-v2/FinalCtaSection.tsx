import Image from "next/image";
import Link from "next/link";
import type { LandingCopy } from "@/lib/landing-copy";

type Props = {
  copy: LandingCopy["finalCta"];
  basePath: string;
};

const CTA_GLOW =
  "radial-gradient(circle, rgba(255,128,0,0.12) 0%, rgba(255,128,0,0) 60%)";

export function FinalCtaSection({ copy, basePath }: Props) {
  return (
    <section
      id="final-cta"
      aria-label={copy.ariaLabel}
      className="relative isolate overflow-hidden px-5 py-40 md:px-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 z-[1] size-[1000px] -translate-x-1/2 -translate-y-1/2"
        style={{ backgroundImage: CTA_GLOW }}
      />

      <div className="relative z-[2] mx-auto flex max-w-[64rem] flex-col items-center text-center">
        <h2 className="font-display pb-8 text-4xl font-bold leading-tight tracking-[-0.02em] text-white md:text-[72px] md:leading-[80px]">
          {copy.titleLine1}
          <br />
          {copy.titleLine2}
          <br />
          {copy.titleLine3}
        </h2>
        <p className="mb-16 max-w-3xl text-lg leading-9 text-white/60 md:text-2xl md:leading-9">
          {copy.descriptionLine1}
          <br />
          {copy.descriptionLine2}
          <br />
          {copy.descriptionLine3}
        </p>

        <Link
          href={`${basePath}/onboarding`}
          className="mb-8 rounded-full bg-gradient-to-br from-[#ff8000] to-[#df774f] px-14 py-6 text-[22px] font-bold text-black shadow-[0_0_25px_rgba(255,128,0,0.4)] transition-opacity hover:opacity-95"
        >
          {copy.cta}
        </Link>

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-3">
          <div className="flex -space-x-3">
            {copy.avatars.map((src) => (
              <Image
                key={src}
                src={src}
                alt=""
                width={32}
                height={32}
                className="size-8 rounded-full border-2 border-[#0a0a0a] object-cover"
              />
            ))}
          </div>
          <p className="text-sm font-medium uppercase tracking-[0.06em] text-white/30">
            {copy.socialProof}
          </p>
        </div>
      </div>
    </section>
  );
}
