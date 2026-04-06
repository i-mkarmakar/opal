"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSignIn } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { GithubBrandIcon, GoogleBrandIcon } from "@/components/oauth-brand-icons";
import { ROUTES, SITE_NAME } from "@/lib/constants";

const primaryCtaStyles =
  "bg-gradient-to-b from-primary to-[color-mix(in_srgb,var(--primary)_55%,black)] text-white hover:text-white active:text-white hover:opacity-95 active:opacity-90 shadow-[0_8px_20px_-10px_hsl(var(--primary)/0.9)] border-transparent";

export function SignInForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded || !signIn) return;

    setError(null);
    setLoading(true);

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push(ROUTES.DASHBOARD);
      } else if (result.status === "needs_second_factor") {
        setError("Please check your email for a verification code.");
      } else {
        setError("Sign in could not be completed. Please try again.");
      }
    } catch (err: unknown) {
      const errObj = err as { errors?: Array<{ code?: string; message?: string }> };
      const message = errObj?.errors?.[0]?.message || "Invalid email or password.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (strategy: "oauth_google" | "oauth_github") => {
    if (!signIn) return;
    try {
      await signIn.authenticateWithRedirect({
        strategy,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: ROUTES.DASHBOARD,
      });
    } catch {
      setError("OAuth sign in failed. Please try again.");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <Link
              href={ROUTES.HOME}
              className="flex flex-col items-center gap-2 font-medium"
            >
              <Image
                src="/logo.png"
                alt={SITE_NAME}
                width={160}
                height={40}
                className="h-12 w-auto object-contain"
                priority
              />
            </Link>
            <h1 className="text-xl font-bold">Welcome to {SITE_NAME}</h1>
            <FieldDescription>
              Don&apos;t have an account?{" "}
              <Link href={ROUTES.SIGN_UP} className="underline underline-offset-4">
                Sign up
              </Link>
            </FieldDescription>
          </div>
          {error ? (
            <p className="text-center text-sm text-destructive">{error}</p>
          ) : null}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Field>
          <Field>
            <div className="flex items-center gap-2">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Link
                href={ROUTES.FORGOT_PASSWORD}
                className="ml-auto text-sm underline-offset-4 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Field>
          <Field>
            <Button
              type="submit"
              disabled={loading}
              className={`w-full ${primaryCtaStyles}`}
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </Field>
          <FieldSeparator>Or</FieldSeparator>
          <Field className="grid gap-4 sm:grid-cols-2">
            <Button
              variant="outline"
              type="button"
              onClick={() => handleOAuth("oauth_google")}
            >
              <GoogleBrandIcon />
              Continue with Google
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={() => handleOAuth("oauth_github")}
            >
              <GithubBrandIcon />
              Continue with GitHub
            </Button>
          </Field>
        </FieldGroup>
      </form>
      <FieldDescription className="px-6 text-center">
        <span className="block">By clicking continue, you agree to our</span>
        <span className="mt-1 block">
          <Link href={ROUTES.TERMS_OF_SERVICE} className="underline underline-offset-4">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href={ROUTES.PRIVACY_POLICY} className="underline underline-offset-4">
            Privacy Policy
          </Link>
          .
        </span>
      </FieldDescription>
    </div>
  );
}
