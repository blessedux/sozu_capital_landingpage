import type { Metadata } from "next";
import { OnboardingExperience } from "@/components/landing-v2/OnboardingExperience";
import { FooterSection } from "@/components/landing-v2/FooterSection";
import { SiteHeader } from "@/components/landing-v2/SiteHeader";
import { metadataEn } from "@/content/metadata-by-locale";
import { getLandingCopy, type LandingLocale } from "@/lib/landing-copy";

export const metadata: Metadata = {
  ...metadataEn,
  title: "Early Access | SOZU CAPITAL",
  description:
    "Join Sozu's founding cohort. Reserve early access, unlock member perks, and help make economic freedom a protocol standard.",
};

const locale: LandingLocale = "en";

type Props = {
  searchParams: Promise<{ tag?: string; domain?: string }>;
};

export default async function OnboardingPage({ searchParams }: Props) {
  const copy = getLandingCopy(locale);
  const params = await searchParams;

  const reserved =
    params.tag != null
      ? `$${params.tag.replace(/^\$/, "")}`
      : params.domain != null
        ? params.domain
        : null;

  const reservedKind =
    params.tag != null ? "tag" : params.domain != null ? "domain" : null;

  return (
    <div className="landing-v2-grain min-h-dvh bg-background text-foreground">
      <SiteHeader copy={copy} basePath="" />
      <OnboardingExperience
        copy={copy.onboarding}
        basePath=""
        reserved={reserved}
        reservedKind={reservedKind}
      />
      <FooterSection copy={copy.footer} basePath="" />
    </div>
  );
}
