"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { LandingCopy } from "@/lib/landing-copy";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  copy: LandingCopy;
  basePath: string;
};

const navLinkClass =
  "font-sans text-xs font-medium tracking-[0.04em] text-neutral-600 transition-colors hover:text-neutral-950";

function resolveNavHref(href: string, basePath: string) {
  if (href.startsWith("http://") || href.startsWith("https://")) return href;
  if (href.startsWith("#")) return href;
  return `${basePath}${href}`;
}

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

function scrollToHash(href: string) {
  if (!href.startsWith("#")) return false;
  const el = document.getElementById(href.slice(1));
  if (!el) return false;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  history.replaceState(null, "", href);
  return true;
}

const GAP = "gap-2";

export function SiteHeader({ copy, basePath }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  /** Peeled away / sitting under Tags */
  const [concealed, setConcealed] = useState(false);
  /** Raise above Tags when scrolling back up so the pill can reappear */
  const [elevated, setElevated] = useState(false);
  const lastY = useRef(0);
  const p = (href: string) => resolveNavHref(href, basePath);

  useEffect(() => {
    lastY.current = window.scrollY;

    const update = () => {
      const y = window.scrollY;
      const goingUp = y < lastY.current - 2;
      lastY.current = y;

      const tags = document.getElementById("sozu-tags");
      if (!tags) {
        setConcealed(false);
        setElevated(false);
        return;
      }

      // Tags top edge vs viewport — once it reaches the pill, Tags (z-10) covers header (z-5)
      const tagsTop = tags.getBoundingClientRect().top;
      const coveredByTags = tagsTop <= 56;

      if (coveredByTags) {
        if (goingUp) {
          setConcealed(false);
          setElevated(true);
        } else {
          setConcealed(true);
          setElevated(false);
          setOpen(false);
        }
        return;
      }

      setConcealed(false);
      setElevated(false);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <header
      className={cn(
        "pointer-events-none fixed top-0 left-0 right-0 flex justify-center px-3 pt-3 transition-[transform,opacity] duration-300 ease-out md:pt-4",
        // z-5 < Tags z-10 so Tags can paint over the pill; elevate only on scroll-up
        elevated ? "z-[200]" : "z-[5]",
        concealed && "-translate-y-[140%] opacity-0"
      )}
    >
      <div className="pointer-events-auto relative w-auto max-w-[calc(100%-1.5rem)]">
        <div
          className={cn(
            "flex items-center bg-white px-2 py-1.5 shadow-[0_6px_24px_rgba(11,18,24,0.1)]",
            GAP,
            open ? "rounded-2xl" : "rounded-full"
          )}
        >
          <Link
            href={p("#hero")}
            className="flex shrink-0 items-center"
            onClick={() => setOpen(false)}
          >
            <img
              src="/sozu-mark-black.png"
              alt={copy.header.logoAlt}
              className="h-7 w-7"
            />
          </Link>

          <nav
            className={cn("hidden items-center lg:flex", GAP)}
            aria-label="Primary"
          >
            {copy.nav.map((item) => {
              const href = p(item.href);
              const external = isExternalHref(href);
              const hash = href.startsWith("#");

              return external ? (
                <a
                  key={item.href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(navLinkClass, "px-1.5 py-1")}
                >
                  {item.label}
                </a>
              ) : hash ? (
                <a
                  key={item.href}
                  href={href}
                  className={cn(navLinkClass, "px-1.5 py-1")}
                  onClick={(e) => {
                    if (scrollToHash(href)) e.preventDefault();
                  }}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={href}
                  className={cn(navLinkClass, "px-1.5 py-1")}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Link
            href={p("/onboarding")}
            className="hidden rounded-full bg-neutral-950 px-3 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90 sm:inline-flex"
          >
            {copy.header.login}
          </Link>

          <button
            type="button"
            aria-expanded={open}
            aria-label={copy.header.menuAria}
            className="inline-flex h-7 items-center justify-center rounded-full border border-neutral-200 px-2.5 font-mono text-[10px] uppercase text-neutral-800 lg:hidden"
            onClick={() => setOpen((o) => !o)}
          >
            {copy.header.menu}
          </button>
        </div>

        <div
          className={cn(
            "overflow-hidden bg-white shadow-[0_10px_28px_rgba(11,18,24,0.1)] transition-[max-height,opacity] duration-300 ease-out lg:hidden",
            open
              ? "mt-2 max-h-[280px] rounded-2xl opacity-100"
              : "max-h-0 opacity-0"
          )}
        >
          <nav className="flex flex-col px-3 py-2">
            {copy.nav.map((item) => {
              const href = p(item.href);
              const external = isExternalHref(href);
              const hash = href.startsWith("#");

              return external ? (
                <a
                  key={item.href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(navLinkClass, "py-2")}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ) : hash ? (
                <a
                  key={item.href}
                  href={href}
                  className={cn(navLinkClass, "py-2")}
                  onClick={(e) => {
                    setOpen(false);
                    if (scrollToHash(href)) e.preventDefault();
                  }}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={href}
                  className={cn(navLinkClass, "py-2")}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href={p("/onboarding")}
              className="py-2 text-xs font-semibold text-neutral-950"
              onClick={() => setOpen(false)}
            >
              {copy.header.login}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
