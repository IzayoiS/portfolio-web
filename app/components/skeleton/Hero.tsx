import { Skeleton } from "@/components/ui/skeleton";

export function Hero() {
  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-start gap-10 pt-26 px-6">
      <div className="xl:m-auto xl:p-10">
        <Skeleton className="w-[260px] h-[250px] rounded-2xl" />
      </div>
      <div className="max-w-2xl w-full space-y-4">
        <Skeleton className="h-10 w-2/3 lg:mx-0 mx-auto" />
        <Skeleton className="h-6 w-1/2 lg:mx-0 mx-auto" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <div className="flex items-center gap-2">
          <Skeleton className="w-[18px] h-[18px] rounded lg:mx-0 mx-auto" />
          <Skeleton className="h-4 w-1/3 lg:mx-0 mx-auto" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="w-[10px] h-[10px] rounded-full lg:mx-0 mx-auto" />
          <Skeleton className="h-4 w-2/3 lg:mx-0 mx-auto" />
        </div>
        <div className="flex gap-4 mt-4">
          <Skeleton className="h-10 w-40 rounded lg:mx-0 mx-auto" />
          <Skeleton className="h-10 w-40 rounded lg:mx-0 mx-auto" />
        </div>
      </div>
    </div>
  );
}
