/** Bar heights from Figma node 102:4763 (180px chart area). */
const BARS: { height: number; tone: "muted" | "accent" }[] = [
  { height: 46.83, tone: "muted" },
  { height: 23.41, tone: "accent" },
  { height: 70.25, tone: "muted" },
  { height: 31.22, tone: "accent" },
  { height: 39.02, tone: "muted" },
  { height: 15.61, tone: "accent" },
  { height: 85.86, tone: "muted" },
  { height: 39.02, tone: "accent" },
];

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN"] as const;

const CHART_HEIGHT = 180;

type CapitalFlowChartProps = {
  title?: string;
  months?: readonly string[];
};

export function CapitalFlowChart({
  title = "Capital Flow",
  months = MONTHS,
}: CapitalFlowChartProps) {
  return (
    <div className="flex w-full flex-col gap-4">
      <p className="text-lg font-semibold leading-[27px] text-white">{title}</p>

      <div className="flex h-[180px] items-end gap-1 px-2">
        {BARS.map((bar, index) => (
          <div
            key={index}
            className="flex min-w-0 flex-1 items-end justify-center"
            style={{ height: CHART_HEIGHT }}
          >
            <div
              className={`w-full max-w-[29px] rounded-sm ${
                bar.tone === "accent" ? "bg-[#ea580c]" : "bg-[#444444]"
              }`}
              style={{ height: `${(bar.height / CHART_HEIGHT) * 100}%` }}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between px-1 font-mono text-[9px] uppercase tracking-[0.04em] text-[#6b7280]">
        {months.map((month) => (
          <span key={month}>{month}</span>
        ))}
      </div>
    </div>
  );
}
