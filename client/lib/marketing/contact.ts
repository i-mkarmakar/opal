import { MailIcon, MapPinIcon, PhoneIcon } from "@/components/global/inline-icons";

export const CONTACT_CARDS = [
  {
    title: "Sales & support",
    value: "+1 (555) 010-4200",
    icon: PhoneIcon,
  },
  {
    title: "HQ",
    value: "Remote-first · Global",
    icon: MapPinIcon,
  },
  {
    title: "Email",
    value: "hello@opal.app",
    icon: MailIcon,
  },
] as const;
