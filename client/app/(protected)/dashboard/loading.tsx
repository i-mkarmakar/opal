import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";

export default function DashboardLoading() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6">
            <Skeleton className="h-8 w-32 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-8 w-20" />
                </CardHeader>
                <CardFooter>
                  <div className="w-full space-y-2">
                    <Skeleton className="h-2 w-full rounded-full" />
                    <Skeleton className="h-3 w-40" />
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="px-4 lg:px-6">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <Skeleton className="h-5 w-36 mb-2" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                  <Skeleton className="h-10 w-40" />
                </div>
              </CardHeader>
              <div className="px-6 pb-6">
                <Skeleton className="h-[250px] w-full" />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
