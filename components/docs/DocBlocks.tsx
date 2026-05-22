import type { DocBlock } from "@/content/docs/sozu-tags-federation";
import { cn } from "@/lib/utils";

export function DocBlocks({ blocks }: { blocks: DocBlock[] }) {
  return (
    <div className="space-y-5 text-[15px] leading-relaxed text-white/75">
      {blocks.map((block, i) => (
        <DocBlockRenderer key={i} block={block} />
      ))}
    </div>
  );
}

function DocBlockRenderer({ block }: { block: DocBlock }) {
  switch (block.type) {
    case "p":
      return <p>{block.text}</p>;
    case "h3":
      return (
        <h3 className="pt-2 font-display text-lg font-semibold text-white">{block.text}</h3>
      );
    case "ul":
      return (
        <ul className="list-disc space-y-2 pl-5 marker:text-primary/80">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="list-decimal space-y-2 pl-5 marker:text-primary/80">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      );
    case "callout":
      return (
        <div
          className={cn(
            "rounded-xl border p-5 md:p-6",
            block.variant === "warning"
              ? "border-amber-500/30 bg-amber-500/5"
              : "border-primary/25 bg-primary/5"
          )}
        >
          <p
            className={cn(
              "font-mono text-xs uppercase tracking-[0.2em] mb-2",
              block.variant === "warning" ? "text-amber-400" : "text-primary"
            )}
          >
            {block.title}
          </p>
          <p className="text-sm leading-relaxed text-white/70">{block.body}</p>
        </div>
      );
    case "table":
      return (
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full min-w-[280px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-surface-elevated/80">
                {block.headers.map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-primary"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className="border-b border-white/5 last:border-0">
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className={cn(
                        "px-4 py-3 align-top",
                        ci === 0 ? "font-medium text-white/90" : "text-white/60"
                      )}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "checklist":
      return (
        <ul className="space-y-3">
          {block.items.map((item) => (
            <li
              key={item}
              className="flex gap-3 rounded-lg border border-white/10 bg-surface/40 px-4 py-3 text-sm"
            >
              <span
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-white/20 font-mono text-[10px] text-white/40"
                aria-hidden
              >
                —
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    default:
      return null;
  }
}
