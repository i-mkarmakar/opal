import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export const metadata = {
  title: "Signing in",
  description: "Completing sign-in. You will be redirected shortly.",
};

export default function SSOCallbackPage() {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <AuthenticateWithRedirectCallback
        signInFallbackRedirectUrl="/dashboard"
        signUpFallbackRedirectUrl="/dashboard"
      />
    </div>
  );
}
