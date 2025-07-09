import { Skeleton } from "@/components/ui/skeleton";

export function Project() {
  return (
    <div className="grid grid-cols-2 gap-8">
      <Skeleton className="w-136 h-90" />
      <Skeleton className="w-136 h-90" />
      <Skeleton className="w-136 h-90" />
      <Skeleton className="w-136 h-90" />
    </div>
  );
}
