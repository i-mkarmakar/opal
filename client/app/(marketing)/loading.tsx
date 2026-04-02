import { Skeleton } from "@/components/ui/skeleton";

export default function MarketingLoading() {
  return (
    <div className="relative flex w-full flex-col pt-16">
      <section className="px-6 py-16 md:px-12">
        <div className="mx-auto max-w-5xl space-y-4">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-11 w-40" />
        </div>
      </section>
      <section className="px-6 py-10 md:px-12">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-3">
          <Skeleton className="h-36 w-full rounded-xl" />
          <Skeleton className="h-36 w-full rounded-xl" />
          <Skeleton className="h-36 w-full rounded-xl" />
        </div>
      </section>
      <section className="px-6 py-10 md:px-12">
        <div className="mx-auto max-w-5xl space-y-3">
          <Skeleton className="h-8 w-56" />
          <Skeleton className="h-20 w-full rounded-xl" />
          <Skeleton className="h-20 w-full rounded-xl" />
        </div>
      </section>
    </div>
  );
}
