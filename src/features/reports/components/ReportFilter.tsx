import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import type { ReportQueryParams } from '../types/report.types';

export default function ReportFilter({
  onFilter,
}: {
  onFilter: (f: ReportQueryParams) => void;
}) {
  const [open, setOpen] = useState(true);

  const [filters, setFilters] = useState<ReportQueryParams>({
    reporterId: null,
    type: null,
    reason: null,
    status: null,
    targetId: null,
    page: 1,
    limit: 10,
  });

  const update = (key: keyof ReportQueryParams, value: any) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  const resetFilters = () => {
    const base = {
      reporterId: null,
      type: null,
      reason: null,
      status: null,
      targetId: null,
      page: 1,
      limit: 10,
    };
    setFilters(base);
    onFilter(base);
  };

  return (
    <Card className="mb-4">
      <div
        className="flex justify-between items-center p-4 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <h2 className="font-bold text-lg">Filters</h2>
        {open ? <ChevronUp /> : <ChevronDown />}
      </div>

      {open && (
        <CardContent className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {/* Reporter ID */}
          <Input
            type="number"
            placeholder="Reporter ID"
            value={filters.reporterId ?? ''}
            onChange={(e) =>
              update(
                'reporterId',
                e.target.value.trim() === '' ? null : Number(e.target.value)
              )
            }
          />

          {/* Target Type */}
          <Select
            value={filters.type ?? ''}
            onValueChange={(v) => update('type', v || null)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Target Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="POST">POST</SelectItem>
              <SelectItem value="COMMENT">COMMENT</SelectItem>
              <SelectItem value="STORY">STORY</SelectItem>
            </SelectContent>
          </Select>

          {/* Reason */}
          <Input
            placeholder="Reason"
            value={filters.reason ?? ''}
            onChange={(e) =>
              update(
                'reason',
                e.target.value.trim() === '' ? null : e.target.value
              )
            }
          />

          {/* Status */}
          <Select
            value={filters.status ?? ''}
            onValueChange={(v) => update('status', v || null)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PENDING">Chờ duyệt</SelectItem>
              <SelectItem value="RESOLVED">Đã duyệt</SelectItem>
              <SelectItem value="REJECTED">Từ chối</SelectItem>
            </SelectContent>
          </Select>

          <div className="col-span-full flex gap-3">
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
