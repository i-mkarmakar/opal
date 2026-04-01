"use client";

import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/constants";
import { cn } from "@/lib";
import { ROUTES } from "@/lib/constants";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Container from "../global/container";
import Wrapper from "../global/wrapper";
import MobileMenu from "./mobile-menu";

const primaryCtaStyles =
  "bg-gradient-to-b from-primary to-[color-mix(in_srgb,var(--primary)_55%,black)] text-white hover:text-white active:text-white hover:opacity-95 active:opacity-90 shadow-[0_8px_20px_-10px_hsl(var(--primary)/0.9)] border-transparent";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-16 w-full transition-all duration-300",
        isScrolled ? "bg-[#050505]/50 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <Wrapper className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Link href={ROUTES.HOME} className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Opal"
              width={160}
              height={40}
              className="h-12 w-auto"
              priority
            />
          </Link>
        </motion.div>

        <div className="absolute inset-0 mx-auto hidden w-max flex-1 flex-row items-center justify-center gap-x-3 text-sm font-medium text-muted-foreground lg:flex">
          <AnimatePresence>
            {NAV_LINKS.map((link, index) => (
              <Container key={index} animation="fadeDown" delay={0.1 * index}>
                <div className="relative">
                  <Link
                    href={link.link}
                    className="px-1.5 transition-all duration-500 hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </div>
              </Container>
            ))}
          </AnimatePresence>
        </div>

        <Container animation="fadeLeft" delay={0.1}>
          <div className="flex items-center gap-x-4">
            <Link href={ROUTES.SIGN_IN} className="hidden text-sm text-muted-foreground hover:text-foreground lg:block">
              Sign in
            </Link>
            <Link href={ROUTES.SIGN_UP} className="hidden lg:block">
              <Button size="sm" className={primaryCtaStyles}>
                Get started
              </Button>
            </Link>
            <div className="lg:hidden">
              <MobileMenu />
            </div>
          </div>
        </Container>
      </Wrapper>
    </header>
  );
};

export default Navbar;
