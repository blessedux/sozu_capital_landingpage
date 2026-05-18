import type { Metadata } from "next";
import { metadataEn } from "@/content/metadata-by-locale";

export const metadata: Metadata = metadataEn;

export default function EnglishLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
