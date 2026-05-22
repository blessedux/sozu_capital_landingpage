import { NextRequest, NextResponse } from "next/server";

type CheckMode = "tag" | "domain";

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

/** Domain-style handle (must include a dot). */
function normalizeDomain(raw: string): string | null {
  let s = raw.trim().toLowerCase();
  if (!s) return null;
  s = s.replace(/^https?:\/\//, "");
  s = s.replace(/\/.*$/, "");
  s = s.replace(/^www\./, "");
  s = s.replace(/^[\$@]+/, "");
  s = s.replace(/\s+/g, "");
  if (s.length < 4 || s.length > 63) return null;
  if (!s.includes(".")) return null;
  if (!/^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/.test(s)) return null;
  if (s.includes("..") || s.startsWith(".") || s.endsWith(".")) return null;
  return s;
}

const TAKEN_TAGS = new Set([
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

const TAKEN_DOMAINS = new Set([
  "sozu.app",
  "sozu.capital",
  "stellar.org",
  "importadora.cl",
  "cafe.noma",
  "support.sozu.app",
  "admin.sozu.app",
]);

const messages = {
  en: {
    tag: {
      invalid:
        "Use letters, numbers, and single dots (e.g. joaquin or cafe.noma).",
      available: "This tag looks available (demo registry).",
      taken: "Already claimed in our preview registry—try a variation.",
    },
    domain: {
      invalid: "Enter a domain-style handle with a dot (e.g. cafe.noma or tienda.cl).",
      available: "This domain handle looks available (demo registry).",
      taken: "Already reserved in our preview registry—try another name.",
    },
  },
  es: {
    tag: {
      invalid:
        "Usa letras, números y puntos simples (ej. joaquin o cafe.noma).",
      available: "Este tag se ve disponible (registro demo).",
      taken: "Ya está tomado en nuestro registro demo—prueba una variación.",
    },
    domain: {
      invalid: "Ingresa un dominio con punto (ej. cafe.noma o tienda.cl).",
      available: "Este dominio se ve disponible (registro demo).",
      taken: "Ya está reservado en nuestro registro demo—prueba otro nombre.",
    },
  },
} as const;

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get("q") ?? "";
  const lang = req.nextUrl.searchParams.get("locale") === "en" ? "en" : "es";
  const modeParam = req.nextUrl.searchParams.get("mode");
  const mode: CheckMode = modeParam === "domain" ? "domain" : "tag";
  const m = messages[lang][mode];

  const slug = mode === "domain" ? normalizeDomain(raw) : normalizeTag(raw);

  if (!slug) {
    return NextResponse.json(
      {
        ok: true,
        mode,
        normalized: null,
        available: null,
        invalid: true,
        message: m.invalid,
      },
      { status: 200 }
    );
  }

  const normalized =
    mode === "tag" ? `$${slug}` : slug;
  const taken = mode === "domain" ? TAKEN_DOMAINS : TAKEN_TAGS;
  const available = !taken.has(slug);

  return NextResponse.json({
    ok: true,
    mode,
    normalized,
    available,
    invalid: false,
    message: available ? m.available : m.taken,
  });
}
