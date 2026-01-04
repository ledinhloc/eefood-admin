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
import { AlertTriangle, ShieldAlert } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Modern Header with gradient */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 via-orange-600 to-pink-600 p-8 shadow-2xl">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative flex items-center gap-4">
            <div className="p-4 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-3xl font-bold text-white mb-1">
                Report Management
              </h1>
              <p className="text-red-100 text-sm sm:text-base">
                Review and manage user reports and violations
              </p>
            </div>
          </div>
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
        </div>

        {/* Filters Section */}
        <ReportFilter onFilter={handleFilter} />

        {/* Content Section */}
        {isLoading || isFetching ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
            <p className="mt-4 text-slate-500 font-medium">
              Loading reports...
            </p>
          </div>
        ) : reports.length > 0 ? (
          <>
            <ReportTable reports={reports} onEdit={handleEdit} />

            <Pagination
              page={params.page || 1}
              totalPages={totalPages}
              onChange={handlePageChange}
            />
          </>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-slate-200">
            <AlertTriangle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 text-lg font-medium">
              Không có báo cáo nào
            </p>
            <p className="text-slate-400 text-sm mt-1">
              Thử điều chỉnh bộ lọc của bạn
            </p>
          </div>
        )}

        {/* Modal */}
        <ReportModal
          report={selectedReport}
          open={isModalOpen}
          setOpen={setIsModalOpen}
        />
      </div>
    </div>
  );
}
