import { MarketingGate } from "@/components/marketing/marketing-gate";
import CTA from "@/components/marketing/cta";
import Faq from "@/components/marketing/faq";
import Features from "@/components/marketing/features";
import Hero from "@/components/marketing/hero";
import HowItWorks from "@/components/marketing/how-it-works";
import Pricing from "@/components/marketing/pricing";

export const metadata = {
  title: "Home",
  description:
    "Pull request and issue reviews for GitHub teams. Custom rules, activity logs, and a dashboard for visibility.",
};

export default function MarketingHomePage() {
  return (
    <MarketingGate>
      <div className="relative flex w-full flex-col pt-16">
        <Hero />
        <HowItWorks />
        <Features />
        <Faq />
        <Pricing />
        <CTA />
      </div>
    </MarketingGate>
  );
}
