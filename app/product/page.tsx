import type { Metadata } from "next";
import { ProductPage } from "@/components/landing-v2/ProductPage";
import { metadataEs } from "@/content/metadata-by-locale";
import { getLandingCopy, type LandingLocale } from "@/lib/landing-copy";

export const metadata: Metadata = {
  ...metadataEs,
  title: "Producto | SOZU CAPITAL",
  description:
    "Explora Sozu Tags, recibos smart, flujos de pago, beneficios core, productos, rampas y financiamiento—todo el detalle de producto.",
};

const locale: LandingLocale = "es";

export default function ProductRoutePage() {
  return <ProductPage locale={locale} copy={getLandingCopy(locale)} />;
}
