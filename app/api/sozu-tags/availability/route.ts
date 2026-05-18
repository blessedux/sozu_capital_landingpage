import { NextRequest, NextResponse } from "next/server";

/** Normalize user input to a canonical tag slug (no leading $). */
function normalizeTag(raw: string): string | null {
  let s = raw.trim().toLowerCase();
  if (!s) return null;
  s = s.replace(/^[\$@]+/, "");
  s = s.replace(/\s+/g, "");
  if (s.length < 2 || s.length > 48) return null;
  if (!/^[a-z0-9]([a-z0-9.-]*[a-z0-9])?$/.test(s)) return null;
  if (s.includes("..") || s.startsWith(".") || s.endsWith(".")) return null;
  return s;
}

const TAKEN = new Set([
  "joaquin",
  "cafe.noma",
  "importadora.cl",
  "sozu",
  "support",
  "help",
  "admin",
  "api",
  "www",
]);

const messages = {
  en: {
    invalid:
      "Use letters, numbers, and single dots (e.g. $cafe.noma or importadora.cl).",
    available: "This tag looks available (demo registry).",
    taken: "Already claimed in our preview registry—try a variation.",
  },
  es: {
    invalid:
      "Usa letras, números y puntos simples (ej. $cafe.noma o importadora.cl).",
    available: "Este tag se ve disponible (registro demo).",
    taken: "Ya está tomado en nuestro registro demo—prueba una variación.",
  },
} as const;

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get("q") ?? "";
  const lang = req.nextUrl.searchParams.get("locale") === "en" ? "en" : "es";
  const m = messages[lang];
  const slug = normalizeTag(raw);

  if (!slug) {
    return NextResponse.json(
      {
        ok: true,
        normalized: null,
        available: null,
        invalid: true,
        message: m.invalid,
      },
      { status: 200 }
    );
  }

  const normalized = `$${slug}`;
  const available = !TAKEN.has(slug);

  return NextResponse.json({
    ok: true,
    normalized,
    available,
    invalid: false,
    message: available ? m.available : m.taken,
  });
}
