import type { LandingCopy } from "@/lib/landing-copy";
import { Section } from "./Section";

type Props = { copy: LandingCopy["smartMoney"] };

export function SmartDollarsSection({ copy }: Props) {
  return (
    <Section
      id="smart-money"
      eyebrow={copy.eyebrow}
      title={copy.title}
      description={copy.description}
    >
      <ul className="grid gap-6 md:grid-cols-3">
        {copy.cards.map((item) => (
          <li
            key={item.title}
            className="rounded-2xl border border-border/60 p-6 md:p-8 bg-surface-elevated/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
          >
            <h3 className="font-medium text-lg text-foreground mb-3">{item.title}</h3>
            <p className="text-sm text-muted leading-relaxed">{item.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
