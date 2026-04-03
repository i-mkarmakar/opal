import Image from "next/image";
import Link from "next/link";
import { CheckCircleIcon } from "@/components/global/inline-icons";
import Container from "../global/container";
import Wrapper from "../global/wrapper";
import { Button } from "../ui/button";
import { ROUTES } from "@/lib/constants";

const primaryCtaStyles =
  "bg-gradient-to-b from-primary to-[color-mix(in_srgb,var(--primary)_55%,black)] text-white hover:text-white active:text-white hover:opacity-95 active:opacity-90 shadow-[0_8px_20px_-10px_hsl(var(--primary)/0.9)] border-transparent";

const CTA = () => {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-16 lg:py-24">
      <div className="absolute inset-x-0 bottom-0 mx-auto h-1/16 w-1/3 rounded-full bg-primary/50 blur-[4rem] lg:bottom-0 lg:bg-primary/70"></div>

      <Wrapper>
        <div className="grid w-full grid-cols-1 gap-8 py-8 lg:grid-cols-2">
          <div className="flex w-full flex-col items-start justify-center">
            <Container className="mx-auto w-max">
              <h2 className="bg-gradient-to-b from-neutral-100 to-neutral-400 bg-clip-text text-3xl leading-tight font-semibold text-transparent lg:text-5xl">
                Start your
                <br /> free workspace
              </h2>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="size-4 text-primary" />
                  <span className="text-sm font-medium">No credit card to explore</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="size-4 text-primary" />
                  <span className="text-sm font-medium">GitHub App install in minutes</span>
                </div>
              </div>
            </Container>
          </div>
          <div className="mt-8 flex w-full flex-col justify-center lg:mt-0">
            <Container className="mx-auto w-max">
              <div className="flex size-24 items-center justify-center perspective-[360px] lg:size-32">
                <div className="size-full transform-3d transform-[rotateX(2deg)_rotateY(-4deg)_rotateZ(32deg)]">
                  <Image
                    src="/icons/heart.png"
                    alt=""
                    width={1024}
                    height={1024}
                    className="size-full object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.18)]"
                  />
                </div>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Button size="lg" className={primaryCtaStyles} asChild>
                  <Link href={ROUTES.SIGN_UP}>Create account</Link>
                </Button>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">
                    4.8/5 average
                    <br />
                    from teams automating reviews
                  </span>
                </div>
              </div>
            </Container>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default CTA;
