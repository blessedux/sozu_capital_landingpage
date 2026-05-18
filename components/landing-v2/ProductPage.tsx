"use client";

import type { LandingCopy, LandingLocale } from "@/lib/landing-copy";
import { SiteHeader } from "./SiteHeader";
import { SmartDollarsSection } from "./SmartDollarsSection";
import { SozuTagsSection } from "./SozuTagsSection";
import { SmartReceiptsSection } from "./SmartReceiptsSection";
import { PayReceiptFlowSection } from "./PayReceiptFlowSection";
import { CoreBenefitsSection } from "./CoreBenefitsSection";
import { ProductsSection } from "./ProductsSection";
import { CashOutSection } from "./CashOutSection";
import { FinancingBnplSection } from "./FinancingBnplSection";
import { WhoItsForSection } from "./WhoItsForSection";
import { WhySozuSection } from "./WhySozuSection";
import { FooterSection } from "./FooterSection";

export type ProductPageProps = {
  locale: LandingLocale;
  copy: LandingCopy;
};

export function ProductPage({ locale, copy }: ProductPageProps) {
  const basePath = locale === "en" ? "/en" : "";

  return (
    <div className="landing-v2-grain min-h-screen bg-background text-foreground">
      <SiteHeader copy={copy} basePath={basePath} />
      <main className="relative z-[2] pt-20 [&>section:nth-child(even)]:bg-surface/40">
        <SmartDollarsSection copy={copy.smartMoney} />
        <SozuTagsSection copy={copy} basePath={basePath} locale={locale} />
        <SmartReceiptsSection copy={copy.smartReceipts} />
        <PayReceiptFlowSection copy={copy.payFlow} />
        <CoreBenefitsSection copy={copy.coreBenefits} />
        <ProductsSection copy={copy.products} />
        <CashOutSection copy={copy.cashOut} />
        <FinancingBnplSection copy={copy.financing} />
        <WhoItsForSection copy={copy.whoItsFor} />
        <WhySozuSection copy={copy.whySozu} />
      </main>
      <FooterSection copy={copy.footer} basePath={basePath} />
    </div>
  );
}
