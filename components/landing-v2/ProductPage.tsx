"use client";

import type { LandingCopy, LandingLocale } from "@/lib/landing-copy";
import { VoiceDemoTeaser } from "@/components/voice-demo/VoiceDemoTeaser";
import { SiteHeader } from "./SiteHeader";
import { SmartDollarsSection } from "./SmartDollarsSection";
import { SmartReceiptsSection } from "./SmartReceiptsSection";
import { PayReceiptFlowSection } from "./PayReceiptFlowSection";
import { InfrastructureSection } from "./InfrastructureSection";
import { NetworkLayerSection } from "./NetworkLayerSection";
import { StrategicFinanceSection } from "./StrategicFinanceSection";
import { ProductsSection } from "./ProductsSection";
import { FinancingBnplSection } from "./FinancingBnplSection";
import { WhySozuSection } from "./WhySozuSection";
import { FooterSection } from "./FooterSection";

export type ProductPageProps = {
  locale: LandingLocale;
  copy: LandingCopy;
};

export function ProductPage({ locale, copy }: ProductPageProps) {
  const basePath = locale === "en" ? "/en" : "";

  return (
    <div className="landing-v2-grain min-h-screen bg-[#0a0a0a] text-white">
      <SiteHeader copy={copy} basePath={basePath} />
      <main className="relative z-[2] pt-20">
        <SmartDollarsSection copy={copy.smartMoney} />
        <VoiceDemoTeaser
          copy={copy.voiceDemoTeaser}
          locale={locale}
          basePath={basePath}
        />
        <SmartReceiptsSection copy={copy.smartReceipts} />
        <PayReceiptFlowSection copy={copy.payFlow} />
        <InfrastructureSection copy={copy.infrastructure} />
        <NetworkLayerSection copy={copy.networkLayer} basePath={basePath} />
        <StrategicFinanceSection copy={copy.strategicFinance} />
        <ProductsSection copy={copy.products} />
        <FinancingBnplSection copy={copy.financing} />
        <WhySozuSection copy={copy.whySozu} />
      </main>
      <FooterSection copy={copy.footer} basePath={basePath} />
    </div>
  );
}
