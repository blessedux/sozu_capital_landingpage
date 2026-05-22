export function ArchitectureDiagram() {
  const nodes = [
    { title: "Clients", items: ["Wallets (SEP-0002)", "Sozu apps"] },
    { title: "Edge", items: ["Federation server"] },
    { title: "Data plane", items: ["App database", "Indexer worker"] },
    { title: "Stellar", items: ["Soroban verified registry"] },
  ];

  return (
    <div
      className="my-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
      role="img"
      aria-label="Architecture: wallets and apps connect to federation and database; indexer syncs Soroban contract to database"
    >
      {nodes.map((node, i) => (
        <div key={node.title} className="relative">
          <div className="rounded-xl border border-white/10 bg-surface-elevated/50 p-4 h-full">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-3">
              {node.title}
            </p>
            <ul className="space-y-1.5 text-sm text-white/65">
              {node.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          {i < nodes.length - 1 ? (
            <span
              className="hidden lg:block absolute top-1/2 -right-2 z-10 text-primary/50 -translate-y-1/2"
              aria-hidden
            >
              →
            </span>
          ) : null}
        </div>
      ))}
      <p className="sm:col-span-2 lg:col-span-4 text-xs text-white/40 leading-relaxed">
        Wallets resolve via federation. Apps search the database. Contract changes flow:
        Soroban → indexer → database → federation (for verified tags).
      </p>
    </div>
  );
}
