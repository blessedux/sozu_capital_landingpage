export type DocBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "callout"; variant?: "info" | "warning"; title: string; body: string }
  | { type: "table"; headers: [string, string]; rows: [string, string][] }
  | { type: "checklist"; items: string[] };

export type DocSection = {
  id: string;
  title: string;
  blocks: DocBlock[];
};

export const sozuTagsFederationMeta = {
  title: "Sozu Tags & Federation",
  description:
    "How Sozu Tags work on Stellar: federation (SEP-0002), app-server mapping, and on-chain verified registry.",
  updated: "May 2026",
};

export const sozuTagsFederationSections: DocSection[] = [
  {
    id: "overview",
    title: "Overview",
    blocks: [
      {
        type: "p",
        text: "Sozu Tags are your identity layer for non-custodial, global smart money—the same inevitability as $cashtags and @handles, but settlement stays in accounts your users control.",
      },
      {
        type: "p",
        text: "This document describes how to ship that story in three cooperating layers: a public federation server (wallet-compatible), a fast map on your app server, and a Soroban contract for verified bindings.",
      },
      {
        type: "callout",
        variant: "info",
        title: "North star",
        body: "Federation is the wire format wallets understand. Your database powers search and UX. The smart contract is the trust anchor when a tag is verified. Funds remain non-custodial; naming trust is explicit and tiered.",
      },
    ],
  },
  {
    id: "stellar-context",
    title: "Stellar naming (no global ENS)",
    blocks: [
      {
        type: "p",
        text: "Stellar does not ship a single chain-wide name registry like Ethereum’s ENS. The native human-readable layer is SEP-0002 Federation: addresses look like name*domain.tld (for example joaquin*sozu.app).",
      },
      {
        type: "p",
        text: "Resolution works over HTTPS. Clients discover your federation server URL from stellar.toml on the domain you control. Soroban lets you build your own on-chain registry—but that is your protocol, not a built-in Stellar TLD.",
      },
      {
        type: "h3",
        text: "Custody vs naming (say both clearly)",
      },
      {
        type: "ul",
        items: [
          "Non-custodial money: payments settle to Stellar accounts the user controls (keys in their wallet).",
          "Trusted naming: if Sozu runs joaquin*sozu.app via a database, users trust your mapping policy—not the same as holding their balance.",
          "Stronger naming: user-owned domain + federation, or on-chain verified registry with indexer sync.",
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "Product ↔ wire format",
        body: "Marketing may show $joaquin or sozu.app/@joaquin. On the wire, federation uses joaquin*sozu.app. Define normalization rules once and use them everywhere.",
      },
    ],
  },
  {
    id: "three-layers",
    title: "Three layers",
    blocks: [
      {
        type: "table",
        headers: ["Layer", "Role"],
        rows: [
          [
            "Federation (SEP-0002)",
            "Public HTTP API: name*domain → account (and memo if needed). Wallets and third parties can resolve without your app.",
          ],
          [
            "App server map",
            "Database + cache: fast search, verification workflow, badges, fraud, analytics. Mirrors federation and chain for verified tags.",
          ],
          [
            "Soroban registry",
            "On-chain source of truth for verified tag ↔ account. Indexer syncs to DB; federation must not disagree.",
          ],
        ],
      },
      {
        type: "h3",
        text: "Tag states",
      },
      {
        type: "ul",
        items: [
          "Unverified: DB and/or federation only until ops or policy promotes the tag.",
          "Verified: contract is authoritative; DB and federation are read replicas reconciled from chain.",
          "Conflict: contract wins; alert, block federation response until DB is fixed.",
        ],
      },
    ],
  },
  {
    id: "architecture",
    title: "Architecture",
    blocks: [
      {
        type: "p",
        text: "Clients hit federation for wallet-native resolution. Sozu apps hit the database for search. A worker indexes the Soroban contract into the same database federation reads for verified rows.",
      },
      {
        type: "ul",
        items: [
          "Wallets → Federation server → DB (verified rows from indexer) or contract cache",
          "Sozu apps → DB (search, badges) + Federation on confirm/pay",
          "Soroban contract → Indexer → DB → Federation",
        ],
      },
    ],
  },
  {
    id: "phase-0",
    title: "Phase 0 — Decisions",
    blocks: [
      {
        type: "p",
        text: "Short, blocking work before implementation.",
      },
      {
        type: "ol",
        items: [
          "Choose FEDERATION_DOMAIN (e.g. sozu.app) and host stellar.toml at https://FEDERATION_DOMAIN/.well-known/stellar.toml.",
          "Define slug normalization ($tag → federation name), reserved words, and unicode rules.",
          "Decide source of truth per state: unverified (DB), verified (contract), dispute/revoke authority.",
          "Memo policy: pay directly to user account vs shared account + memo (affects federation memo field).",
        ],
      },
      {
        type: "callout",
        title: "Deliverable",
        body: "One-page architecture note: domain, URL shapes, who writes what, and SLA for indexer → DB → federation consistency.",
      },
    ],
  },
  {
    id: "phase-1",
    title: "Phase 1 — Federation server MVP",
    blocks: [
      {
        type: "p",
        text: "Goal: any SEP-0002 client can resolve user*sozu.app → G…",
      },
      {
        type: "ol",
        items: [
          "Implement GET /federation?q=<stellar-address>&type=name (add type=id reverse lookup later if needed).",
          "MVP: read mappings from the database or static config to prove the pipeline.",
          "Publish stellar.toml with FEDERATION_SERVER pointing to your federation base URL.",
          "Validate with Stellar SDK FederationServer.resolveAddress() in CI or a smoke script.",
        ],
      },
      {
        type: "callout",
        title: "Exit criteria",
        body: "curl or SDK resolve works on staging against your real domain and TLS.",
      },
    ],
  },
  {
    id: "phase-2",
    title: "Phase 2 — App server local map",
    blocks: [
      {
        type: "p",
        text: "Goal: millisecond search and business logic without hitting Horizon or the contract on every keystroke.",
      },
      {
        type: "ol",
        items: [
          "Schema (illustrative): tags(slug, account_id, status, verified_at, contract_ledger, memo_type, …) with prefix indexes.",
          "Write path: onboarding/admin APIs update DB; verified rows eventually sync from chain only.",
          "Read path: app search uses DB; pay confirmation shows the same account federation would return.",
          "Optional Redis cache for hot slug → account_id after reconciliation.",
        ],
      },
      {
        type: "callout",
        title: "Exit criteria",
        body: "App search and pay UI match federation resolution for the same slug in staging.",
      },
    ],
  },
  {
    id: "phase-3",
    title: "Phase 3 — Soroban verified registry",
    blocks: [
      {
        type: "p",
        text: "Goal: on-chain record that a verified tag is bound to an account (and optional metadata hash).",
      },
      {
        type: "ol",
        items: [
          "Data model: e.g. map tag_hash → { owner, target account, metadata_cid?, revoked } with length limits on stored tags.",
          "Authorities: multisig or role contract for register / revoke; document key ceremony.",
          "Deploy on testnet first; define upgrade vs immutable contract strategy.",
          "Integration tests: register, read, revoke, event emission for indexers.",
        ],
      },
      {
        type: "callout",
        title: "Exit criteria",
        body: "You can register and read a verified mapping on testnet; events are consumable by your indexer.",
      },
    ],
  },
  {
    id: "phase-4",
    title: "Phase 4 — Link federation, DB, and contract",
    blocks: [
      {
        type: "p",
        text: "Goal: verified means on-chain; federation and DB must agree.",
      },
      {
        type: "ol",
        items: [
          "Indexer or polling worker: contract events → upsert tags table (verified, last_ledger, tx_hash).",
          "Federation read path: verified → account from DB row derived from chain; unverified → DB only (optionally omit from public federation).",
          "Conflict guard: if DB ≠ contract, contract wins; halt federation for that slug until reconciled.",
          "SLA target: on-chain change visible in federation within ~1 minute (tune to your ops).",
        ],
      },
      {
        type: "callout",
        title: "Exit criteria",
        body: "Register on testnet → indexer updates DB → federation returns new account within SLA.",
      },
    ],
  },
  {
    id: "phase-5-6",
    title: "Phase 5 & 6 — Hardening and policy",
    blocks: [
      {
        type: "h3",
        text: "Phase 5 — Production",
      },
      {
        type: "ul",
        items: [
          "TLS, rate limits, WAF on federation (public, abuse-prone).",
          "Monitoring: p99 latency, errors, mismatch detector (federation vs DB vs contract samples).",
          "Runbooks: revoke verified tag, disable slug, contract admin key rotation.",
        ],
      },
      {
        type: "h3",
        text: "Phase 6 — Product and compliance",
      },
      {
        type: "ul",
        items: [
          "Squatting and trademark policy before open registration.",
          "Privacy: no PII in federation errors or stellar.toml.",
          "Merchant docs: what verified means on-chain and how to apply.",
        ],
      },
    ],
  },
  {
    id: "timeline",
    title: "Suggested timeline",
    blocks: [
      {
        type: "table",
        headers: ["Phase", "Duration (indicative)"],
        rows: [
          ["0 — Decisions", "Few days"],
          ["1 — Federation MVP", "1–2 weeks"],
          ["2 — App DB map", "1–2 weeks (parallel with 1)"],
          ["3 — Soroban registry (testnet)", "2–4 weeks"],
          ["4 — Linking + indexer", "2–3 weeks"],
          ["5–6 — Hardening + policy", "Ongoing"],
        ],
      },
      {
        type: "p",
        text: "Run Phase 1 and 2 together once Phase 0 is fixed. Start Phase 3 in parallel. Phase 4 begins when contract events are reliable.",
      },
    ],
  },
  {
    id: "checklist",
    title: "Implementation checklist",
    blocks: [
      {
        type: "checklist",
        items: [
          "Domain + stellar.toml live",
          "Federation name lookup works (SEP-0002)",
          "DB schema + app search integrated",
          "Contract: register / revoke / read on testnet",
          "Indexer: contract → DB",
          "Federation reads verified rows from reconciled DB",
          "Mismatch alerts + runbooks",
          "Rate limits + monitoring",
        ],
      },
    ],
  },
  {
    id: "references",
    title: "References",
    blocks: [
      {
        type: "ul",
        items: [
          "SEP-0002 Federation Protocol — github.com/stellar/stellar-protocol (ecosystem/sep-0002.md)",
          "stellar.toml hosting — federation server URL discovery",
          "Stellar JS SDK — FederationServer.resolveAddress()",
          "Soroban — custom verified registry contract (your deployment)",
        ],
      },
    ],
  },
];

export const docsIndex = [
  {
    slug: "sozu-tags",
    href: "/docs/sozu-tags",
    title: sozuTagsFederationMeta.title,
    description: sozuTagsFederationMeta.description,
  },
] as const;
