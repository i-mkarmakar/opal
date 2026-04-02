import Image from "next/image";
import Container from "../global/container";
import Wrapper from "../global/wrapper";
import { FEATURES } from "@/constants";

const Features = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center py-16 lg:py-24">
      <Wrapper>
        <Container>
          <div className="flex flex-col items-start justify-start lg:items-center lg:justify-center">
            <h2 className="text-left text-3xl font-semibold tracking-tight lg:text-center lg:text-4xl">
              Everything you need to <br /> review like a senior team
            </h2>
            <p className="mt-2 max-w-md text-left text-base font-normal text-muted-foreground lg:text-center lg:text-lg">
              Purpose-built for GitHub: rules, review automation, and visibility into what the bot
              did—without slowing your merge train.
            </p>
          </div>
        </Container>

        <Container>
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {FEATURES.map((feature, index) => (
              <Feature key={index} title={feature.title} desc={feature.desc} icon={feature.icon} />
            ))}
          </div>
        </Container>
      </Wrapper>
    </div>
  );
};

const Feature = ({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon: string;
}) => {
  return (
    <div className="flex flex-col rounded-lg border border-border/60 p-4 transition-all duration-300 ease-out hover:border-primary lg:rounded-xl lg:p-6">
      <Image src={icon} alt={title} width={1024} height={1024} className="size-8 lg:size-10" />
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
};

export default Features;
