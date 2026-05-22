import type { Metadata } from "next";
import Link from "next/link";
import { metadataEn } from "@/content/metadata-by-locale";
import { docsIndex } from "@/content/docs/sozu-tags-federation";
import { getLandingCopy } from "@/lib/landing-copy";
import { SiteHeader } from "@/components/landing-v2/SiteHeader";
import { FooterSection } from "@/components/landing-v2/FooterSection";

export const metadata: Metadata = {
  ...metadataEn,
  title: "Documentation | SOZU CAPITAL",
  description: "Internal product and infrastructure documentation for Sozu.",
};

export default function DocsIndexPage() {
  const copy = getLandingCopy("en");

  return (
    <div className="landing-v2-grain min-h-screen bg-background text-foreground">
      <SiteHeader copy={copy} basePath="" />
      <main className="relative z-[2] mx-auto max-w-3xl px-5 pb-24 pt-28 md:px-12 lg:px-20 lg:pt-32">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-4">
          Documentation
        </p>
        <h1 className="font-display text-3xl font-bold tracking-[-0.03em] text-white md:text-4xl mb-4">
          Sozu docs
        </h1>
        <p className="text-white/60 leading-relaxed mb-12">
          Architecture, roadmaps, and implementation guides for the Sozu stack.
        </p>
        <ul className="space-y-4">
          {docsIndex.map((doc) => (
            <li key={doc.slug}>
              <Link
                href={doc.href}
                className="group block rounded-2xl border border-white/10 bg-surface/50 p-6 transition-colors hover:border-primary/30 hover:bg-surface-elevated/50"
              >
                <h2 className="font-display text-xl font-semibold text-white group-hover:text-primary transition-colors">
                  {doc.title}
                </h2>
                <p className="mt-2 text-sm text-white/55 leading-relaxed">{doc.description}</p>
                <span className="mt-4 inline-block font-mono text-xs text-primary/80 group-hover:text-primary">
                  Read →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <FooterSection copy={copy.footer} basePath="" />
    </div>
  );
}
