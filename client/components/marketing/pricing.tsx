import Link from "next/link";
import { CheckCircle2, Sparkles, ThumbsUp, Zap } from "lucide-react";
import Container from "@/components/global/container";
import Wrapper from "@/components/global/wrapper";
import { Button } from "@/components/ui/button";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";
import { PRICING_PLANS, type PricingPlan } from "@/lib/marketing/pricing";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const primaryCtaStyles =
  "bg-gradient-to-b from-primary to-[color-mix(in_srgb,var(--primary)_55%,black)] text-white hover:text-white active:text-white hover:opacity-95 active:opacity-90 shadow-[0_8px_20px_-10px_hsl(var(--primary)/0.9)] border-transparent";

const Pricing = () => {
  return (
    <div className="relative flex w-full flex-col items-center justify-center py-16 lg:py-24">
      <div className="pointer-events-none absolute top-1/3 left-1/2 -z-10 h-48 w-3/4 -translate-x-1/2 rounded-full bg-primary/20 blur-[7rem]" />

      <Wrapper>
        <Container>
          <div className="flex flex-col items-start justify-start lg:items-center lg:justify-center">
            <div className="relative mx-auto mb-4 flex w-max items-center justify-center gap-x-1.5 rounded-full border border-neutral-700/70 bg-[#181818]/60 px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="size-3.5 text-primary" />
              Pricing
            </div>
            <h2 className="text-left text-3xl font-semibold tracking-tight text-balance lg:text-center lg:text-4xl">
              Simple pricing that scales <br className="hidden lg:block" /> with your team
            </h2>
            <p className="mt-3 max-w-lg text-left text-base text-muted-foreground lg:text-center lg:text-lg">
              Start free and upgrade when you&apos;re ready—no hidden fees, cancel anytime.
            </p>
          </div>
        </Container>

        <div className="mx-auto mt-12 grid w-full max-w-3xl grid-cols-1 gap-5 md:grid-cols-2">
          {PRICING_PLANS.map((plan, index) => (
            <Container key={plan.id} delay={0.1 + index * 0.08}>
              <PricingCard plan={plan} />
            </Container>
          ))}
        </div>
      </Wrapper>
    </div>
  );
};

type PricingCardProps = {
  plan: PricingPlan;
};

const PricingCard = ({ plan }: PricingCardProps) => {
  const isPro = plan.id === "pro";
  const Icon = isPro ? Zap : ThumbsUp;

  return (
    <div
      className={cn(
        "relative isolate flex h-full flex-col overflow-hidden rounded-2xl border p-6 lg:p-8",
        isPro
          ? "border-primary/30 bg-[#0a0a0a]"
          : "border-border/60 bg-[#0a0a0a]",
      )}
    >
      {isPro && (
        <>
          <DottedGlowBackground
            className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit]"
            gap={10}
            radius={1.5}
            color="rgba(79, 70, 229, 0.18)"
            glowColor="rgba(99, 102, 241, 0.55)"
            darkColor="rgba(129, 140, 248, 0.2)"
            darkGlowColor="rgba(167, 139, 250, 0.8)"
            opacity={0.5}
            backgroundOpacity={0.05}
            speedMin={0.35}
            speedMax={1.1}
            speedScale={0.85}
          />
          <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-48 w-2/3 -translate-x-1/2 rounded-full bg-primary/40 blur-[5rem]" />
          <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-primary/5 via-transparent to-transparent" />
        </>
      )}

      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span
            className={cn(
              "flex size-8 items-center justify-center rounded-full border",
              isPro
                ? "border-primary/30 bg-primary/10 text-primary"
                : "border-border/60 bg-white/5 text-muted-foreground",
            )}
          >
            <Icon className="size-4" />
          </span>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            {plan.name}
          </h3>
        </div>

        {isPro && (
          <span className="rounded-md border border-primary/40 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
            Most popular
          </span>
        )}
      </div>

      <div className="mt-10 flex items-baseline gap-1.5">
        <span className="text-6xl font-semibold tracking-tight text-foreground">
          {plan.priceLabel}
        </span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        {plan.period ? `per ${plan.period}` : "\u00A0"}
      </p>

      <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
        {plan.description}
      </p>

      <Button
        size="lg"
        className={cn(
          "mt-6 w-full rounded-lg",
          isPro
            ? primaryCtaStyles
            : "border border-white/10 bg-white/5 text-foreground hover:bg-white/10",
        )}
        variant={isPro ? "default" : "outline"}
        asChild
      >
        <Link href={ROUTES.SIGN_UP}>Get started</Link>
      </Button>

      <ul className="mt-8 flex flex-1 flex-col gap-3">
        {plan.features.map((line) => (
          <li key={line} className="flex items-center gap-2.5 text-sm">
            <CheckCircle2
              className={cn(
                "size-4 shrink-0",
                isPro ? "text-primary" : "text-muted-foreground",
              )}
              strokeWidth={2}
            />
            <span className="text-muted-foreground">{line}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pricing;
