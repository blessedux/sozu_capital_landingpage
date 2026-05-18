export type LandingLocale = "es" | "en";

export type LandingCopy = {
  nav: { href: string; label: string }[];
  lang: { otherLocaleLabel: string; otherLocaleHref: string; switchAria: string };
  header: {
    menu: string;
    menuAria: string;
    logoAlt: string;
    brand: string;
    login: string;
    startMission: string;
  };
  hero: {
    scrollHint: string;
    betaBadge: string;
    title: string;
    body: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stats: {
      capitalLabel: string;
      capitalValue: string;
      creditScore: string;
      creditLabel: string;
      vaultLabel: string;
      vaultPercent: string;
    };
  };
  partners: {
    ariaLabel: string;
    heading: string;
  };
  pathways: {
    ariaLabel: string;
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    titleLine3: string;
    individuals: {
      label: string;
      title: string;
      description: string;
      features: string[];
      cta: string;
    };
    businesses: {
      label: string;
      title: string;
      description: string;
      features: string[];
      cta: string;
    };
  };
  problem: {
    ariaLabel: string;
    line1: string;
    line2: string;
    line3: string;
    line4: string;
    line5: string;
    bodyLead: string;
    bodyClose: string;
  };
  solution: {
    ariaLabel: string;
    eyebrow: string;
    title: string;
    cards: {
      icon: string;
      iconWidth: number;
      iconHeight: number;
      title: string;
      description: string;
    }[];
  };
  pricing: {
    ariaLabel: string;
    title: string;
    description: string;
    billingToggleLabel: string;
    monthly: string;
    yearly: string;
    plans: {
      name: string;
      description: string;
      price: string;
      priceYearly?: string;
      period?: string;
      periodYearly?: string;
      cta: string;
      features: string[];
      featured?: boolean;
      badge?: string;
    }[];
  };
  smartMoney: {
    eyebrow: string;
    title: string;
    description: string;
    cards: { title: string; body: string }[];
  };
  tagSearch: {
    label: string;
    placeholder: string;
    hint: string;
    checking: string;
    errorGeneric: string;
    errorNetwork: string;
    createWalletCta: string;
    createWalletHint: string;
  };
  sozuTags: {
    eyebrow: string;
    title: string;
    description: string;
    benefits: { title: string; body: string }[];
    mustHaves: { title: string; body: string }[];
    identityLead: string;
    identityLayer: string;
    identityAnd: string;
    identityMoat: string;
    identityRest: string;
    killerEyebrow: string;
    killerTitle: string;
    killerBody: string;
    killerReceiptsLink: string;
    killerBodyAfter: string;
  };
  smartReceipts: {
    eyebrow: string;
    title: string;
    description: string;
    pullQuote: string;
    features: { title: string; body: string }[];
    benefits: { title: string; body: string }[];
    footnote: string;
  };
  payFlow: {
    eyebrow: string;
    title: string;
    description: string;
    stepsTitle: string;
    steps: string[];
    tagline: string;
    posTitle: string;
    posBody: string;
    optimizeTitle: string;
    optimizeBody: string;
    footnote: string;
  };
  coreBenefits: {
    eyebrow: string;
    title: string;
    description: string;
    items: { title: string; body: string }[];
  };
  products: {
    eyebrow: string;
    title: string;
    description: string;
    items: { name: string; summary: string }[];
  };
  cashOut: {
    eyebrow: string;
    title: string;
    description: string;
    p1: string;
    p2: string;
    disclaimer: string;
  };
  financing: {
    eyebrow: string;
    title: string;
    description: string;
    bnplTitle: string;
    bnplBody: string;
    wcTitle: string;
    wcBody: string;
  };
  whoItsFor: {
    eyebrow: string;
    title: string;
    description: string;
    personas: { line: string; detail: string }[];
  };
  whySozu: {
    eyebrow: string;
    title: string;
    description: string;
    quoteLead: string;
    quoteHighlight: string;
    quoteRest: string;
    feelEyebrow: string;
    feelBody: string;
  };
  networkLayer: {
    ariaLabel: string;
    eyebrow: string;
    title: string;
    description: string;
    tagline: string;
    cards: {
      icon: string;
      title: string;
      description: string;
      statIcon: string;
      statLabel: string;
      statTone: "emerald" | "orange" | "muted";
    }[];
  };
  infrastructure: {
    ariaLabel: string;
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    quoteLine1: string;
    quoteLine2: string;
    features: { icon: string; label: string }[];
    stackLayers: {
      label: string;
      icon: string;
      variant: "app" | "intel" | "trust" | "global";
    }[];
    uptimeLabel: string;
    uptimeValue: string;
  };
  strategicFinance: {
    ariaLabel: string;
    title: string;
    description: string;
    cards: { title: string; description: string }[];
    paymentLogos: { src: string; alt: string; width: number }[];
    approvals: { avatar: string; name: string; email: string; status: string }[];
    charts: {
      creditHealth: {
        score: string;
        status: string;
        utilizationLabel: string;
        utilizationValue: string;
        limitLabel: string;
        limitValue: string;
      };
      capitalFlow: {
        title: string;
        months: string[];
      };
    };
  };
  finalCta: {
    ariaLabel: string;
    titleLine1: string;
    titleLine2: string;
    titleLine3: string;
    descriptionLine1: string;
    descriptionLine2: string;
    descriptionLine3: string;
    cta: string;
    socialProof: string;
    avatars: string[];
  };
  footer: {
    brand: string;
    copyright: string;
    columns: { title: string; links: { label: string; href: string }[] }[];
  };
};

