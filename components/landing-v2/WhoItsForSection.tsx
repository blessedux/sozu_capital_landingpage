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
      <ul className="grid sm:grid-cols-2 gap-5 max-w-4xl">
        {copy.personas.map(({ line, detail }) => (
          <li
            key={line}
            className="rounded-xl border border-border/50 bg-surface-elevated/25 p-5"
          >
            <p className="flex gap-3 items-start font-mono text-sm text-foreground leading-snug">
              <span className="text-primary shrink-0 mt-0.5">/</span>
              <span>{line}</span>
            </p>
            <p className="mt-3 pl-6 text-xs text-muted leading-relaxed">{detail}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
