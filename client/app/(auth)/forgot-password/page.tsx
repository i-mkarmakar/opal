"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ROUTES } from "@/lib/constants";

/** Narrow Clerk sign-in for password reset flows (types vary by Clerk version). */
type SignInResetFlow = {
  create: (args: { identifier: string }) => Promise<{ error?: unknown }>;
  status?: string;
  resetPasswordEmailCode?: {
    sendCode: () => Promise<{ error?: unknown }>;
    verifyCode: (args: { code: string }) => Promise<{ error?: unknown }>;
    submitPassword: (args: { password: string }) => Promise<{ error?: unknown }>;
  };
  finalize?: (args: {
    navigate: (opts: {
      session: { currentTask?: unknown } | null;
      decorateUrl: (path: string) => string;
    }) => Promise<void>;
  }) => Promise<{ error?: unknown }>;
};

export default function ForgotPasswordPage() {
  const { signIn, isLoaded } = useSignIn();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded || !signIn) return;

    setError(null);
    setLoading(true);

    try {
      const si = signIn as unknown as SignInResetFlow;
      const { error: createError } = await si.create({ identifier: email });
      if (createError) throw createError;

      const sendRes = await si.resetPasswordEmailCode?.sendCode();
      if (sendRes?.error) throw sendRes.error;

      setCodeSent(true);
    } catch (err: unknown) {
      const errObj = err as { errors?: Array<{ message?: string }> };
      setError(errObj?.errors?.[0]?.message || "Failed to send reset code.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded || !signIn) return;

    setError(null);
    setLoading(true);

    try {
      const si = signIn as unknown as SignInResetFlow;
      const verifyRes = await si.resetPasswordEmailCode?.verifyCode({ code });
      if (verifyRes?.error) throw verifyRes.error;
    } catch (err: unknown) {
      const errObj = err as { errors?: Array<{ message?: string }> };
      setError(errObj?.errors?.[0]?.message || "Invalid code.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded || !signIn) return;

    setError(null);
    setLoading(true);

    try {
      const si = signIn as unknown as SignInResetFlow;
      const submitRes = await si.resetPasswordEmailCode?.submitPassword({ password });
      if (submitRes?.error) throw submitRes.error;

      if (signIn.status === "complete") {
        const finalizeRes = await si.finalize?.({
          navigate: async ({ session, decorateUrl }) => {
            if (session?.currentTask) return;
            const url = decorateUrl(ROUTES.DASHBOARD);
            if (url.startsWith("http")) {
              window.location.href = url;
            } else {
              router.push(url);
            }
          },
        });
        if (finalizeRes?.error) throw finalizeRes.error;
      }
    } catch (err: unknown) {
      const errObj = err as { errors?: Array<{ message?: string }> };
      setError(errObj?.errors?.[0]?.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  const needsNewPassword = signIn?.status === "needs_new_password";

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10 w-full">
      <div className="w-full max-w-sm">
        <Card>
          <CardContent className="p-6">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center mb-4">
                <h1 className="text-2xl font-bold">Reset password</h1>
                <p className="text-sm text-muted-foreground">
                  {!codeSent
                    ? "Enter your email to receive a reset code"
                    : needsNewPassword
                    ? "Enter your new password"
                    : "Enter the code sent to your email"}
                </p>
              </div>
              {error && (
                <p className="text-sm text-destructive text-center">{error}</p>
              )}

              {!codeSent && (
                <form onSubmit={handleSendCode}>
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
                  <Button type="submit" className="w-full mt-4" disabled={loading}>
                    {loading ? "Sending..." : "Send reset code"}
                  </Button>
                </form>
              )}

              {codeSent && !needsNewPassword && (
                <form onSubmit={handleVerifyCode}>
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
                  <Button type="submit" className="w-full mt-4" disabled={loading}>
                    {loading ? "Verifying..." : "Verify code"}
                  </Button>
                </form>
              )}

              {needsNewPassword && (
                <form onSubmit={handleSubmitPassword}>
                  <Field>
                    <FieldLabel htmlFor="password">New password</FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={8}
                    />
                  </Field>
                  <Button type="submit" className="w-full mt-4" disabled={loading}>
                    {loading ? "Resetting..." : "Set new password"}
                  </Button>
                </form>
              )}

              <p className="text-center text-sm text-muted-foreground mt-4">
                <Link href={ROUTES.SIGN_IN} className="underline hover:text-primary">
                  Back to sign in
                </Link>
              </p>
            </FieldGroup>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