const en: LandingCopy = {
  nav: [
    { href: "/product", label: "Product" },
    { href: "/product#why-sozu", label: "Whitepaper" },
    { href: "/product#financing-bnpl", label: "Vaults" },
    { href: "/product#pay-receipt-flow", label: "Developers" },
  ],
  lang: {
    otherLocaleLabel: "ES",
    otherLocaleHref: "/",
    switchAria: "Switch to Spanish",
  },
  header: {
    menu: "Menu",
    menuAria: "Toggle menu",
    logoAlt: "SOZU CAPITAL",
    brand: "SOZU",
    login: "Log In",
    startMission: "Start Mission",
  },
  hero: {
    scrollHint: "Scroll",
    betaBadge: "Apply for private beta",
    title: "Your Financial OS for the Internet Economy",
    body: "Move money globally with USDC, earn yield on idle balances, access credit, and off-ramp to local currency in minutes.",
    ctaPrimary: "Get Early Access",
    ctaSecondary: "Watch Demo",
    stats: {
      capitalLabel: "Capital efficiency",
      capitalValue: "$356,810.10",
      creditScore: "98.2",
      creditLabel: "DeFi credit score",
      vaultLabel: "Vault deployment",
      vaultPercent: "78%",
    },
  },
  partners: {
    ariaLabel: "Institutional partners",
    heading: "Trusted by leading institutional partners",
  },
  pathways: {
    ariaLabel: "Personal and business pathways",
    eyebrow: "get paid online today",
    titleLine1: "Built for founders,",
    titleLine2: "freelancers and modern",
    titleLine3: "merchants.",
    individuals: {
      label: "INDIVIDUALS",
      title: "Earn, save, borrow, and move money globally",
      description:
        "For people who earn online, invoice internationally, hold USDC, need fast liquidity, and want better yield than traditional banks.",
      features: [
        "Yield",
        "Credit",
        "International payments",
        "Fast off-ramp",
        "Personal treasury",
      ],
      cta: "Start Personal OS",
    },
    businesses: {
      label: "BUSINESSES",
      title: "Modern payment infrastructure",
      description:
        "For businesses that process payments, move supplier money, pay teams internationally, want lower fees, and want ownership over their payment rails.",
      features: [
        "Merchant rails",
        "Treasury management",
        "Supplier payments",
        "Stablecoin settlements",
        "Faster cash flow",
      ],
      cta: "Deploy Business OS",
    },
  },
  problem: {
    ariaLabel: "The problem with traditional finance",
    line1: "Sozu tracks your runway and burn rate",
    line2: "it understands your financial life and helps make better decisions",
    line3: "without losing custody of your money",
    line4: "or your data.",
    line5:
      "We also help you receive online payments quickly and easily—in minutes, not days.",
    bodyLead:
      "Traditional banking systems were built for a slower world: business hours, expensive intermediaries, international friction, delayed settlements, and idle capital earning nothing.",
    bodyClose:
      "Sozu replaces fragmented financial tools with programmable money infrastructure designed for modern internet-native businesses.",
  },
  solution: {
    ariaLabel: "The Sozu solution",
    eyebrow: "The Solution",
    title: "Money should move as fast as the internet.",
    cards: [
      {
        icon: "/figma/solution/icon-earn.svg",
        iconWidth: 27,
        iconHeight: 24,
        title: "Earn on Idle Capital",
        description:
          "Turn inactive balances into productive capital with integrated yield opportunities directly from your account.",
      },
      {
        icon: "/figma/solution/icon-credit.svg",
        iconWidth: 24,
        iconHeight: 24,
        title: "Access Credit Faster",
        description:
          "Unlock working capital without traditional banking friction. Built for businesses and operators that need liquidity in real time.",
      },
      {
        icon: "/figma/solution/icon-payments.svg",
        iconWidth: 18,
        iconHeight: 24,
        title: "Receive Payments Globally",
        description:
          "Accept USDC payments instantly from clients, customers, or partners anywhere in the world.",
      },
      {
        icon: "/figma/solution/icon-offramp.svg",
        iconWidth: 24,
        iconHeight: 24,
        title: "Off-Ramp to Local Currency",
        description:
          "Convert USDC into CLP or local fiat rails quickly through integrated payout infrastructure.",
      },
      {
        icon: "/figma/solution/icon-rails.svg",
        iconWidth: 24,
        iconHeight: 24,
        title: "Merchant-Owned Payment Rails",
        description:
          "Your business shouldn’t depend entirely on third-party processors controlling your margins, freezes, or settlement times.",
      },
    ],
  },
  pricing: {
    ariaLabel: "Pricing plans",
    title: "Flexible Capital Solutions",
    description: "Choose the perfect plan to scale, save, and maximize value.",
    billingToggleLabel: "Billing period",
    monthly: "Monthly",
    yearly: "Yearly",
    plans: [
      {
        name: "Seed Plan",
        description: "Perfect for startups exploring capital automation.",
        price: "free",
        cta: "Start a Project",
        features: [
          "Simple Invoicing Solutions",
          "Comprehensive Dashboard",
          "Expense Management",
          "24/7 Email Assistance",
          "Basic Reporting Features",
        ],
      },
      {
        name: "Growth Plan",
        description: "For growing teams who need more power and flexibility.",
        price: "$160",
        priceYearly: "$1,280",
        period: "/Month",
        periodYearly: "/Year",
        cta: "Start a Project",
        featured: true,
        badge: "Most Popular",
        features: [
          "All Features at No Cost",
          "Endless Dashboard Options",
          "Collaborate Seamlessly with Team",
          "In-Depth Reporting Tools",
          "Expedited Email Assistance",
        ],
      },
      {
        name: "Institutional Plan",
        description: "Custom solutions for large teams and businesses.",
        price: "$2000",
        priceYearly: "$16,000",
        period: "/Month",
        periodYearly: "/Year",
        cta: "Start a Project",
        features: [
          "Custom Pricing",
          "Everything in Pro",
          "Dedicated Account Manager",
          "API Access & Integrations",
          "Custom Security & Compliance",
        ],
      },
    ],
  },
  smartMoney: {
    eyebrow: "In plain language",
    title: "What is “smart money”?",
    description:
      "It’s how we talk about stable, programmable global dollars you control—not a marketing buzzword. You get the clarity of digital dollars for daily operations, with room to automate payouts, reporting, and growth without handing the keys to another “black box” fintech.",
    cards: [
      {
        title: "Stable for real life",
        body: "Anchor invoices, payroll, and reporting in a unit people already understand—so finance and ops aren’t guessing.",
      },
      {
        title: "Programmable for scale",
        body: "Automate splits, treasury rules, and disbursements with infrastructure meant to integrate—not a patchwork of bank portals.",
      },
      {
        title: "Yours, not ours",
        body: "Non-custodial by design: sovereignty over funds, fewer intermediaries in the middle, and transparency where NGOs and distributed teams need it most.",
      },
    ],
  },
  tagSearch: {
    label: "Check a Sozu Tag",
    placeholder: "yourname or tienda.cl",
    hint: "Type without the dollar sign—we format it. Demo registry only; availability will follow product launch rules.",
    checking: "Checking…",
    errorGeneric: "Couldn’t check right now. Try again.",
    errorNetwork: "Network error. Try again.",
    createWalletCta: "Create wallet & continue",
    createWalletHint: "Start onboarding to claim your tag and receive payments.",
  },
  sozuTags: {
    eyebrow: "Sozu Tags",
    title: "Send money with a name. Not a form.",
    description:
      "No account numbers. No personal data in the thread. Search a name, confirm the tag, send instantly—on the same non-custodial, global smart-money rails you use everywhere else.",
    benefits: [
      {
        title: "No mistakes",
        body: "No more copying long account numbers—or fat-fingering the one digit that breaks everything.",
      },
      {
        title: "No personal data sharing",
        body: "No RUT dumps. No bank details in the chat. The tag is the address; you choose what else to share.",
      },
      {
        title: "Instant payments",
        body: "Search → tap → send. The flow should feel like messaging, not like filing a wire request.",
      },
      {
        title: "Works globally",
        body: "Same tag anywhere your counterparty uses Sozu—one identity layer on global rails.",
      },
    ],
    mustHaves: [
      { title: "Fast tag search", body: "Find the right person or business in milliseconds." },
      { title: "Verified badges", body: "So customers know which $cafe is the real storefront." },
      { title: "QR tied to tag", body: "Scan in store; pay resolves to the same tag behind the scenes." },
      {
        title: "Payment links",
        body: "Share sozu.app/@yourname or your $tag—pay lands in your wallet, not a form.",
      },
    ],
    identityLead: "Sozu Tags are your",
    identityLayer: "identity layer",
    identityAnd: " and a ",
    identityMoat: "network moat",
    identityRest:
      "—the same playbook that made $cashtags and @handles feel inevitable, but built for money that stays yours: non-custodial, global, and tied to smart dollars—not a custodial ledger in someone else’s app.",
    killerEyebrow: "Killer combo",
    killerTitle: "Tag + QR + NFC = checkout without the POS baggage.",
    killerBody:
      "Dedicated terminals, thermal paper, and bolt-on acquirer UX made sense a decade ago. For most merchants today it’s unnecessary cost and friction. Sozu is the in-person stack you already carry: tap, scan, or pay a tag—then a digital receipt both sides can trust (see ",
    killerReceiptsLink: "Smart Receipts",
    killerBodyAfter: ").",
  },
  smartReceipts: {
    eyebrow: "Smart Receipts",
    title: "Receipts, without paper",
    description:
      "Automatic digital receipts for every payment—saved, organized, and ready when you need them. No printers. No waste. No lost receipts.",
    pullQuote: "No paper receipts. Everything saved digitally.",
    features: [
      {
        title: "Automatic",
        body: "Every payment generates a receipt instantly—no extra taps, no “did you remember to print?”",
      },
      {
        title: "Stored forever",
        body: "Kept in the payer’s wallet and in the merchant dashboard so neither side loses the paper trail.",
      },
      {
        title: "Shareable",
        body: "Send a link, export a PDF, or push through WhatsApp or email when accountants or customers ask.",
      },
      {
        title: "Legally serious (Chile)",
        body: "For real retail adoption we’re planning alignment with Servicio de Impuestos Internos (SII) rules—on the roadmap: electronic boleta / factura integration so digital receipts match what regulators expect.",
      },
    ],
    benefits: [
      { title: "Save costs", body: "No thermal paper, no receipt printers, fewer consumables on every lane." },
      { title: "Instant access", body: "Find any receipt in seconds—search by amount, tag, or date." },
      { title: "Organized finances", body: "Revenue and payouts stay tied to the same record, automatically." },
      {
        title: "Better for the planet",
        body: "Less waste, less one-time paper—without telling people to “go paperless” with a worse experience.",
      },
    ],
    footnote:
      "We never say “no receipts”—we say receipts without paper: the record still matters; it’s automatic, digital, and portable.",
  },
  payFlow: {
    eyebrow: "Combined power",
    title: "One flow: pay in seconds, file it automatically",
    description:
      "Sozu Tags and Smart Receipts aren’t the whole story—they make smart money easier to send, easier to track, and easier to operate in the real world. Together they support the core promise: better movement of money and better cash flow.",
    stepsTitle: "How it feels end-to-end",
    steps: [
      "Merchant enters amount (or picks preset).",
      "Customer taps card / phone, scans QR, or pays a Sozu Tag.",
      "Payment settles via tag, QR, or NFC—same rails, your choice of surface.",
      "Confirmation in seconds—no “pending” mystery state.",
      "Smart Receipt auto-generated for payer and payee.",
      "Both sides keep it: wallet history + merchant dashboard, shareable anytime.",
    ],
    tagline:
      "Faster than legacy POS. Cleaner than banking apps that still make you hunt for proof of payment.",
    posTitle: "vs. countertop POS",
    posBody:
      "Traditional POS stacks often mean leased hardware, per-lane paper, opaque acquirer fees, and reconciliation that happens somewhere else. If your checkout still feels like 2012, you’re paying for UX and inventory you shouldn’t need—especially when your customers already have a phone.",
    optimizeTitle: "What we’re optimizing for",
    optimizeBody:
      "Use Sozu when you want identity (tags), acceptance (QR/NFC), and proof (Smart Receipts) to be the same system—not three vendors and a shoebox of thermal slips.",
    footnote:
      "Tags + receipts amplify smart money—they aren’t a substitute for global, non-custodial settlement and treasury. Lead with the money; let the UX remove the stupid parts.",
  },
  coreBenefits: {
    eyebrow: "Problems we solve",
    title: "Why teams switch to Sozu",
    description:
      "Most visitors aren’t browsing—they’re asking whether this beats what they use today for cross-border work from Latin America (and beyond). Here’s what we’re built to fix.",
    items: [
      {
        title: "Faster, fairer global rails",
        body: "International payments shouldn’t mean days of delay, surprise fees, or painful FX. Sozu is for anyone who has already outgrown “send money” apps that tax every hop.",
      },
      {
        title: "One view of cash flow",
        body: "Money split across banks, wallets, and spreadsheets is how mistakes happen. We unify how you collect, hold, and deploy stable digital dollars so you can see the whole picture.",
      },
      {
        title: "Credit that fits how you work",
        body: "Freelancers, shops, and NGOs don’t need another savings account—they need flexible financing (BNPL, factoring, credit) tied to real activity, not a generic score.",
      },
      {
        title: "Built for trust on the ground",
        body: "Teams distributing aid or paying contractors need traceability without leaking sensitive detail. We care about transparency for operators, not theater for dashboards.",
      },
    ],
  },
  products: {
    eyebrow: "Platform",
    title: "One stack—not a patchwork",
    description:
      "We’re not pitching “another neobank.” Sozu is infrastructure: payments and financing on stablecoins so you can operate globally like you already live online—starting with the workflows freelancers, merchants, and field organizations told us hurt the most.",
    items: [
      {
        name: "SozuPay & wallet",
        summary:
          "Non-custodial wallet and payment flows so you can receive, send, and hold stable digital dollars with control that feels like yours—not a custodial account.",
      },
      {
        name: "Cash flow & operations",
        summary:
          "Dashboards and primitives for how money moves through your business: less tab-switching between banks and “crypto apps,” more clarity for day-to-day decisions.",
      },
      {
        name: "Ramps & integrations",
        summary:
          "Efficient paths to local currency when you need off-ramps, plus an open, programmable stack so your product or org can automate as you scale.",
      },
    ],
  },
  cashOut: {
    eyebrow: "Local when you need it",
    title: "Cash out to real-world rails",
    description:
      "Ideal state for our customers: earn and hold in stable digital dollars, then convert to local currency when life or suppliers demand it—without giving up visibility on fees or FX.",
    p1: "We're designing ramps and partner paths so moving between on-system balances and bank or cash-out endpoints stays predictable—fewer surprises than opaque P2P marketplaces, fewer days lost to correspondent banking.",
    p2: "If you import, sell online, or run payroll across countries, the question is always the same: what do I actually receive after fees and spread? Sozu is being built so that answer is legible, not buried.",
    disclaimer:
      "Availability depends on jurisdiction, partners, and compliance—we'll ship ramps progressively and publish clear states in-product.",
  },
  financing: {
    eyebrow: "Growth",
    title: "Financing & BNPL",
    description:
      "Small businesses and freelancers rarely fail for lack of hustle—they fail for lack of flexible credit. We’re embedding BNPL, factoring-style tools, and working-capital products so growth is tied to how you already move money, not a disconnected loan app.",
    bnplTitle: "Buy now, pay later",
    bnplBody:
      "Offer customers time to pay while you get liquidity up front—at checkout, on invoices, or in B2B terms—with controls that match how you already think about risk and brand.",
    wcTitle: "Working capital & factoring",
    wcBody:
      "Unlock inventory, payroll, or program spend from activity on-platform. Fewer spreadsheets, fewer “sorry, credit committee” moments—more room to execute on the next contract or distribution round.",
  },
  whoItsFor: {
    eyebrow: "Audience",
    title: "Who it’s for",
    description:
      "Today’s early adopters already live a global economy from Latin America—they’re just trapped in local systems that are slow, expensive, and fragmented. Tomorrow we’re also speaking to import/export SMEs, online sellers, and remote companies that need the same rails with less crypto jargon.",
    personas: [
      {
        line: "Freelancers & digital builders who invoice abroad and refuse to lose weekends to FX and fees.",
        detail: "Designers, developers, creators—already global, still punished by local rails.",
      },
      {
        line: "Merchants & SMBs paying suppliers or getting paid across borders (imports, e‑commerce, services).",
        detail: "You move dollars today; you deserve software that matches that reality.",
      },
      {
        line: "NGOs & field teams distributing funds where transparency and speed both matter.",
        detail: "Traceability for operators, dignity for recipients—without custodial black boxes.",
      },
      {
        line: "Crypto‑native operators who want stablecoins in daily workflows—not just on a CEX.",
        detail: "You already speak USDC; we’re building the operating layer on top.",
      },
    ],
  },
  whySozu: {
    eyebrow: "Why we exist",
    title: "Why Sozu",
    description:
      "Money still isn’t designed for the internet—or for teams operating globally from Latin America. We started from field experience: fragmented systems, slow aid flows, and dependence on intermediaries who don’t share your urgency. Sozu is the alternative: programmable, non-custodial infrastructure with values that are simple to say and hard to fake—sovereignty, access, transparency, and obsession with your growth.",
    quoteLead: "If you only need to move money once, there are plenty of apps. If you need to ",
    quoteHighlight: "operate and grow",
    quoteRest:
      " with global money—one stack, fewer hidden fees, custody that stays yours—that’s why we exist.",
    feelEyebrow: "How we want to feel",
    feelBody:
      "Global. Intelligent. Reliable. Frictionless. Powerful. Modern—we build like a product team that respects your time: show how it works, be blunt about tradeoffs, and earn trust in the first scroll, not the fifth sales call.",
  },
  networkLayer: {
    ariaLabel: "Sozu network layer",
    eyebrow: "Network Layer",
    title: "We got your back.",
    description:
      "Sozu is not just a payments app. It’s a financial network where businesses can move capital faster, support each other’s growth, unlock shared liquidity, and reduce financial friction together.",
    tagline: "The stronger the network, the more efficient capital becomes for everyone inside it.",
    cards: [
      {
        icon: "/figma/network/icon-shared.svg",
        title: "Shared Liquidity",
        description:
          "Access deep pools of capital maintained by the collective network, ensuring you're never illiquid during peak expansion.",
        statIcon: "/figma/network/stat-up.svg",
        statLabel: "+24% Efficiency Gain",
        statTone: "emerald",
      },
      {
        icon: "/figma/network/icon-growth.svg",
        title: "Collaborative Growth",
        description:
          "Support peer businesses within the Sozu ecosystem through automated vaults for secure decentralized credit facilities.",
        statIcon: "/figma/network/stat-cooperative.svg",
        statLabel: "Active Cooperative",
        statTone: "orange",
      },
      {
        icon: "/figma/network/icon-friction.svg",
        title: "Reduced Friction",
        description:
          "By transacting within a unified ledger system, settlement happens instantly, removing traditional bank delay and fees.",
        statIcon: "/figma/network/stat-settlement.svg",
        statLabel: "Instant Settlement",
        statTone: "muted",
      },
    ],
  },
  infrastructure: {
    ariaLabel: "Financial infrastructure",
    eyebrow: "Hardened Infrastructure",
    titleLine1: "Built on modern",
    titleLine2: "financial rails.",
    description:
      "Powered by USDC, Stellar, programmable payments, self-custodial infrastructure, and private settlement systems.",
    quoteLine1: "Built for speed, transparency, and ownership.",
    quoteLine2: "We provide the intelligence; you retain the control.",
    features: [
      { icon: "/figma/infrastructure/icon-1.svg", label: "USDC Native" },
      { icon: "/figma/infrastructure/icon-2.svg", label: "Stellar Protocol" },
      { icon: "/figma/infrastructure/icon-3.svg", label: "Self-Custodial" },
      { icon: "/figma/infrastructure/icon-4.svg", label: "24/7 Settlement" },
    ],
    stackLayers: [
      { label: "APPLICATION LAYER", icon: "/figma/infrastructure/icon-5.svg", variant: "app" },
      { label: "INTELLIGENCE ENGINE", icon: "/figma/infrastructure/icon-6.svg", variant: "intel" },
      { label: "TRUSTLESS PROTOCOL", icon: "/figma/infrastructure/icon-7.svg", variant: "trust" },
      { label: "GLOBAL SETTLEMENT", icon: "/figma/infrastructure/icon-8.svg", variant: "global" },
    ],
    uptimeLabel: "SYSTEM UPTIME",
    uptimeValue: "99.99%",
  },
  strategicFinance: {
    ariaLabel: "Strategic finance features",
    title: "Strategic Finance for Modern Ventures",
    description:
      "Tailored financial tools designed to simplify management, boost efficiency, and support your business's growth.",
    cards: [
      {
        title: "Global Capital Deployment",
        description:
          "Connect effortlessly with any payment gateway to accept payments seamlessly and keep transactions running smoothly.",
      },
      {
        title: "Unrestricted Liquidity",
        description:
          "Send and receive payments anytime, anywhere, without restrictions — empowering your business to operate freely.",
      },
      {
        title: "Automated Portfolio Management",
        description:
          "Schedule payments in advance and automate recurring bills to stay organized and never miss a due date.",
      },
      {
        title: "Real-Time Performance Analytics",
        description:
          "Monitor every expense as it happens, giving you instant clarity and full control over your spending.",
      },
    ],
    paymentLogos: [
      { src: "/figma/strategic/stripe.svg", alt: "Stripe", width: 25 },
      { src: "/figma/strategic/paypal.svg", alt: "PayPal", width: 15 },
      { src: "/figma/strategic/apple-pay.svg", alt: "Apple Pay", width: 25 },
      { src: "/figma/strategic/google-pay.svg", alt: "Google Pay", width: 25 },
    ],
    approvals: [
      {
        avatar: "/figma/strategic/avatar-2.jpg",
        name: "Arjun Malik",
        email: "arjun@example.com",
        status: "Approved",
      },
      {
        avatar: "/figma/strategic/avatar-5.jpg",
        name: "Ravi Kumar",
        email: "ravi@example.com",
        status: "Approved",
      },
    ],
    charts: {
      creditHealth: {
        score: "82%",
        status: "Excellent",
        utilizationLabel: "Utilization",
        utilizationValue: "12.4%",
        limitLabel: "Limit",
        limitValue: "$40,000",
      },
      capitalFlow: {
        title: "Capital Flow",
        months: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN"],
      },
    },
  },
  finalCta: {
    ariaLabel: "Get early access",
    titleLine1: "The next generation of",
    titleLine2: "business banking is already",
    titleLine3: "here.",
    descriptionLine1: "Join Sozu and start operating with internet money.",
    descriptionLine2: "Take control of your treasury, leverage your network,",
    descriptionLine3: "and move forward with clarity and speed.",
    cta: "Get Early Access",
    socialProof: "Joined by 300 companies this month",
    avatars: [
      "/figma/cta/avatar-1.jpg",
      "/figma/cta/avatar-2.jpg",
      "/figma/cta/avatar-5.jpg",
    ],
  },
  footer: {
    brand: "SOZU",
    copyright: "© 2026 Sozu Capital Design System v1.0",
    columns: [
      {
        title: "System",
        links: [
          { label: "Principles", href: "/product#core-benefits" },
          { label: "Tactical View", href: "/product#pay-receipt-flow" },
          { label: "Vault Engine", href: "/product#financing-bnpl" },
        ],
      },
      {
        title: "Intelligence",
        links: [
          { label: "Runway Tracking", href: "#problem" },
          { label: "Burn Optimization", href: "/product#cash-out" },
          { label: "API Sync", href: "/product#pay-receipt-flow" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Privacy", href: "#footer" },
          { label: "Non-Custodial Policy", href: "#footer" },
          { label: "Terms", href: "#footer" },
        ],
      },
    ],
  },
};

const es: LandingCopy = {
  nav: [
    { href: "/product", label: "Producto" },
    { href: "/product#why-sozu", label: "Whitepaper" },
    { href: "/product#financing-bnpl", label: "Bóvedas" },
    { href: "/product#pay-receipt-flow", label: "Desarrolladores" },
  ],
  lang: {
    otherLocaleLabel: "EN",
    otherLocaleHref: "/en",
    switchAria: "Ver sitio en inglés",
  },
  header: {
    menu: "Menú",
    menuAria: "Abrir o cerrar menú",
    logoAlt: "SOZU CAPITAL",
    brand: "SOZU",
    login: "Iniciar sesión",
    startMission: "Iniciar misión",
  },
  hero: {
    scrollHint: "Desliza",
    betaBadge: "Postula al beta privado",
    title: "Tu sistema financiero para la economía de internet",
    body: "Mueve dinero global con USDC, genera rendimiento en saldos ociosos, accede a crédito y retira a moneda local en minutos.",
    ctaPrimary: "Acceso anticipado",
    ctaSecondary: "Ver demo",
    stats: {
      capitalLabel: "Eficiencia de capital",
      capitalValue: "$356,810.10",
      creditScore: "98.2",
      creditLabel: "Score crediticio DeFi",
      vaultLabel: "Despliegue en bóvedas",
      vaultPercent: "78%",
    },
  },
  partners: {
    ariaLabel: "Socios institucionales",
    heading: "Con la confianza de socios institucionales",
  },
  pathways: {
    ariaLabel: "Rutas para personas y negocios",
    eyebrow: "cobra online hoy",
    titleLine1: "Hecho para founders,",
    titleLine2: "freelancers y comercios",
    titleLine3: "modernos.",
    individuals: {
      label: "PERSONAS",
      title: "Gana, ahorra, pide prestado y mueve dinero globalmente",
      description:
        "Para quienes ganan online, facturan al exterior, guardan USDC, necesitan liquidez rápida y quieren mejor rendimiento que los bancos tradicionales.",
      features: [
        "Rendimiento",
        "Crédito",
        "Pagos internacionales",
        "Off-ramp rápido",
        "Tesorería personal",
      ],
      cta: "Iniciar OS personal",
    },
    businesses: {
      label: "NEGOCIOS",
      title: "Infraestructura de pagos moderna",
      description:
        "Para negocios que procesan pagos, mueven dinero a proveedores, pagan equipos internacionalmente, quieren menos fees y control sobre sus rails de pago.",
      features: [
        "Rails para comercios",
        "Gestión de tesorería",
        "Pagos a proveedores",
        "Liquidaciones en stablecoins",
        "Flujo de caja más rápido",
      ],
      cta: "Desplegar OS de negocio",
    },
  },
  problem: {
    ariaLabel: "El problema de la finanza tradicional",
    line1: "Sozu sigue tu runway y burn rate",
    line2: "entiende tu vida financiera y ayuda a tomar mejores decisiones",
    line3: "sin perder custodia de tu dinero",
    line4: "ni de tus datos.",
    line5:
      "Además te ayudamos a recibir pagos online de forma rápida y sencilla, en minutos, no días.",
    bodyLead:
      "La banca tradicional se construyó para un mundo más lento: horarios de oficina, intermediarios caros, fricción internacional, liquidaciones demoradas y capital ocioso sin rendimiento.",
    bodyClose:
      "Sozu reemplaza herramientas financieras fragmentadas con infraestructura de dinero programable para negocios nativos de internet.",
  },
  solution: {
    ariaLabel: "La solución Sozu",
    eyebrow: "La solución",
    title: "El dinero debería moverse tan rápido como internet.",
    cards: [
      {
        icon: "/figma/solution/icon-earn.svg",
        iconWidth: 27,
        iconHeight: 24,
        title: "Rendimiento en capital ocioso",
        description:
          "Convierte saldos inactivos en capital productivo con oportunidades de yield integradas desde tu cuenta.",
      },
      {
        icon: "/figma/solution/icon-credit.svg",
        iconWidth: 24,
        iconHeight: 24,
        title: "Accede a crédito más rápido",
        description:
          "Desbloquea capital de trabajo sin la fricción bancaria tradicional. Para negocios y operadores que necesitan liquidez en tiempo real.",
      },
      {
        icon: "/figma/solution/icon-payments.svg",
        iconWidth: 18,
        iconHeight: 24,
        title: "Recibe pagos globales",
        description:
          "Acepta pagos en USDC al instante de clientes, compradores o partners en cualquier parte del mundo.",
      },
      {
        icon: "/figma/solution/icon-offramp.svg",
        iconWidth: 24,
        iconHeight: 24,
        title: "Off-ramp a moneda local",
        description:
          "Convierte USDC a CLP o rails fiat locales rápidamente con infraestructura de payout integrada.",
      },
      {
        icon: "/figma/solution/icon-rails.svg",
        iconWidth: 24,
        iconHeight: 24,
        title: "Rails de pago del comercio",
        description:
          "Tu negocio no debería depender por completo de procesadores que controlan márgenes, congelamientos o tiempos de liquidación.",
      },
    ],
  },
  pricing: {
    ariaLabel: "Planes de precios",
    title: "Soluciones de capital flexibles",
    description: "Elige el plan ideal para escalar, ahorrar y maximizar valor.",
    billingToggleLabel: "Periodo de facturación",
    monthly: "Mensual",
    yearly: "Anual",
    plans: [
      {
        name: "Plan Seed",
        description: "Ideal para startups explorando automatización de capital.",
        price: "free",
        cta: "Iniciar proyecto",
        features: [
          "Facturación simple",
          "Dashboard completo",
          "Gestión de gastos",
          "Soporte por email 24/7",
          "Reportes básicos",
        ],
      },
      {
        name: "Plan Growth",
        description: "Para equipos en crecimiento que necesitan más potencia y flexibilidad.",
        price: "$160",
        priceYearly: "$1,280",
        period: "/mes",
        periodYearly: "/año",
        cta: "Iniciar proyecto",
        featured: true,
        badge: "Más popular",
        features: [
          "Todas las funciones incluidas",
          "Opciones de dashboard ilimitadas",
          "Colaboración en equipo",
          "Reportes avanzados",
          "Soporte email prioritario",
        ],
      },
      {
        name: "Plan Institucional",
        description: "Soluciones a medida para equipos grandes y empresas.",
        price: "$2000",
        priceYearly: "$16,000",
        period: "/mes",
        periodYearly: "/año",
        cta: "Iniciar proyecto",
        features: [
          "Precios personalizados",
          "Todo en Pro",
          "Account manager dedicado",
          "API e integraciones",
          "Seguridad y compliance a medida",
        ],
      },
    ],
  },
  smartMoney: {
    eyebrow: "En criollo",
    title: "¿Qué es el “dinero smart”?",
    description:
      "Así llamamos a dólares globales estables y programables que tú controlas: no es un eslogan vacío. Ganas claridad para operar el día a día, con espacio para automatizar pagos, reportes y crecimiento sin entregar las llaves a otra fintech “caja negra”.",
    cards: [
      {
        title: "Estable para la vida real",
        body: "Ancla facturas, nómina y reportes en una unidad que todos entienden—finanzas y operaciones sin adivinar.",
      },
      {
        title: "Programable para escalar",
        body: "Automatiza repartos, reglas de tesorería y desembolsos con infra pensada para integrarse, no con un parche de portales bancarios.",
      },
      {
        title: "Tuyo, no nuestro",
        body: "No custodial por diseño: soberanía sobre los fondos, menos intermediarios, y transparencia donde ONGs y equipos distribuidos más lo necesitan.",
      },
    ],
  },
  tagSearch: {
    label: "Busca un Sozu Tag",
    placeholder: "tunombre o tienda.cl",
    hint: "Escribe sin el signo $—nosotros lo formateamos. Registro demo; la disponibilidad final seguirá reglas del producto.",
    checking: "Buscando…",
    errorGeneric: "No pudimos verificar ahora. Intenta de nuevo.",
    errorNetwork: "Error de red. Intenta de nuevo.",
    createWalletCta: "Crear billetera y continuar",
    createWalletHint: "Inicia el onboarding para reservar tu tag y recibir pagos.",
  },
  sozuTags: {
    eyebrow: "Sozu Tags",
    title: "Envía dinero con un nombre. No con un formulario.",
    description:
      "Sin números de cuenta largos. Sin datos personales en el chat. Buscas un nombre, confirmas el tag y envías al instante—sobre los mismos rieles globales no custodiales de dinero smart.",
    benefits: [
      {
        title: "Sin errores",
        body: "Se acabó copiar números interminables—y el dígito mal tipeado que lo arruina todo.",
      },
      {
        title: "Sin compartir datos personales",
        body: "Sin RUT en el hilo. Sin datos bancarios en el chat. El tag es la dirección; tú decides qué más compartir.",
      },
      {
        title: "Pagos al instante",
        body: "Buscar → tocar → enviar. Debe sentirse como un mensaje, no como una carta de instrucciones al banco.",
      },
      {
        title: "Funciona en todo el mundo",
        body: "El mismo tag donde tu contraparte use Sozu—una capa de identidad sobre rieles globales.",
      },
    ],
    mustHaves: [
      { title: "Búsqueda ultrarrápida", body: "Encuentra a la persona o al negocio correcto en milisegundos." },
      { title: "Insignias verificadas", body: "Para que el cliente sepa cuál $cafe es el local real." },
      { title: "QR ligado al tag", body: "Escaneas en tienda; el pago resuelve al mismo tag detrás de escena." },
      {
        title: "Links de pago",
        body: "Comparte sozu.app/@tunombre o tu $tag—el pago cae en tu billetera, no en un formulario.",
      },
    ],
    identityLead: "Los Sozu Tags son tu",
    identityLayer: "capa de identidad",
    identityAnd: " y tu ",
    identityMoat: "foso de red",
    identityRest:
      "—el mismo guion que hizo inevitables los $cashtags y los @, pero para plata que sigue siendo tuya: no custodial, global y atada a dinero smart—no a un libro mayor custodial en la app de otro.",
    killerEyebrow: "Combo ganador",
    killerTitle: "Tag + QR + NFC = cobro sin el lastre del POS clásico.",
    killerBody:
      "Terminales dedicados, rollo térmico y UX acoplada tuvieron sentido hace diez años. Hoy, para la mayoría de los comercios, es costo y fricción de más. Sozu es el stack en persona que ya llevas: tocar, escanear o pagar un tag—y luego un comprobante digital en el que ambos confían (ver ",
    killerReceiptsLink: "Smart Receipts",
    killerBodyAfter: ").",
  },
  smartReceipts: {
    eyebrow: "Smart Receipts",
    title: "Comprobantes, sin papel",
    description:
      "Comprobantes digitales automáticos para cada pago—guardados, ordenados y listos cuando los necesitas. Sin impresoras. Sin desperdicio. Sin comprobantes perdidos.",
    pullQuote: "Sin rollos de papel. Todo guardado en digital.",
    features: [
      {
        title: "Automático",
        body: "Cada pago genera comprobante al instante—sin toques extra ni “¿te acordaste de imprimir?”",
      },
      {
        title: "Guardado para siempre",
        body: "En la billetera del pagador y en el panel del comercio para que ningún lado pierda la pista.",
      },
      {
        title: "Compartible",
        body: "Manda un link, exporta PDF o reenvía por WhatsApp o correo cuando contadores o clientes lo pidan.",
      },
      {
        title: "Serio legalmente (Chile)",
        body: "Para adopción retail real estamos planificando alineación con normas del Servicio de Impuestos Internos (SII)—en roadmap: integración con boleta/factura electrónica para que el comprobante digital calce con lo que reguladores esperan.",
      },
    ],
    benefits: [
      { title: "Ahorro de costos", body: "Sin papel térmico, sin impresoras de comprobante, menos consumibles por caja." },
      { title: "Acceso instantáneo", body: "Encuentra cualquier comprobante en segundos—por monto, tag o fecha." },
      { title: "Finanzas ordenadas", body: "Ingresos y pagos quedan atados al mismo registro, automáticamente." },
      {
        title: "Mejor para el planeta",
        body: "Menos basura, menos papel de un solo uso—sin “vuelve digital” con peor experiencia.",
      },
    ],
    footnote:
      "Nunca decimos “sin comprobantes”—decimos comprobantes sin papel: el registro importa; es automático, digital y portable.",
  },
  payFlow: {
    eyebrow: "Potencia combinada",
    title: "Un flujo: pagas en segundos, lo archivas solo",
    description:
      "Los Sozu Tags y Smart Receipts no son toda la historia—hacen que el dinero smart sea más fácil de enviar, de seguir y de operar en la calle. Juntos sostienen la promesa central: mejor movimiento de plata y mejor flujo de caja.",
    stepsTitle: "Cómo se siente de punta a punta",
    steps: [
      "El comercio ingresa el monto (o elige un preset).",
      "El cliente paga con tarjeta/teléfono, escanea QR o usa un Sozu Tag.",
      "El pago liquida por tag, QR o NFC—mismos rieles, distinta superficie.",
      "Confirmación en segundos—sin el “pendiente” eterno.",
      "Smart Receipt autogenerado para quien paga y quien cobra.",
      "Ambos lo guardan: historial en billetera + panel del comercio, compartible cuando quieran.",
    ],
    tagline:
      "Más rápido que un POS legacy. Más limpio que apps bancarias donde aún cazas el comprobante.",
    posTitle: "vs. POS de mostrador",
    posBody:
      "Los stacks POS clásicos suelen significar hardware arrendado, papel por caja, fees opacos del adquirente y conciliación en otro lado. Si tu checkout sigue sintiendo a 2012, estás pagando UX e inventario que ya no necesitas—sobre todo si tu cliente ya trae el teléfono.",
    optimizeTitle: "Qué estamos optimizando",
    optimizeBody:
      "Usa Sozu cuando quieras identidad (tags), cobro (QR/NFC) y prueba (Smart Receipts) en el mismo sistema—no tres proveedores y una caja de rollos térmicos.",
    footnote:
      "Tags + comprobantes amplifican el dinero smart; no sustituyen liquidación global no custodial ni tesorería. Primero la plata; el UX quita lo absurdo.",
  },
  coreBenefits: {
    eyebrow: "Problemas que resolvemos",
    title: "Por qué los equipos eligen Sozu",
    description:
      "La mayoría no está “curioseando”: pregunta si esto le gana a lo que usa hoy para trabajo cross-border desde Latinoamérica (y más allá). Esto es lo que venimos a arreglar.",
    items: [
      {
        title: "Rieles globales más justos",
        body: "Los pagos internacionales no deberían ser días de espera, fees sorpresa ni FX doloroso. Sozu es para quien ya superó las apps de “enviar plata” que cobran en cada salto.",
      },
      {
        title: "Una vista de flujo de caja",
        body: "Plata repartida entre bancos, billeteras y planillas es cómo nacen errores. Unificamos cobro, tenencia y despliegue en dólares digitales estables para ver el tablero completo.",
      },
      {
        title: "Crédito acorde a tu operación",
        body: "Freelancers, comercios y ONGs no necesitan otra cuenta de ahorro—necesitan financiamiento flexible (BNPL, factoring, crédito) atado a actividad real, no a un puntaje genérico.",
      },
      {
        title: "Confianza en terreno",
        body: "Equipos que distribuyen ayuda o pagan contratistas necesitan trazabilidad sin filtrar datos sensibles. Transparencia para operar, no teatro de dashboard.",
      },
    ],
  },
  products: {
    eyebrow: "Plataforma",
    title: "Un stack—no un parche",
    description:
      "No vendemos “otro neobanco”. Sozu es infraestructura: pagos y financiamiento en stablecoins para operar global como ya vives online—empezando por los flujos que freelancers, comercios y equipos en terreno nos dijeron que duelen.",
    items: [
      {
        name: "SozuPay y billetera",
        summary:
          "Billetera no custodial y flujos de pago para recibir, enviar y guardar dólares digitales estables con control que se siente tuyo—no cuenta custodial.",
      },
      {
        name: "Flujo de caja y operación",
        summary:
          "Paneles y piezas para cómo se mueve la plata en tu negocio: menos saltos entre bancos y “apps cripto”, más claridad día a día.",
      },
      {
        name: "Rampas e integraciones",
        summary:
          "Caminos eficientes a moneda local cuando necesitas salida, más stack abierto y programable para que tu producto u org automatice al escalar.",
      },
    ],
  },
  cashOut: {
    eyebrow: "Local cuando lo necesitas",
    title: "Salida a rieles del mundo real",
    description:
      "Estado ideal: ganas y guardas en dólares digitales estables, y conviertes a moneda local cuando la vida o tus proveedores lo exigen—sin perder de vista fees ni FX.",
    p1: "Estamos diseñando rampas y partners para que mover saldos on-system a banco o cash-out sea predecible—menos sorpresas que marketplaces P2P opacos, menos días perdidos en banca corresponsal.",
    p2: "Si importas, vendes online o pagas nómina transfronteriza, la pregunta es siempre la misma: ¿cuánto me queda después de fees y spread? Sozu se construye para que esa respuesta sea legible, no enterrada.",
    disclaimer:
      "La disponibilidad depende de jurisdicción, partners y compliance—iremos lanzando rampas de forma progresiva y con estados claros en producto.",
  },
  financing: {
    eyebrow: "Crecimiento",
    title: "Financiamiento y BNPL",
    description:
      "PyMEs y freelancers no suelen quebrar por falta de ganas—sino por falta de crédito flexible. Incrustamos BNPL, herramientas tipo factoring y capital de trabajo atados a cómo ya mueves plata, no a un préstamo desconectado.",
    bnplTitle: "Compra ahora, paga después",
    bnplBody:
      "Ofrece plazos al cliente mientras tú recibes liquidez al tiro—en checkout, facturas o términos B2B—con controles acordes a tu riesgo y marca.",
    wcTitle: "Capital de trabajo y factoring",
    wcBody:
      "Desbloquea inventario, nómina o desembolsos de programa desde actividad en plataforma. Menos planillas, menos “lo ve comité de crédito”—más espacio para el próximo contrato o ronda de distribución.",
  },
  whoItsFor: {
    eyebrow: "Audiencia",
    title: "Para quién es",
    description:
      "Los early adopters ya viven una economía global desde Latinoamérica—pero siguen atrapados en sistemas locales lentos, caros y fragmentados. Mañana también hablamos con pymes import/export, e‑commerce y equipos remotos que necesitan los mismos rieles con menos jerga cripto.",
    personas: [
      {
        line: "Freelancers y builders digitales que facturan afuera y se niegan a perder fines de semana en FX y fees.",
        detail: "Diseño, dev, creadores—ya globales, aún castigados por rieles locales.",
      },
      {
        line: "Comercios y pymes que pagan proveedores o cobran cruzando fronteras (import, e‑commerce, servicios).",
        detail: "Ya mueves dólares; mereces software que calce con eso.",
      },
      {
        line: "ONGs y equipos en terreno que distribuyen fondos donde importan transparencia y velocidad.",
        detail: "Trazabilidad para operar, dignidad para beneficiarios—sin cajas negras custodiales.",
      },
      {
        line: "Operadores cripto‑nativos que quieren stablecoins en el día a día—no solo en un exchange.",
        detail: "Ya hablas USDC; estamos armando la capa operativa encima.",
      },
    ],
  },
  whySozu: {
    eyebrow: "Por qué existimos",
    title: "Por qué Sozu",
    description:
      "El dinero sigue sin estar diseñado para internet—ni para equipos que operan global desde Latinoamérica. Partimos de la cancha: sistemas fragmentados, ayuda lenta y dependencia de intermediarios que no comparten tu urgencia. Sozu es la alternativa: infra programable y no custodial con valores simples de decir y difíciles de esfinear—soberanía, acceso, transparencia y obsesión por tu crecimiento.",
    quoteLead: "Si solo necesitas mover plata una vez, hay mil apps. Si necesitas ",
    quoteHighlight: "operar y crecer",
    quoteRest:
      " con dinero global—un stack, menos fees escondidos, custodia tuya—por eso estamos.",
    feelEyebrow: "Cómo queremos sentirnos",
    feelBody:
      "Global. Inteligente. Confiable. Sin fricción. Potente. Moderno—construimos como equipo de producto que respeta tu tiempo: mostrar cómo funciona, ser claros con tradeoffs, y ganar confianza en el primer scroll, no en la quinta llamada comercial.",
  },
  networkLayer: {
    ariaLabel: "Capa de red Sozu",
    eyebrow: "Capa de red",
    title: "Te respaldamos.",
    description:
      "Sozu no es solo una app de pagos. Es una red financiera donde los negocios mueven capital más rápido, se apoyan en su crecimiento, desbloquean liquidez compartida y reducen fricción financiera juntos.",
    tagline: "Cuanto más fuerte es la red, más eficiente se vuelve el capital para todos dentro.",
    cards: [
      {
        icon: "/figma/network/icon-shared.svg",
        title: "Liquidez compartida",
        description:
          "Accede a pools profundos de capital mantenidos por la red colectiva, para no quedarte sin liquidez en picos de expansión.",
        statIcon: "/figma/network/stat-up.svg",
        statLabel: "+24% ganancia de eficiencia",
        statTone: "emerald",
      },
      {
        icon: "/figma/network/icon-growth.svg",
        title: "Crecimiento colaborativo",
        description:
          "Apoya negocios pares en el ecosistema Sozu con bóvedas automatizadas para crédito descentralizado seguro.",
        statIcon: "/figma/network/stat-cooperative.svg",
        statLabel: "Cooperativa activa",
        statTone: "orange",
      },
      {
        icon: "/figma/network/icon-friction.svg",
        title: "Menos fricción",
        description:
          "Al transaccionar en un ledger unificado, la liquidación es instantánea, sin demoras ni fees bancarios tradicionales.",
        statIcon: "/figma/network/stat-settlement.svg",
        statLabel: "Liquidación instantánea",
        statTone: "muted",
      },
    ],
  },
  infrastructure: {
    ariaLabel: "Infraestructura financiera",
    eyebrow: "Infraestructura reforzada",
    titleLine1: "Construido sobre",
    titleLine2: "rieles financieros modernos.",
    description:
      "Impulsado por USDC, Stellar, pagos programables, infraestructura no custodial y sistemas de liquidación privados.",
    quoteLine1: "Hecho para velocidad, transparencia y propiedad.",
    quoteLine2: "Nosotros damos la inteligencia; tú retienes el control.",
    features: [
      { icon: "/figma/infrastructure/icon-1.svg", label: "Nativo en USDC" },
      { icon: "/figma/infrastructure/icon-2.svg", label: "Protocolo Stellar" },
      { icon: "/figma/infrastructure/icon-3.svg", label: "No custodial" },
      { icon: "/figma/infrastructure/icon-4.svg", label: "Liquidación 24/7" },
    ],
    stackLayers: [
      { label: "CAPA DE APLICACIÓN", icon: "/figma/infrastructure/icon-5.svg", variant: "app" },
      { label: "MOTOR DE INTELIGENCIA", icon: "/figma/infrastructure/icon-6.svg", variant: "intel" },
      { label: "PROTOCOLO TRUSTLESS", icon: "/figma/infrastructure/icon-7.svg", variant: "trust" },
      { label: "LIQUIDACIÓN GLOBAL", icon: "/figma/infrastructure/icon-8.svg", variant: "global" },
    ],
    uptimeLabel: "UPTIME DEL SISTEMA",
    uptimeValue: "99.99%",
  },
  strategicFinance: {
    ariaLabel: "Finanzas estratégicas",
    title: "Finanzas estratégicas para ventures modernos",
    description:
      "Herramientas financieras a medida para simplificar gestión, impulsar eficiencia y apoyar el crecimiento de tu negocio.",
    cards: [
      {
        title: "Despliegue de capital global",
        description:
          "Conecta con cualquier gateway de pago para cobrar sin fricción y mantener transacciones fluidas.",
      },
      {
        title: "Liquidez sin restricciones",
        description:
          "Envía y recibe pagos en cualquier momento y lugar, sin restricciones, para operar con libertad.",
      },
      {
        title: "Gestión de portafolio automatizada",
        description:
          "Programa pagos y automatiza cuentas recurrentes para no perder fechas de vencimiento.",
      },
      {
        title: "Analítica de performance en tiempo real",
        description:
          "Monitorea cada gasto al instante, con claridad y control total sobre tu spending.",
      },
    ],
    paymentLogos: [
      { src: "/figma/strategic/stripe.svg", alt: "Stripe", width: 25 },
      { src: "/figma/strategic/paypal.svg", alt: "PayPal", width: 15 },
      { src: "/figma/strategic/apple-pay.svg", alt: "Apple Pay", width: 25 },
      { src: "/figma/strategic/google-pay.svg", alt: "Google Pay", width: 25 },
    ],
    approvals: [
      {
        avatar: "/figma/strategic/avatar-2.jpg",
        name: "Arjun Malik",
        email: "arjun@example.com",
        status: "Aprobado",
      },
      {
        avatar: "/figma/strategic/avatar-5.jpg",
        name: "Ravi Kumar",
        email: "ravi@example.com",
        status: "Aprobado",
      },
    ],
    charts: {
      creditHealth: {
        score: "82%",
        status: "Excelente",
        utilizationLabel: "Utilización",
        utilizationValue: "12.4%",
        limitLabel: "Límite",
        limitValue: "$40,000",
      },
      capitalFlow: {
        title: "Flujo de capital",
        months: ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN"],
      },
    },
  },
  finalCta: {
    ariaLabel: "Acceso anticipado",
    titleLine1: "La próxima generación de",
    titleLine2: "banca para negocios ya",
    titleLine3: "está aquí.",
    descriptionLine1: "Únete a Sozu y opera con dinero de internet.",
    descriptionLine2: "Toma control de tu tesorería, aprovecha tu red",
    descriptionLine3: "y avanza con claridad y velocidad.",
    cta: "Acceso anticipado",
    socialProof: "300 empresas se unieron este mes",
    avatars: [
      "/figma/cta/avatar-1.jpg",
      "/figma/cta/avatar-2.jpg",
      "/figma/cta/avatar-5.jpg",
    ],
  },
  footer: {
    brand: "SOZU",
    copyright: "© 2026 Sozu Capital Design System v1.0",
    columns: [
      {
        title: "Sistema",
        links: [
          { label: "Principios", href: "/product#core-benefits" },
          { label: "Vista táctica", href: "/product#pay-receipt-flow" },
          { label: "Motor de bóvedas", href: "/product#financing-bnpl" },
        ],
      },
      {
        title: "Inteligencia",
        links: [
          { label: "Seguimiento de runway", href: "#problem" },
          { label: "Optimización de burn", href: "/product#cash-out" },
          { label: "Sync API", href: "/product#pay-receipt-flow" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Privacidad", href: "#footer" },
          { label: "Política no custodial", href: "#footer" },
          { label: "Términos", href: "#footer" },
        ],
      },
    ],
  },
};

export const landingCopy: Record<LandingLocale, LandingCopy> = {
  es,
  en,
};

export function getLandingCopy(locale: LandingLocale): LandingCopy {
  return landingCopy[locale];
}
