import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetCategoriesQuery } from '@/features/recipes/services/recipeApi';
import type { CategoryResponse } from '@/features/recipes/types/recipe.types';
import { useRef, useState } from 'react';

export default function CategorySelect({
  value,
  onChange,
}: {
  value?: string;
  onChange: (v: string) => void;
}) {
  const [search, setSearch] = useState(''); 
  const [page, setPage] = useState(1); 
  const limit = 20;

  const { data, isLoading, isFetching } = useGetCategoriesQuery({
    name: search,
    page,
    limit,
  });

  const categories = data?.data?.content ?? [];
  const totalPages = data?.data?.totalPages ?? 1;

  const handleOpen = () => {
    setPage(1);
  };

  const listRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const el = listRef.current;
    if (!el || isFetching) return;

    const reachedBottom =
      el.scrollTop + el.clientHeight >= el.scrollHeight - 10;

    if (reachedBottom && page < totalPages) {
      setPage((p) => p + 1);
    }
  };

  return (
    <Select value={value} onValueChange={onChange} onOpenChange={handleOpen}>
      <SelectTrigger>
        <SelectValue placeholder="Category" />
      </SelectTrigger>

      <SelectContent
        ref={listRef}
        onScroll={handleScroll}
        className="max-h-64 overflow-y-auto"
      >
        <div className="p-2">
          <input
            className="w-full border px-2 py-1 rounded"
            placeholder="Search category..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        {categories.map((cat: CategoryResponse) => (
          <SelectItem key={cat.id} value={cat.id.toString()}>
            {cat.description}
          </SelectItem>
        ))}

        {isFetching && <div className="p-3 text-center">Loading...</div>}
      </SelectContent>
    </Select>
  );
}
