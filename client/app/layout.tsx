import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { GeistPixelLine, GeistPixelSquare } from "geist/font/pixel";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { LiveblocksWrapper } from "@/components/providers/liveblocks-provider";
import { UsageProvider } from "@/components/providers/usage-provider";
import "./globals.css";
import "@liveblocks/react-ui/styles.css";
import "@liveblocks/react-ui/styles/dark/attributes.css";

export const metadata: Metadata = {
  title: {
    default: "Opal — AI code reviews for GitHub",
    template: "%s · Opal",
  },
  description:
    "AI-powered pull request and issue reviews for GitHub teams. Custom rules, activity logs, dashboard, and collaboration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        suppressHydrationWarning
        className={`${GeistPixelSquare.variable} ${GeistPixelLine.variable}`}
      >
        <body className="font-sans antialiased">
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            forcedTheme="dark"
            disableTransitionOnChange
          >
            <UsageProvider>
              <LiveblocksWrapper>
                {children}
              </LiveblocksWrapper>
            </UsageProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
