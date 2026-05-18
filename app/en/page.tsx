import { LandingV2 } from "@/components/landing-v2/LandingV2";
import { getLandingCopy, type LandingLocale } from "@/lib/landing-copy";

const locale: LandingLocale = "en";

export default function EnglishHomePage() {
  return <LandingV2 locale={locale} copy={getLandingCopy(locale)} />;
}
