import Link from "next/link";
import { SiteHeader } from "@/components/landing-v2/SiteHeader";
import { getLandingCopy } from "@/lib/landing-copy";

export default function OnboardingPage() {
  const copy = getLandingCopy("es");

  return (
    <div className="landing-v2-grain min-h-dvh bg-background text-foreground">
      <SiteHeader copy={copy} basePath="" />
      <main className="container py-20 md:py-28 max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-4">
          Onboarding
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
          Creación de billetera
        </h1>
        <p className="text-muted leading-relaxed mb-10">
          Este flujo estará disponible pronto. Aquí podrás completar el onboarding y
          asociar tu Sozu Tag a tu billetera no custodial.
        </p>
        <Link
          href="/"
          className="inline-flex font-mono text-sm uppercase tracking-wide text-primary hover:text-primary/80 transition-colors"
        >
          ← Volver al inicio
        </Link>
      </main>
    </div>
  );
}
