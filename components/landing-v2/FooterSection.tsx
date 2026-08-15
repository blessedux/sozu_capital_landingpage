"use client";

import Link from "next/link";
import type { LandingCopy } from "@/lib/landing-copy";

type Props = {
  copy: LandingCopy["footer"];
  basePath: string;
  lang?: LandingCopy["lang"];
};

function resolveHref(href: string, basePath: string) {
  if (href.startsWith("http://") || href.startsWith("https://")) return href;
  // Same-page anchors: keep hash-only so smooth scroll stays on this page
  if (href.startsWith("#")) return href;
  return `${basePath}${href}`;
}

function isExternal(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

function isHashHref(href: string) {
  return href.startsWith("#") || href.includes("/#") || /\/en?#/.test(href);
}

function hashId(href: string) {
  const i = href.indexOf("#");
  return i >= 0 ? href.slice(i + 1) : "";
}

function scrollToHash(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
  return true;
}

export function FooterSection({ copy, basePath, lang }: Props) {
  return (
    <footer
      id="footer"
      className="relative z-[2] border-t border-border bg-background px-6 pb-6 pt-20 md:flex md:min-h-0 md:flex-col md:px-[7.5rem] md:pb-3 md:pt-20"
    >
      <div className="mx-auto flex w-full max-w-[75rem] flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-6">
          <span className="font-display text-xl font-bold tracking-[-0.02em] text-foreground">
            {copy.brand}
          </span>
          <p className="text-sm leading-[21px] text-muted md:hidden">
            {copy.copyright}
          </p>
        </div>

        <nav className="flex flex-wrap gap-12" aria-label="Footer">
          {copy.columns.map((column) => {
            const isProduct =
              column.title === "Product" || column.title === "Producto";

            return (
              <div key={column.title} className="flex flex-col gap-4">
                <p className="text-xs font-bold uppercase tracking-[0.125em] text-foreground">
                  {column.title}
                </p>
                <ul className="flex flex-col gap-4">
                  {column.links.map((link) => {
                    const href = resolveHref(link.href, basePath);
                    const hash = isHashHref(href);

                    return (
                      <li key={link.label}>
                        {isExternal(href) ? (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm leading-[21px] text-muted transition-colors hover:text-foreground"
                          >
                            {link.label}
                          </a>
                        ) : hash ? (
                          <a
                            href={href.startsWith("#") ? href : `#${hashId(href)}`}
                            className="text-sm leading-[21px] text-muted transition-colors hover:text-foreground"
                            onClick={(e) => {
                              const id = hashId(href);
                              if (id && scrollToHash(id)) e.preventDefault();
                            }}
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link
                            href={href}
                            className="text-sm leading-[21px] text-muted transition-colors hover:text-foreground"
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                  {isProduct && lang ? (
                    <li>
                      <Link
                        href={lang.otherLocaleHref}
                        aria-label={lang.switchAria}
                        className="text-sm font-semibold leading-[21px] text-foreground transition-colors hover:text-primary"
                      >
                        {lang.otherLocaleLabel.toUpperCase()}
                      </Link>
                    </li>
                  ) : null}
                </ul>
              </div>
            );
          })}
        </nav>
      </div>

      <p className="mx-auto mt-12 hidden w-full max-w-[75rem] text-center text-xs tracking-[0.02em] text-muted md:mt-auto md:block md:pt-16">
        Sozu Capital LLC - All Rights Reserved
      </p>
    </footer>
  );
}
