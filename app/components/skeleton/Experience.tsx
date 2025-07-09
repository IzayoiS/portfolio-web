import { Skeleton } from "@/components/ui/skeleton";

export function Experience() {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <Skeleton className="w-20 h-20 ml-4" />
        <div className="mr-auto gap-2 flex flex-col">
          <Skeleton className="w-50 h-5 ml-5" />
          <Skeleton className="w-30 h-5 ml-5" />
          <Skeleton className="w-150 h-5 ml-5 mt-3" />
          <Skeleton className="w-150 h-5 ml-5" />
          <Skeleton className="w-150 h-5 ml-5" />
          <div className="flex flex-row">
            <Skeleton className="w-20 h-5 ml-5" />
            <Skeleton className="w-20 h-5 ml-5" />
            <Skeleton className="w-20 h-5 ml-5" />
            <Skeleton className="w-20 h-5 ml-5" />
          </div>
        </div>
        <div>
          <Skeleton className="w-55 h-5" />
        </div>
      </div>
    </div>
  );
}
