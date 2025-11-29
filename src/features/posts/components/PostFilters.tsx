import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { PostQueryParams } from '../types/post.types';
import CategorySelect from '@/features/recipes/components/CategorySelect.tsx';

export default function PostFilters({
  onFilter,
}: {
  onFilter: (f: PostQueryParams) => void;
}) {
  const [open, setOpen] = useState(true);
  const [filters, setFilters] = useState<PostQueryParams>({});

  const update = (key: keyof PostQueryParams, value: any) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  const resetFilters = () => {
    const defaultParams = { page: 1, size: 5 };
    setFilters({});
    onFilter(defaultParams);
  };

  return (
    <Card className="mb-4">
      <div
        className="flex justify-between items-center p-4 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <h2 className="text-lg font-bold">Filters</h2>
        {open ? <ChevronUp /> : <ChevronDown />}
      </div>

      {open && (
        <CardContent className="p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Input
            placeholder="Keyword"
            value={filters.keyword ?? ''}
            onChange={(e) => update('keyword', e.target.value)}
          />

          <Input
            placeholder="User ID"
            type="number"
            value={filters.userId ?? ''}
            onChange={(e) =>
              update(
                'userId',
                e.target.value ? Number(e.target.value) : undefined
              )
            }
          />

          <Input
            placeholder="Region"
            value={filters.region ?? ''}
            onChange={(e) => update('region', e.target.value)}
          />

          <Select
            value={filters.difficulty ?? ''}
            onValueChange={(v) => update('difficulty', v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="EASY">EASY</SelectItem>
              <SelectItem value="MEDIUM">MEDIUM</SelectItem>
              <SelectItem value="HARD">HARD</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="Min Prep Time"
            type="number"
            value={filters.minPrepTime ?? ''}
            onChange={(e) =>
              update(
                'minPrepTime',
                e.target.value ? Number(e.target.value) : undefined
              )
            }
          />

          <Input
            placeholder="Max Prep Time"
            type="number"
            value={filters.maxPrepTime ?? ''}
            onChange={(e) =>
              update(
                'maxPrepTime',
                e.target.value ? Number(e.target.value) : undefined
              )
            }
          />

          <Input
            placeholder="Min Cook Time"
            type="number"
            value={filters.minCookTime ?? ''}
            onChange={(e) =>
              update(
                'minCookTime',
                e.target.value ? Number(e.target.value) : undefined
              )
            }
          />

          <Input
            placeholder="Max Cook Time"
            type="number"
            value={filters.maxCookTime ?? ''}
            onChange={(e) =>
              update(
                'maxCookTime',
                e.target.value ? Number(e.target.value) : undefined
              )
            }
          />

          <Input
            placeholder="Min Reaction Count"
            type="number"
            value={filters.minReactionCount ?? ''}
            onChange={(e) =>
              update(
                'minReactionCount',
                e.target.value ? Number(e.target.value) : undefined
              )
            }
          />

          <Input
            placeholder="Min Shares"
            type="number"
            value={filters.minTotalShares ?? ''}
            onChange={(e) =>
              update(
                'minTotalShares',
                e.target.value ? Number(e.target.value) : undefined
              )
            }
          />

          <CategorySelect
            value={filters.category?.toString()}
            onChange={(v) => update('category', v)}
          />

          <Select
            value={filters.sortBy ?? ''}
            onValueChange={(v) => update('sortBy', v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="popular">Popular</SelectItem>
              <SelectItem value="toprated">Top Rated</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.status ?? ''}
            onValueChange={(v) => update('status', v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PENDING">Chưa duyệt</SelectItem>
              <SelectItem value="APPROVED">Đã duyệt</SelectItem>
              <SelectItem value="REJECT">Từ chối</SelectItem>
            </SelectContent>
          </Select>

          {/* Action Buttons */}
          <div className="col-span-full flex gap-4">
            <Button
              className="w-full md:w-auto"
              onClick={() => onFilter(filters)}
            >
              Apply Filters
            </Button>

            <Button
              variant="outline"
              className="w-full md:w-auto"
              onClick={resetFilters}
            >
              Reset
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
