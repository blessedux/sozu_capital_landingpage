import Image from "next/image";

type CreditHealthChartProps = {
  score?: string;
  status?: string;
  utilizationLabel?: string;
  utilizationValue?: string;
  limitLabel?: string;
  limitValue?: string;
};

export function CreditHealthChart({
  score = "82%",
  status = "Excellent",
  utilizationLabel = "Utilization",
  utilizationValue = "12.4%",
  limitLabel = "Limit",
  limitValue = "$40,000",
}: CreditHealthChartProps) {
  return (
    <div className="flex w-full flex-col gap-8">
      <div className="relative mx-auto flex h-[200px] w-full max-w-[320px] items-center justify-center">
        <div className="relative mx-auto aspect-[260/137] w-full max-w-[280px]">
          <Image
            src="/figma/strategic/credit-health-gauge.svg"
            alt=""
            fill
            className="object-contain object-center"
            sizes="280px"
            aria-hidden
          />
        </div>
        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1">
          <p className="text-[48px] font-bold leading-none tracking-[-0.065em] text-white">
            {score}
          </p>
          <p className="text-xs uppercase tracking-[0.05em] text-[#6b7280]">{status}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-white/5 p-4">
          <p className="text-[10px] font-semibold uppercase leading-[15px] text-[#6b7280]">
            {utilizationLabel}
          </p>
          <p className="mt-1 text-lg font-bold leading-[27px] text-white">{utilizationValue}</p>
        </div>
        <div className="rounded-2xl bg-white/5 p-4">
          <p className="text-[10px] font-semibold uppercase leading-[15px] text-[#6b7280]">
            {limitLabel}
          </p>
          <p className="mt-1 text-lg font-bold leading-[27px] text-white">{limitValue}</p>
        </div>
      </div>
    </div>
  );
}
