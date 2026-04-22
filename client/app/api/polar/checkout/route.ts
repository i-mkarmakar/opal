import { Checkout } from "@polar-sh/nextjs";

const getPolarServer = () => {
  const value = process.env.POLAR_SERVER;
  return value === "production" ? "production" : "sandbox";
};

export const GET = Checkout({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  successUrl: process.env.NEXT_PUBLIC_APP_URL + "/dashboard?upgraded=true",
  server: getPolarServer(),
  theme: "dark", // Enforces the theme - System-preferred theme will be set if left omitted
});