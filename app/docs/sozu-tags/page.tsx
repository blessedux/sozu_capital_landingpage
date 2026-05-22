import type { Metadata } from "next";
import { metadataEn } from "@/content/metadata-by-locale";
import { sozuTagsFederationMeta } from "@/content/docs/sozu-tags-federation";
import { SozuTagsFederationDoc } from "@/components/docs/SozuTagsFederationDoc";

export const metadata: Metadata = {
  ...metadataEn,
  title: `${sozuTagsFederationMeta.title} | SOZU CAPITAL`,
  description: sozuTagsFederationMeta.description,
};

export default function SozuTagsFederationDocPage() {
  return <SozuTagsFederationDoc />;
}
