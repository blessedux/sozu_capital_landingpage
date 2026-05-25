# Changelog

All notable updates to the Sozu Capital landing page. Entries are grouped by release date (newest first).

---

## May 2026

### 2026-05-22 — Waitlist & onboarding

**Waitlist (Supabase)**
- Wired `/api/waitlist` to Supabase with SSR helpers (`utils/supabase/client`, `server`, `middleware`)
- Added `supabase/migrations/001_waitlist.sql` for the waitlist table schema
- Updated middleware and `lib/supabase.ts` for the new client setup

**Onboarding**
- Polished onboarding success state in `OnboardingExperience`
- Refactored ES/EN onboarding pages to use the shared experience component

---

### 2026-05-22 — Landing UX polish

**Navigation & layout**
- Refined `SiteHeader` (nav links, mobile behavior, locale handling)
- Tweaked `LandingV2` section ordering and spacing

**Sections**
- **Infrastructure** — layout and copy updates; added `data_node.webp` asset
- **Network layer** — expanded content and visual treatment
- **Sozu Tags** — copy and presentation refresh
- **Voice demo teaser** — scroll-driven messaging and teaser polish

**New pages & flows**
- Dedicated **Pricing** pages (`/pricing`, `/en/pricing`) with `PricingPage` component
- Shared **OnboardingExperience** component (220+ lines) used across locales
- Large **landing copy** updates in `lib/landing-copy.ts` (ES + EN)

**Assets**
- `public/data_node.webp`
- `public/sozu_coins_pingpong.webm`

---

### 2026-05-21 — Hero, partners, Sozu Tags & major features

**Visual polish**
- Fixed hero section fade / scroll reveal behavior
- Partners section: gradient edge blend and marquee layout improvements (`PartnersMarquee`, `PartnersSection`)
- Refreshed Sozu Tags section copy and availability search UI

**New experiences**
- **Voice demo** — full flow: `VoiceDemoPage`, `VoiceDemoExperience`, `VoiceOrb`, scroll-driven transcript (`ScrollDrivenMessage`), teaser on landing
- **Demo route** — `/demo` and `/en/demo`
- **Docs** — `/docs`, `/docs/sozu-tags` with federation architecture content and diagram components
- **Whitepaper** — `/whitepaper` and `/en/whitepaper` with `WhitepaperPage`

**Landing sections (content & layout)**
- Problem, Solution, Pathways, Pay/Receipt flow, Cash out, Financing/BNPL, Smart Dollars/Receipts, Who it’s for, Why Sozu, Core benefits, Products, and related sections updated for v2 narrative

**API & backend helpers**
- Improved Sozu Tags availability API (`/api/sozu-tags/availability`)
- Added voice demo API route
- Finance engine stubs (`lib/finance-engine/`) for intents, ledger, and tools

**Design & dev tooling**
- Paper design shader background component
- GSAP agent skills added under `.agents/skills/` (core, React, ScrollTrigger, plugins, etc.)
- Lazyweb / design-system cursor skills
- New background assets: `sozubackground3.webp`, `sozubg_5.webp`

---

### 2026-05-19 — Deploy & security

- Enabled **Vercel deployments** on `main` (`vercel.json`)
- Added **`clsx`** and **`tailwind-merge`** for production class merging
- Upgraded **Next.js to 15.5.18** to resolve Vercel CVE deployment blocks
- Triggered redeploy after dependency fixes

---

### 2026-05-18 — Landing page v2 launch

**Core launch**
- Shipped **Landing v2** as the default home experience (`LandingV2` + section components)
- Moved previous homepage to **`/legacy`** for reference
- **Bilingual routing**: Spanish default (`/`) and English (`/en/*`) with shared copy in `lib/landing-copy.ts`
- Locale middleware and metadata per locale (`content/metadata-by-locale.ts`)

**New routes**
| Route | Description |
|-------|-------------|
| `/` | Landing v2 (ES) |
| `/en` | Landing v2 (EN) |
| `/product`, `/en/product` | Product detail page |
| `/onboarding`, `/en/onboarding` | Onboarding flow |
| `/legacy` | Previous landing page |

**Section library (Figma-aligned)**
- Hero (scroll-driven reveal, dashboard imagery)
- Problem & Solution
- Strategic finance (charts: capital flow, credit health)
- Partners marquee + logo strip
- Pathways, Infrastructure, Network layer
- Smart Dollars, Smart Receipts, Pay/Receipt flow
- Financing / BNPL, Cash out, Pricing, Products
- Sozu Tags + availability search
- Who it’s for, Why Sozu, Core benefits, Final CTA, Footer

**Design system & UI**
- Proxima Nova fonts via `lib/fonts.ts`
- Reusable `Section`, `magic-text`, sticky cards
- Figma-exported assets under `public/figma/` and `public/hero/`
- Partner logos (Stellar, Circle, Blend Capital, etc.)
- Tailwind theme extensions in `tailwind.config.js`
- Global styles refresh in `app/globals.css`

**Integrations**
- Sozu Tags availability API (initial version)
- Waitlist form component updates

---

## Summary — May 2026 at a glance

| Area | Highlights |
|------|------------|
| **Brand & design** | Full v2 redesign, Figma assets, bilingual copy, hero/partners polish |
| **Product storytelling** | 15+ landing sections, product & pricing pages, whitepaper |
| **Interactive demos** | Voice demo, Sozu Tags search, scroll-driven animations |
| **Documentation** | Sozu Tags federation docs |
| **Data & backend** | Waitlist → Supabase, tag availability API, finance engine stubs |
| **Platform** | Next.js 15.5.18, Vercel on main, locale middleware |

---

*Generated from git history (`2026-05-01` → `2026-05-31`). Update this file when shipping notable changes.*
