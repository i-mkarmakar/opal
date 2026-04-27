import { SignInForm } from "@/components/sign-in-form";

export const metadata = {
  title: "Sign In",
  description: "Sign in to access your dashboard, logs, rules, and settings.",
};

export default function SignInPage() {
  return (
    <div className="flex min-h-svh w-full flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignInForm />
      </div>
    </div>
  );
}
