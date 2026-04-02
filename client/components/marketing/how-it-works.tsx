import Image from "next/image";
import Container from "../global/container";
import Wrapper from "../global/wrapper";

const HowItWorks = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center py-16 lg:py-24">
      <Wrapper>
        <Container>
          <div className="flex flex-col items-start justify-start px-2 md:px-0 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="text-left text-3xl font-semibold tracking-tight lg:text-start lg:text-4xl">
              From install to review
              <br /> in three steps
            </h2>
            <p className="mt-4 max-w-md text-left text-base font-normal text-muted-foreground lg:mt-0 lg:text-start lg:text-lg">
              Connect GitHub, define how you want feedback to sound, and let Opal handle the
              repetitive pass on every PR and issue.
            </p>
          </div>
        </Container>

        <Container delay={0.1}>
          <div className="mt-10 flex w-full flex-col gap-y-8">
            <div className="grid grid-cols-1 gap-8 rounded-xl border border-border p-2 transition-all duration-300 ease-out hover:border-primary/40 lg:grid-cols-2">
              <div className="flex h-full flex-col p-6 lg:p-8">
                <div className="flex w-full items-center justify-between">
                  <Image
                    src="/images/hiw01.svg"
                    alt=""
                    width={1024}
                    height={1024}
                    className="h-auto w-10 lg:w-14"
                  />
                  <span className="text-xl font-semibold text-neutral-700 lg:text-2xl dark:text-neutral-300">
                    01
                  </span>
                </div>
                <div className="mt-6 flex grow flex-col justify-end gap-1.5 lg:mt-auto">
                  <h4 className="text-xl font-medium lg:text-2xl">
                    Install the GitHub App
                  </h4>
                  <p className="text-balance text-sm text-muted-foreground lg:text-base">
                    Grant repo access at the org or repo level. We subscribe to PR and issue events
                    you already use—no extra CI wiring required.
                  </p>
                </div>
              </div>
              <div className="flex w-full">
                <div className="w-full rounded-lg border border-border/50">
                  <Image
                    src="/images/hiw1.svg"
                    alt=""
                    width={1024}
                    height={1024}
                    className="size-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 rounded-xl border border-border p-2 transition-all duration-300 ease-out hover:border-primary/40 lg:grid-cols-2">
              <div className="flex w-full lg:order-1">
                <div className="w-full rounded-lg border border-border/50">
                  <Image
                    src="/images/hiw2.svg"
                    alt=""
                    width={1024}
                    height={1024}
                    className="size-full object-cover"
                  />
                </div>
              </div>
              <div className="flex h-full flex-col p-6 lg:order-2 lg:p-8">
                <div className="flex w-full items-center justify-between">
                  <Image
                    src="/images/hiw02.svg"
                    alt=""
                    width={1024}
                    height={1024}
                    className="h-auto w-10 lg:w-14"
                  />
                  <span className="text-xl font-semibold text-neutral-700 lg:text-2xl dark:text-neutral-300">
                    02
                  </span>
                </div>
                <div className="mt-6 flex grow flex-col justify-end gap-1.5 lg:mt-auto">
                  <h4 className="text-xl font-medium lg:text-2xl">Configure your rules</h4>
                  <p className="text-balance text-sm text-muted-foreground lg:text-base">
                    Encode style, security, and product expectations. Rules apply before AI
                    summarization so feedback stays on-brand.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 rounded-xl border border-border p-2 transition-all duration-300 ease-out hover:border-primary/40 lg:grid-cols-2">
              <div className="flex h-full flex-col p-6 lg:p-8">
                <div className="flex w-full items-center justify-between">
                  <Image
                    src="/images/hiw03.svg"
                    alt=""
                    width={1024}
                    height={1024}
                    className="h-auto w-10 lg:w-14"
                  />
                  <span className="text-xl font-semibold text-neutral-700 lg:text-2xl dark:text-neutral-300">
                    03
                  </span>
                </div>
                <div className="mt-6 flex grow flex-col justify-end gap-1.5 lg:mt-auto">
                  <h4 className="text-xl font-medium lg:text-2xl">Review on every change</h4>
                  <p className="text-balance text-sm text-muted-foreground lg:text-base">
                    Opal comments on PRs and triages issues with traceable logs. Tune rules and
                    watch the next change reflect your updates.
                  </p>
                </div>
              </div>
              <div className="flex w-full">
                <div className="w-full rounded-lg border border-border/50">
                  <Image
                    src="/images/hiw3.svg"
                    alt=""
                    width={1024}
                    height={1024}
                    className="size-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Wrapper>
    </div>
  );
};

export default HowItWorks;
