import { PLAN_LIMITS } from "@/lib/plan-limits";

export type PricingPlan = {
  id: "free" | "pro";
  name: string;
  priceLabel: string;
  period?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
};

const { FREE, PRO } = PLAN_LIMITS;

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    priceLabel: "$0",
    period: "forever",
    description: "Core reviews and chat for side projects and small repos.",
    features: [
      `Up to ${FREE.prs} PR reviews / month`,
      `Up to ${FREE.prsCreated} PRs created with automation`,
      `Up to ${FREE.issues} issue threads`,
      `Up to ${FREE.chat} chat messages`,
    ],
  },
  {
    id: "pro",
    name: "Pro",
    priceLabel: "$9",
    period: "month",
    description: "Higher limits for teams shipping daily on GitHub.",
    features: [
      `Up to ${PRO.prs} PR reviews / month`,
      `Up to ${PRO.prsCreated} PRs created with automation`,
      `Up to ${PRO.issues} issue threads`,
      `Up to ${PRO.chat} chat messages`,
      "Priority support",
    ],
    highlighted: true,
  },
];
