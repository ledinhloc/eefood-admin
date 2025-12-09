// src/features/reports/pages/ReportPage.tsx
import Pagination from '@/components/layout/Pagination.tsx';
import ReportFilter from '@/features/reports/components/ReportFilter.tsx';
import ReportModal from '@/features/reports/components/ReportModal.tsx';
import ReportTable from '@/features/reports/components/ReportTable.tsx';
import { useGetAllReportsQuery } from '@/features/reports/services/reportApi.ts';
import type {
  ReportQueryParams,
  ReportResponse,
} from '@/features/reports/types/report.types.ts';
import { useState } from 'react';

export default function ReportPage() {
  const [params, setParams] = useState<ReportQueryParams>({
    page: 1,
    limit: 10,
  });

  const [selectedReport, setSelectedReport] = useState<ReportResponse | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isFetching } = useGetAllReportsQuery(params);

  const reports = (data?.data?.content ?? []) as ReportResponse[];
  const totalPages = data?.data?.totalPages ?? 1;

  const handleFilter = (f: ReportQueryParams) => {
    const updated = { ...f, page: 1, limit: params.limit };
    setParams(updated);
  };

  const handlePageChange = (page: number) => {
    setParams((prev) => ({ ...prev, page }));
  };

  const handleEdit = (report: ReportResponse) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow space-y-5">
      <h1 className="text-2xl font-bold">Report Management</h1>

      <ReportFilter onFilter={handleFilter} />

      {isLoading || isFetching ? (
        <div className="text-center py-10 text-gray-500">Loading...</div>
      ) : reports.length > 0 ? (
        <>
          <ReportTable
            reports={reports}
            onEdit={handleEdit}
          />

          <Pagination
            page={params.page || 1}
            totalPages={totalPages}
            onChange={handlePageChange}
          />
        </>
      ) : (
        <div className="text-center py-8 text-gray-500">
          Không có báo cáo nào
        </div>
      )}
      <ReportModal
        report={selectedReport}
        open={isModalOpen}
        setOpen={setIsModalOpen}
      />
    </div>
  );
}
