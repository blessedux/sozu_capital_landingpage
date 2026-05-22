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
        "scroll-mt-24 border-b border-white/5 bg-[#0a0a0a] py-20 md:py-28",
        className
      )}
    >
      <div className="mx-auto max-w-[75rem] px-5 md:px-12 xl:px-20">
        {eyebrow ? (
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.1875rem] text-[#ff8000]">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="font-display text-3xl font-bold tracking-[-0.02em] text-white md:text-[48px] md:leading-[1.1]">
          {title}
        </h2>
        {description ? (
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/60">
            {description}
          </p>
        ) : null}
        {children ? <div className="mt-12 md:mt-16">{children}</div> : null}
      </div>
    </section>
  );
}
