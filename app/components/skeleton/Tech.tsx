import { Skeleton } from "@/components/ui/skeleton";

export function Tech() {
  return (
    <div className="flex flex-row gap-15">
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} className="w-20 h-20" />
      ))}
    </div>
  );
}
