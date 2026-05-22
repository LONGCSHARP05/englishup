import { Skeleton } from "@/components/ui/skeleton";

export function LessonSkeleton() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-4 sm:p-6">
      <Skeleton className="h-44 w-full rounded-3xl" />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-5 w-full" />
          ))}
        </div>
        <div className="space-y-3">
          <Skeleton className="h-32 w-full rounded-2xl" />
          <Skeleton className="h-40 w-full rounded-2xl" />
        </div>
      </div>
    </div>
  );
}