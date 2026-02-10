import { Skeleton } from "@/src/components/atoms/Skeleton";

export function PostCardSkeleton() {
  return (
    <div className="p-4 border border-gray-400 rounded space-y-6 bg-white">
      <Skeleton className="mx-auto h-10 w-3/4" />
      <Skeleton className="h-20 w-full" />
    </div>
  );
}
