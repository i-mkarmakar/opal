"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PRICING_PLANS } from "@/lib/marketing/pricing";
import { cn } from "@/lib/utils";

const freePlan = PRICING_PLANS.find((p) => p.id === "free")!;
const proPlan = PRICING_PLANS.find((p) => p.id === "pro")!;
const primaryCtaStyles =
  "bg-gradient-to-b from-primary to-[color-mix(in_srgb,var(--primary)_55%,black)] text-white hover:text-white active:text-white hover:opacity-95 active:opacity-90 shadow-[0_8px_20px_-10px_hsl(var(--primary)/0.9)] border-transparent";

interface SubscriptionCardProps {
  isPro: boolean;
  onUpgrade: () => void;
  onManageSubscription: () => void;
  loading: boolean;
}

export function SubscriptionCard({
  isPro,
  onUpgrade,
  onManageSubscription,
  loading,
}: SubscriptionCardProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Subscription</CardTitle>
        <CardDescription>Your current plan and billing</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-lg font-semibold">
              {isPro ? `${proPlan.name} Plan` : `${freePlan.name} Plan`}
            </p>
            <p className="text-muted-foreground text-sm">
              {isPro ? proPlan.description : freePlan.description}
            </p>
          </div>
          <span
            className={cn(
              "shrink-0 rounded-full px-3 py-1 text-sm font-medium",
              isPro ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground",
            )}
          >
            {isPro ? "PRO" : "FREE"}
          </span>
        </div>

        {isPro ? (
          <Button variant="outline" onClick={onManageSubscription}>
            Manage Subscription
          </Button>
        ) : (
          <div className="rounded-lg border border-primary/20 bg-primary/10 p-4">
            <h3 className="mb-2 font-semibold">Upgrade to Pro</h3>
            <ul className="mb-4 space-y-2 text-sm text-muted-foreground">
              {proPlan.features.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <Button
              variant="default"
              className={primaryCtaStyles}
              onClick={onUpgrade}
              disabled={loading}
            >
              {loading ? "Loading…" : "Upgrade to Pro"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
