import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/constants";
import { ROUTES } from "@/lib/constants";
import { MenuIcon } from "@/components/global/inline-icons";
import Link from "next/link";

const primaryCtaStyles =
  "bg-gradient-to-b from-primary to-[color-mix(in_srgb,var(--primary)_55%,black)] text-white hover:text-white active:text-white hover:opacity-95 active:opacity-90 shadow-[0_8px_20px_-10px_hsl(var(--primary)/0.9)] border-transparent";

const MobileMenu = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost">
          <MenuIcon className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="p-4">
        <SheetHeader className="sr-only">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="mt-8 flex flex-col gap-6">
          {NAV_LINKS.map((link, index) => (
            <SheetClose asChild key={index}>
              <Link href={link.link} className="w-full text-lg font-medium">
                {link.name}
              </Link>
            </SheetClose>
          ))}
          <SheetClose asChild>
            <Link href={ROUTES.SIGN_IN} className="w-full text-lg font-medium">
              Sign in
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href={ROUTES.SIGN_UP} className="mt-4 w-full">
              <Button size="lg" className={`w-full ${primaryCtaStyles}`}>
                Get started
              </Button>
            </Link>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
