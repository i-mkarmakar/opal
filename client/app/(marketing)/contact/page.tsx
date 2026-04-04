import ContactForm from "@/components/contact/contact-form";
import ContactHero from "@/components/contact/contact-hero";
import CTA from "@/components/marketing/cta";

export default function ContactPage() {
  return (
    <div className="relative flex w-full flex-col pt-16">
      <ContactHero />
      <ContactForm />
      <CTA />
    </div>
  );
}
