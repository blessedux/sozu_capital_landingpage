import { VoiceDemoPage } from "@/components/voice-demo/VoiceDemoPage";
import { getLandingCopy, type LandingLocale } from "@/lib/landing-copy";

const locale: LandingLocale = "en";

export const metadata = {
  title: "Demo — SOZU",
  description: "Talk to your money. Conversational finance demo.",
};

export default function EnglishDemoPage() {
  return <VoiceDemoPage locale={locale} copy={getLandingCopy(locale)} />;
}
