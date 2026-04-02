import Navbar from "@/components/marketing/navbar";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-[#050505] text-foreground">
      <main className="relative w-full grow">
        <Navbar />
        {children}
      </main>
    </div>
  );
}
