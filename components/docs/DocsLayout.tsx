"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getLandingCopy } from "@/lib/landing-copy";
import { SiteHeader } from "@/components/landing-v2/SiteHeader";
import { FooterSection } from "@/components/landing-v2/FooterSection";
import { cn } from "@/lib/utils";

type TocItem = { id: string; title: string };

type DocsLayoutProps = {
  title: string;
  description: string;
  updated?: string;
  toc: TocItem[];
  children: React.ReactNode;
};

export function DocsLayout({
  title,
  description,
  updated,
  toc,
  children,
}: DocsLayoutProps) {
  const copy = getLandingCopy("en");
  const basePath = "";

  return (
    <div className="landing-v2-grain min-h-screen bg-background text-foreground">
      <SiteHeader copy={copy} basePath={basePath} />
      <div className="relative z-[2] mx-auto max-w-[90rem] px-5 pb-24 pt-28 md:px-12 lg:px-20 lg:pt-32">
        <div className="mb-10 flex flex-col gap-4 border-b border-white/10 pb-10 md:mb-14">
          <Link
            href="/docs"
            className="font-mono text-xs uppercase tracking-[0.2em] text-primary hover:underline w-fit"
          >
            Documentation
          </Link>
          <h1 className="font-display text-3xl font-bold tracking-[-0.03em] text-white md:text-4xl lg:text-5xl text-balance">
            {title}
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-white/60 md:text-lg">
            {description}
          </p>
          {updated ? (
            <p className="font-mono text-xs text-white/35">Last updated {updated}</p>
          ) : null}
        </div>

        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          <aside className="lg:w-56 shrink-0">
            <DocsToc items={toc} />
          </aside>
          <article className="min-w-0 flex-1 max-w-3xl">{children}</article>
        </div>
      </div>
      <FooterSection copy={copy.footer} basePath={basePath} />
    </div>
  );
}

function DocsToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const ids = items.map((i) => i.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el != null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="On this page"
      className="lg:sticky lg:top-28 rounded-2xl border border-white/10 bg-surface/60 p-4"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-4">
        On this page
      </p>
      <ul className="flex flex-row flex-wrap gap-2 lg:flex-col lg:gap-0.5">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "block rounded-lg px-3 py-2 text-sm transition-colors lg:py-1.5",
                active === item.id
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              )}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
