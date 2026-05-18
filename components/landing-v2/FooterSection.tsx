import Link from "next/link";
import type { LandingCopy } from "@/lib/landing-copy";

type Props = {
  copy: LandingCopy["footer"];
  basePath: string;
};

export function FooterSection({ copy, basePath }: Props) {
  const p = (href: string) => `${basePath}${href}`;

  return (
    <footer
      id="footer"
      className="relative z-[2] border-t border-white/5 bg-[#0a0a0a] px-6 py-20 md:px-[7.5rem]"
    >
      <div className="mx-auto flex max-w-[75rem] flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-6">
          <span className="font-display text-xl font-bold tracking-[-0.02em] text-white">
            {copy.brand}
          </span>
          <p className="text-sm leading-[21px] text-white/30">{copy.copyright}</p>
        </div>

        <nav className="flex flex-wrap gap-12" aria-label="Footer">
          {copy.columns.map((column) => (
            <div key={column.title} className="flex flex-col gap-4">
              <p className="text-xs font-bold uppercase tracking-[0.125em] text-white/20">
                {column.title}
              </p>
              <ul className="flex flex-col gap-4">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={p(link.href)}
                      className="text-sm leading-[21px] text-white/50 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </footer>
  );
}
