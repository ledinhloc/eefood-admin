import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { ArrowUpDown, Pencil } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ReportResponse } from '../types/report.types';

export default function ReportTable({
  reports,
  onEdit,
}: {
  reports: ReportResponse[];
  onEdit: (report: ReportResponse) => void;
}) {
  const navigate = useNavigate();
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handlePreview = (targetId: number, type: string) => {
    if (type == 'POST') {
      navigate(`/post/${targetId}`);
    }
  };

  const handleRowClick = (
    targetId: number,
    type: string,
    e: React.MouseEvent
  ) => {
    const target = e.target as HTMLElement;
    if (target.closest('button')) {
      return;
    }
    handlePreview(targetId, type);
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedData = [...reports].sort((a, b) => {
    if (!sortField) return 0;

    const valA: any = (a as any)[sortField];
    const valB: any = (b as any)[sortField];

    if (typeof valA === 'string') {
      return sortOrder === 'asc'
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    }

    if (typeof valA === 'number') {
      return sortOrder === 'asc' ? valA - valB : valB - valA;
    }

    return 0;
  });

  const statusColor: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-700 border border-yellow-300',
    RESOLVED: 'bg-blue-100 text-blue-700 border border-blue-300',
    REJECTED: 'bg-red-100 text-red-700 border border-red-300',
  };

  const statusText: Record<string, string> = {
    PENDING: 'Chờ duyệt',
    RESOLVED: 'Đã duyệt',
    REJECTED: 'Từ chối',
  };

  const renderHeader = (field: string, label: string) => (
    <TableHead
      className="cursor-pointer text-center select-none"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center justify-center gap-1 hover:text-blue-600 transition">
        {label}
        <ArrowUpDown
          className={cn(
            'w-4 h-4 transition-transform',
            sortField === field && (sortOrder === 'desc' ? 'rotate-180' : '')
          )}
        />
      </div>
    </TableHead>
  );

  return (
    <div className="border rounded-lg shadow bg-white overflow-x-auto">
      <Table className="min-w-[1100px] text-center">
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="font-bold text-center">#</TableHead>

            {renderHeader('reporterId', 'Reporter ID')}
            {renderHeader('targetType', 'Target Type')}

            <TableHead className="text-center">Reason</TableHead>

            {renderHeader('status', 'Status')}
            {renderHeader('targetId', 'Target ID')}
            {renderHeader('createdAt', 'Created At')}

            <TableHead className="font-bold text-center">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {sortedData.map((r, index) => (
            <TableRow
              key={r.id}
              className="hover:bg-gray-50 transition cursor-pointer"
              onClick={(e) => handleRowClick(r.targetId, r.targetType, e)}
            >
              <TableCell>{index + 1}</TableCell>

              <TableCell>{r.reporterId}</TableCell>
              <TableCell className="uppercase">{r.targetType}</TableCell>

              <TableCell className="max-w-[220px] truncate" title={r.reason}>
                {r.reason}
              </TableCell>

              <TableCell>
                <span
                  className={cn(
                    'px-2 py-1 rounded text-xs font-medium',
                    statusColor[r.status]
                  )}
                >
                  {statusText[r.status]}
                </span>
              </TableCell>

              <TableCell>{r.targetId}</TableCell>

              <TableCell>{new Date(r.createdAt).toLocaleString()}</TableCell>

              <TableCell>
                <div className="flex gap-2 justify-center">
                  <Button
                    onClick={() => onEdit(r)}
                    variant="default"
                    size="icon"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
