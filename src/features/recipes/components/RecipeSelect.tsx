import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetRecipesQuery } from '@/features/recipes/services/recipeApi';
import { useEffect, useRef, useState } from 'react';

interface RecipeSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RecipeSelect({ value, onChange }: RecipeSelectProps) {
  const [page, setPage] = useState(1);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const { data, isFetching } = useGetRecipesQuery({ page, size: 10 });

  const lastItemRef = useRef<HTMLDivElement>(null);

  // Cập nhật recipes
  useEffect(() => {
    if (data?.data.content) {
      setRecipes((prev) => {
        const existingIds = new Set(prev.map((r) => r.id));
        const newRecipes = data.data.content.filter(
          (r: any) => !existingIds.has(r.id)
        );
        return [...prev, ...newRecipes];
      });
      setHasMore(page < data.data.totalPages);
    }
  }, [data, page]);

  // Setup IntersectionObserver khi Select mở
  useEffect(() => {
    if (!isOpen || !lastItemRef.current) return;

    // Tìm scroll container thực tế trong DOM (SelectContent portal)
    const findScrollParent = (
      element: HTMLElement | null
    ): HTMLElement | null => {
      if (!element) return null;

      const { overflow, overflowY } = window.getComputedStyle(element);
      if (
        overflow === 'auto' ||
        overflow === 'scroll' ||
        overflowY === 'auto' ||
        overflowY === 'scroll'
      ) {
        return element;
      }

      return findScrollParent(element.parentElement);
    };

    const scrollParent = findScrollParent(lastItemRef.current);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetching && hasMore) {
          console.log('Loading more... page:', page + 1);
          setPage((prev) => prev + 1);
        }
      },
      {
        root: scrollParent,
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    observer.observe(lastItemRef.current);

    return () => observer.disconnect();
  }, [isOpen, isFetching, hasMore, page, recipes.length]);

  return (
    <Select value={value} onValueChange={onChange} onOpenChange={setIsOpen}>
      <SelectTrigger>
        <SelectValue placeholder="Chọn món ăn" />
      </SelectTrigger>
      <SelectContent className="max-h-60">
        {recipes.map((r, index) => (
          <SelectItem key={r.id} value={r.id.toString()}>
            <div className="flex items-center space-x-2">
              <img
                src={r.imageUrl}
                alt={r.title}
                className="w-8 h-8 rounded object-cover"
                loading="lazy"
              />
              <span className="text-sm">{r.title}</span>
            </div>
          </SelectItem>
        ))}

        {/* Loading indicator */}
        {isFetching && (
          <div className="p-3 text-center text-sm text-gray-500">
            Đang tải...
          </div>
        )}

        {/* Trigger element - đặt ở cuối */}
        {hasMore && recipes.length > 0 && (
          <div ref={lastItemRef} className="h-10 w-full" />
        )}

        {/* End message */}
        {!hasMore && recipes.length > 0 && (
          <div className="p-2 text-center text-xs text-gray-400">
            Đã tải {recipes.length} món ăn
          </div>
        )}
      </SelectContent>
    </Select>
  );
}
