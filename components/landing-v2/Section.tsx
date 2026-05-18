import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
};

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24 border-b border-border/50 py-20 md:py-28",
        className
      )}
    >
      <div className="container">
        {eyebrow ? (
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-4">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight max-w-3xl text-balance">
          {title}
        </h2>
        {description ? (
          <p className="mt-6 text-base md:text-lg text-muted max-w-2xl leading-relaxed text-pretty">
            {description}
          </p>
        ) : null}
        {children ? <div className="mt-12 md:mt-16">{children}</div> : null}
      </div>
    </section>
  );
}
