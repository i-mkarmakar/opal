import Wrapper from "@/components/global/wrapper";

export default function PrivacyPolicyPage() {
  return (
    <Wrapper className="px-6 py-24">
      <div className="mx-auto w-full max-w-3xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Privacy Policy
          </h1>
          <p className="text-sm text-muted-foreground">
            Last updated: April 14, 2026
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">1. Information we collect</h2>
          <p className="text-muted-foreground">
            We collect account details, usage events, and integration metadata
            needed to provide product functionality.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">2. How we use data</h2>
          <p className="text-muted-foreground">
            Data is used to authenticate users, deliver features, improve
            reliability, and enforce usage limits and security.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">3. Data sharing</h2>
          <p className="text-muted-foreground">
            We do not sell personal data. We may share data with trusted
            processors required to run the service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">4. Data retention</h2>
          <p className="text-muted-foreground">
            We retain data only as long as needed for service delivery, legal
            compliance, and legitimate business purposes.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">5. Your rights</h2>
          <p className="text-muted-foreground">
            Depending on your location, you may have rights to access, correct,
            or delete your personal data.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">6. Contact</h2>
          <p className="text-muted-foreground">
            For privacy requests, contact your support channel or account
            representative.
          </p>
        </section>
      </div>
    </Wrapper>
  );
}
