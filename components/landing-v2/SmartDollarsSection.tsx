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
            className="group rounded-[32px] border border-white/5 bg-[#111] p-8 transition-[border-color,box-shadow] duration-300 hover:border-[#ff8000]/20 hover:shadow-[0_0_40px_rgba(255,128,0,0.08)]"
          >
            <h3 className="mb-3 text-lg font-semibold text-white">{item.title}</h3>
            <p className="text-sm leading-relaxed text-white/55">{item.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
