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

const mobileNavLinkClass =
  "font-sans text-2xl font-medium tracking-[-0.02em] text-[#f5fbfc] transition-opacity hover:opacity-70";

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

function BurgerIcon() {
  return (
    <span className="relative block h-3.5 w-5" aria-hidden>
      <span className="absolute left-0 top-0 h-[1.5px] w-full bg-current" />
      <span className="absolute left-0 top-[5px] h-[1.5px] w-full bg-current" />
      <span className="absolute left-0 top-[10px] h-[1.5px] w-full bg-current" />
    </span>
  );
}

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

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const navItems = copy.nav.map((item) => {
    const href = p(item.href);
    const external = isExternalHref(href);
    const hash = href.startsWith("#");
    return { ...item, href, external, hash };
  });

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={cn(
        "pointer-events-none fixed top-0 left-0 right-0 transition-[transform,opacity] duration-300 ease-out",
        open || elevated ? "z-[200]" : "z-[5]",
        concealed && !open && "-translate-y-[140%] opacity-0"
      )}
    >
      {/* Mobile: logo left + burger right */}
      <div className="pointer-events-auto relative z-[210] flex w-full items-center justify-between px-5 pt-4 lg:hidden">
        <Link
          href={p("#hero")}
          className="flex shrink-0 items-center"
          onClick={closeMenu}
        >
          <img
            src="/sozu-mark-black.png"
            alt={copy.header.logoAlt}
            className="h-7 w-7 brightness-0 invert"
          />
        </Link>

        <button
          type="button"
          aria-expanded={open}
          aria-label={copy.header.menuAria}
          className="inline-flex h-10 w-10 items-center justify-center text-[#f5fbfc]"
          onClick={() => setOpen((o) => !o)}
        >
          <BurgerIcon />
        </button>
      </div>

      {/* Mobile full-screen drawer — hero video bg, buttons only */}
      <div
        className={cn(
          "pointer-events-auto fixed inset-0 z-[205] overflow-hidden bg-[var(--antiquity-charcoal,#0b1218)] transition-transform duration-300 ease-out lg:hidden",
          open ? "translate-x-0" : "translate-x-full"
        )}
        aria-hidden={!open}
      >
        {open ? (
          <>
            <video
              src="/hero/ascii-magic-6.mp4"
              autoPlay
              muted
              loop
              playsInline
              poster="/hero/digital-antiquity-agora.png"
              className="absolute inset-0 h-full w-full object-cover object-[18s%_center]"
              aria-hidden
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-[rgba(11,18,24,0.85)] via-[rgba(11,18,24,0.45)] to-[rgba(11,18,24,0.35)]"
            />
          </>
        ) : null}

        <nav
          className="relative z-10 flex h-full flex-col justify-center gap-6 px-8 pb-16 pt-24"
          aria-label="Primary"
        >
          <a
            href="https://pay.sozu.capital"
            target="_blank"
            rel="noopener noreferrer"
            className={mobileNavLinkClass}
            onClick={closeMenu}
          >
            Sozu Pay
          </a>
          {navItems.map((item) =>
            item.external ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={mobileNavLinkClass}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ) : item.hash ? (
              <a
                key={item.href}
                href={item.href}
                className={mobileNavLinkClass}
                onClick={(e) => {
                  closeMenu();
                  if (scrollToHash(item.href)) e.preventDefault();
                }}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={mobileNavLinkClass}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            )
          )}
          <Link
            href={p("/onboarding")}
            className="mt-4 text-lg font-semibold text-[#f5fbfc]"
            onClick={closeMenu}
          >
            {copy.header.login}
          </Link>
        </nav>
      </div>

      {/* Desktop: centered pill nav */}
      <div className="pointer-events-none hidden justify-center px-3 pt-4 lg:flex">
        <div className="pointer-events-auto relative w-auto max-w-[calc(100%-1.5rem)]">
          <div
            className={cn(
              "flex items-center rounded-full bg-white px-2 py-1.5 shadow-[0_6px_24px_rgba(11,18,24,0.1)]",
              GAP
            )}
          >
            <Link href={p("#hero")} className="flex shrink-0 items-center">
              <img
                src="/sozu-mark-black.png"
                alt={copy.header.logoAlt}
                className="h-7 w-7"
              />
            </Link>

            <nav className={cn("flex items-center", GAP)} aria-label="Primary">
              {navItems.map((item) =>
                item.external ? (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(navLinkClass, "px-1.5 py-1")}
                  >
                    {item.label}
                  </a>
                ) : item.hash ? (
                  <a
                    key={item.href}
                    href={item.href}
                    className={cn(navLinkClass, "px-1.5 py-1")}
                    onClick={(e) => {
                      if (scrollToHash(item.href)) e.preventDefault();
                    }}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(navLinkClass, "px-1.5 py-1")}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>

            <Link
              href={p("/onboarding")}
              className="inline-flex rounded-full bg-neutral-950 px-3 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
            >
              {copy.header.login}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
