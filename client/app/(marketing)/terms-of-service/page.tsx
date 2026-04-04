import Wrapper from "@/components/global/wrapper";

export default function TermsOfServicePage() {
  return (
    <Wrapper className="px-6 py-24">
      <div className="mx-auto w-full max-w-3xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Terms of Service
          </h1>
          <p className="text-sm text-muted-foreground">
            Last updated: April 14, 2026
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">1. Acceptance of terms</h2>
          <p className="text-muted-foreground">
            By using this service, you agree to these Terms of Service. If you
            do not agree, do not use the platform.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">2. Account and access</h2>
          <p className="text-muted-foreground">
            You are responsible for account activity, credentials, and ensuring
            your use complies with applicable laws and your organization
            policies.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">3. Acceptable use</h2>
          <p className="text-muted-foreground">
            Do not misuse, reverse engineer, disrupt, or attempt unauthorized
            access to the service or connected integrations.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">4. Billing and plans</h2>
          <p className="text-muted-foreground">
            Paid features are billed per selected plan terms. Fees are
            non-refundable except where required by law or explicitly stated.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">5. Service availability</h2>
          <p className="text-muted-foreground">
            We may update, suspend, or discontinue features from time to time.
            We do not guarantee uninterrupted service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">6. Contact</h2>
          <p className="text-muted-foreground">
            For legal requests or questions, contact your support channel or
            account representative.
          </p>
        </section>
      </div>
    </Wrapper>
  );
}
