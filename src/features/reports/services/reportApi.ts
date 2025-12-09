import { api } from '@/core/api/api.ts';
import type { ResponseData } from '@/features/posts/types/post.types.ts';
import type {
  ReportPageResponse,
  ReportQueryParams,
  ReportResponse,
  UpdateReportStatusRequest,
} from '@/features/reports/types/report.types.ts';

export const reportApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllReports: builder.query<ReportPageResponse, ReportQueryParams>({
      query: (params) => ({
        url: '/admin/reports',
        method: 'GET',
        params: params,
      }),
      providesTags: ['Reports'],
    }),
    updateReportStatus: builder.mutation<
      ResponseData<ReportResponse>,
      UpdateReportStatusRequest
    >({
      query: ({ id, status, type }) => ({
        url: `/admin/reports/${id}`,
        method: 'PUT',
        data: { status: status, type: type },
      }),
      invalidatesTags: ['Reports'],
    }),
  }),
});

export const { useGetAllReportsQuery, useUpdateReportStatusMutation } =
  reportApi;
