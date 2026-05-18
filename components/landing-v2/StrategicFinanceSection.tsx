import Image from "next/image";
import type { LandingCopy } from "@/lib/landing-copy";
import { CapitalFlowChart } from "./strategic/CapitalFlowChart";
import { CreditHealthChart } from "./strategic/CreditHealthChart";

type Props = { copy: LandingCopy["strategicFinance"] };

function FinanceCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <article className="flex min-h-[400px] flex-col justify-between rounded-[40px] border border-white/5 bg-[#111] p-10">
      <div>
        <h3 className="pb-4 text-2xl font-semibold leading-8 text-white">{title}</h3>
        <p className="text-sm leading-[22.75px] text-[#6b7280]">{description}</p>
      </div>
      {children ? <div className="mt-auto pt-8">{children}</div> : null}
    </article>
  );
}

export function StrategicFinanceSection({ copy }: Props) {
  return (
    <section
      id="strategic-finance"
      aria-label={copy.ariaLabel}
      className="bg-black px-6 py-32 md:px-36"
    >
      <div className="mx-auto max-w-[72rem] px-6">
        <header className="mb-20 text-center">
          <h2 className="font-display pb-6 text-4xl font-bold leading-10 tracking-tight text-white">
            {copy.title}
          </h2>
          <p className="mx-auto max-w-xl text-base leading-6 text-[#9ca3af]">{copy.description}</p>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <FinanceCard title={copy.cards[0].title} description={copy.cards[0].description}>
            <div className="grid grid-cols-2 gap-4 opacity-50">
              {copy.paymentLogos.map((logo) => (
                <div
                  key={logo.src}
                  className="flex h-12 items-center justify-center rounded-xl bg-white/5"
                >
                  <Image src={logo.src} alt={logo.alt} width={logo.width} height={20} />
                </div>
              ))}
            </div>
          </FinanceCard>

          <FinanceCard title={copy.cards[1].title} description={copy.cards[1].description}>
            <div className="flex flex-col gap-3">
              {copy.approvals.map((row) => (
                <div
                  key={row.email}
                  className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-3"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={row.avatar}
                      alt=""
                      width={32}
                      height={32}
                      className="size-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-xs font-semibold text-white">{row.name}</p>
                      <p className="text-[10px] text-[#6b7280]">{row.email}</p>
                    </div>
                  </div>
                  <span className="rounded bg-[rgba(34,197,94,0.1)] px-2 py-1 text-[10px] font-semibold text-[#22c55e]">
                    {row.status}
                  </span>
                </div>
              ))}
            </div>
          </FinanceCard>

          <FinanceCard title={copy.cards[2].title} description={copy.cards[2].description}>
            <CapitalFlowChart
              title={copy.charts.capitalFlow.title}
              months={copy.charts.capitalFlow.months}
            />
          </FinanceCard>

          <FinanceCard title={copy.cards[3].title} description={copy.cards[3].description}>
            <CreditHealthChart {...copy.charts.creditHealth} />
          </FinanceCard>
        </div>
      </div>
    </section>
  );
}
