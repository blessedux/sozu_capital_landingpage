import Link from "next/link";
import { SiteHeader } from "@/components/landing-v2/SiteHeader";
import { getLandingCopy } from "@/lib/landing-copy";

type Props = {
  searchParams: Promise<{ tag?: string; domain?: string }>;
};

export default async function OnboardingPage({ searchParams }: Props) {
  const copy = getLandingCopy("en");
  const params = await searchParams;
  const reserved =
    params.tag != null
      ? `$${params.tag.replace(/^\$/, "")}`
      : params.domain != null
        ? params.domain
        : null;

  return (
    <div className="landing-v2-grain min-h-dvh bg-background text-foreground">
      <SiteHeader copy={copy} basePath="" />
      <main className="container py-20 md:py-28 max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-4">
          Onboarding
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
          Create your wallet
        </h1>
        {reserved ? (
          <p className="mb-4 font-mono text-lg text-[#ff8000]">{reserved}</p>
        ) : null}
        <p className="text-muted leading-relaxed mb-10">
          Wallet creation is coming soon. You&apos;ll finish onboarding here and link
          {reserved ? " this name" : " your Sozu Tag or domain"} to a non-custodial wallet.
        </p>
        <Link
          href="/"
          className="inline-flex font-mono text-sm uppercase tracking-wide text-primary hover:text-primary/80 transition-colors"
        >
          ← Back to home
        </Link>
      </main>
    </div>
  );
}
