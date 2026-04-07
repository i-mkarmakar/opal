import { Skeleton } from "@/components/ui/skeleton";

export default function SSOCallbackLoading() {
  return (
    <div className="flex min-h-svh items-center justify-center px-6">
      <div className="w-full max-w-sm space-y-3">
        <Skeleton className="h-7 w-44 mx-auto" />
        <Skeleton className="h-4 w-64 mx-auto" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}
