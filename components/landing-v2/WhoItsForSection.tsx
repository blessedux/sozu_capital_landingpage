import type { LandingCopy } from "@/lib/landing-copy";
import { Section } from "./Section";

type Props = { copy: LandingCopy["whoItsFor"] };

export function WhoItsForSection({ copy }: Props) {
  return (
    <Section
      id="who-its-for"
      eyebrow={copy.eyebrow}
      title={copy.title}
      description={copy.description}
    >
      <ul className="grid max-w-4xl gap-5 sm:grid-cols-2">
        {copy.personas.map(({ line, detail }) => (
          <li
            key={line}
            className="rounded-[24px] border border-white/5 bg-[#111] p-6 transition-[border-color] duration-300 hover:border-[#ff8000]/20"
          >
            <p className="flex items-start gap-3 font-mono text-sm leading-snug text-white">
              <span className="mt-0.5 shrink-0 text-[#ff8000]">/</span>
              <span>{line}</span>
            </p>
            <p className="mt-3 pl-6 text-xs leading-relaxed text-white/45">{detail}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
