import { Skeleton } from '@/components/ui/skeleton';

export function PostTableSkeleton({ rowCount }: { rowCount: number | undefined }) {
  console.log(rowCount);
  return (
    <div className="space-y-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex gap-4 items-center">
          <Skeleton className="w-16 h-16 rounded-md" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
      ))}
    </div>
  );
}
