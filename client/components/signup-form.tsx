"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSignUp } from "@clerk/nextjs";
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

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { signUp, setActive, isLoaded } = useSignUp();
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded || !signUp) return;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      await signUp.create({
        firstName: firstName.trim() || undefined,
        lastName: lastName.trim() || undefined,
        emailAddress: email,
        password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setShowCode(true);
    } catch (err: unknown) {
      const errObj = err as { errors?: Array<{ code?: string; message?: string }> };
      const message = errObj?.errors?.[0]?.message || "Sign up failed. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded || !signUp) return;

    setError(null);
    setLoading(true);

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push(ROUTES.DASHBOARD);
      } else {
        setError("Verification could not be completed. Please try again.");
      }
    } catch (err: unknown) {
      const errObj = err as { errors?: Array<{ message?: string }> };
      const message = errObj?.errors?.[0]?.message || "Invalid verification code.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (strategy: "oauth_google" | "oauth_github") => {
    if (!signUp) return;
    try {
      await signUp.authenticateWithRedirect({
        strategy,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: ROUTES.DASHBOARD,
      });
    } catch {
      setError("OAuth sign up failed. Please try again.");
    }
  };

  if (showCode) {
    return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <form onSubmit={handleVerify}>
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
              <h1 className="text-xl font-bold">Verify your email</h1>
              <FieldDescription>
                We sent a code to <span className="font-medium text-foreground">{email}</span>
              </FieldDescription>
            </div>
            {error ? (
              <p className="text-center text-sm text-destructive">{error}</p>
            ) : null}
            <Field>
              <FieldLabel htmlFor="code">Verification code</FieldLabel>
              <Input
                id="code"
                type="text"
                inputMode="numeric"
                placeholder="Enter code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </Field>
            <Field>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Verifying..." : "Verify"}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </div>
    );
  }

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
              Already have an account?{" "}
              <Link href={ROUTES.SIGN_IN} className="underline underline-offset-4">
                Sign in
              </Link>
            </FieldDescription>
          </div>
          {error ? (
            <p className="text-center text-sm text-destructive">{error}</p>
          ) : null}
          <Field className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="firstName">First name</FieldLabel>
              <Input
                id="firstName"
                type="text"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoComplete="given-name"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="lastName">Last name</FieldLabel>
              <Input
                id="lastName"
                type="text"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                autoComplete="family-name"
              />
            </Field>
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </Field>
          <Field className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">Confirm password</FieldLabel>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
            </Field>
          </Field>
          <FieldDescription>Password must be at least 8 characters.</FieldDescription>
          <Field>
            <Button
              type="submit"
              disabled={loading}
              className={`w-full ${primaryCtaStyles}`}
            >
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </Field>
          <div id="clerk-captcha" />
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
          <Link
            href={ROUTES.TERMS_OF_SERVICE}
            className="underline underline-offset-4"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href={ROUTES.PRIVACY_POLICY}
            className="underline underline-offset-4"
          >
            Privacy Policy
          </Link>
          .
        </span>
      </FieldDescription>
    </div>
  );
}
