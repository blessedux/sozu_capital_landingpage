/**
 * Lightweight slot for a future glowing Three.js planet.
 * Keep this dumb — no WebGL, no heavy deps.
 */
export function PlanetPlaceholder({ className }: { className?: string }) {
  return (
    <div
      className={className}
      aria-hidden
      data-planet-slot
    >
      <div className="relative mx-auto aspect-square w-full max-w-[22rem]">
        <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.55),rgba(126,184,196,0.35)_42%,rgba(90,140,150,0.2)_68%,transparent_72%)]" />
        <div className="absolute inset-0 rounded-full border border-[rgba(126,184,196,0.35)]" />
        <div className="absolute inset-[-8%] rounded-full bg-[radial-gradient(circle,rgba(126,184,196,0.18),transparent_65%)] blur-xl" />
        <span className="sr-only">Planet visual placeholder</span>
      </div>
    </div>
  );
}
