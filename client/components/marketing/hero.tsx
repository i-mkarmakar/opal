import Image from "next/image";
import Link from "next/link";
import Container from "../global/container";
import Icons from "../global/icons";
import Wrapper from "../global/wrapper";
import { Button } from "../ui/button";
import { ROUTES } from "@/lib/constants";

const primaryCtaStyles =
  "bg-gradient-to-b from-primary to-[color-mix(in_srgb,var(--primary)_55%,black)] text-white hover:text-white active:text-white hover:opacity-95 active:opacity-90 shadow-[0_8px_20px_-10px_hsl(var(--primary)/0.9)] border-transparent";

const Hero = () => {
  return (
    <div className="relative z-0 h-full w-full">
      <div className="bg-brand-radial absolute -top-16 inset-x-0 -z-10 mx-auto h-32 w-3/4 rounded-full blur-[5rem] lg:h-40"></div>

      <Image
        src="/images/hero.svg"
        alt=""
        width={1024}
        height={1024}
        className="pointer-events-none absolute inset-x-0 -top-16 z-0 min-w-full w-full select-none"
        aria-hidden
      />

      <Wrapper className="relative z-10 py-20">
        <div className="flex w-full flex-col items-center justify-center">
          <Container>
            <div className="relative mx-auto flex w-max items-center justify-center gap-x-1 rounded-full px-2 py-1.5 before:absolute before:inset-0 before:-z-10 before:rounded-3xl before:bg-gradient-to-b before:from-neutral-700 before:to-neutral-900 before:p-[1px] before:content-[''] after:absolute after:inset-[1px] after:-z-10 after:rounded-[22px] after:bg-[#181818]/60">
              <Icons.stars className="size-5" />
              <span className="text-sm text-white">AI reviews for GitHub teams</span>
            </div>
          </Container>

          <Container delay={0.1}>
            <h2 className="mt-6 w-full text-center text-5xl font-semibold tracking-tight text-balance !leading-[1.25] md:text-6xl">
              <span className="text-foreground">Ship faster</span>
              <span className="text-foreground"> with </span>
              <br className="hidden lg:inline-block" />
              <span className="text-foreground">confident code reviews</span>
            </h2>
          </Container>

          <Container delay={0.2}>
            <p className="mx-auto mt-4 max-w-3xl text-center text-base font-normal text-balance text-muted-foreground md:text-lg">
              Opal combines AI with your custom rules to review pull requests and issues
              directly in GitHub—so your team spends time on architecture, not nits.
            </p>
          </Container>

          <Container delay={0.3}>
            <div className="mt-6">
              <Button size="lg" className={primaryCtaStyles} asChild>
                <Link href={ROUTES.SIGN_UP}>Get started free</Link>
              </Button>
            </div>
          </Container>

          <Container className="w-full z-30">
            <div className="relative mx-auto mt-10 max-w-7xl rounded-2xl border border-neutral-200/50 bg-neutral-100 p-2 backdrop-blur-lg md:mt-14 md:rounded-[32px] dark:border-neutral-700 dark:bg-neutral-800/50">
              <div className="rounded-lg border border-neutral-200 bg-white md:rounded-[24px] dark:border-neutral-700 dark:bg-black">
                <Image
                  src="/images/dashboard.png"
                  alt="Opal dashboard preview"
                  priority
                  width={2932}
                  height={1664}
                  loading="eager"
                  className="rounded-[16px] md:rounded-[26px]"
                />
              </div>
            </div>
          </Container>
        </div>
      </Wrapper>
    </div>
  );
};

export default Hero;
