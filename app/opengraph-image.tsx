import { OG_SIZE, ogCopy } from "@/content/og";
import { createOgImage } from "@/lib/create-og-image";

export const runtime = "nodejs";
export const alt = ogCopy.es.alt;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return createOgImage("es");
}
