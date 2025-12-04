import React from 'react';

interface PaginationProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
  usersCount: number;
}

export const Pagination: React.FC<PaginationProps> = ({ page, totalPages, setPage, usersCount }) => {
  return (
    <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-600">
          Showing <span className="font-semibold">{usersCount}</span> users
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage(Math.max(0, page - 1))}
            disabled={page === 0}
            className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>

          <span className="px-4 py-2 text-slate-700">
            Page {page + 1} of {totalPages}
          </span>

          <button
            onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
            disabled={page >= totalPages - 1}
            className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
