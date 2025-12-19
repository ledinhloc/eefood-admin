import { api } from '@/core/api/api.ts';
import {
  type UserStatistics,
  type PostStatistics,
  type DashboardQueryParams,
} from '@/features/dashboard/types/dashboard.types.ts';
import type { ResponseData } from '@/features/users/types/user.types.ts';

export const dashboardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserStatistics: builder.query<
      ResponseData<UserStatistics>,
      DashboardQueryParams
    >({
      query: (params) => ({
        url: '/admin/users/statistics',
        method: 'GET',
        params: {
          topInfluencersLimit: params.topInfluencersLimit || 3,
          recentRegistrationsLimit: params.recentRegistrationsLimit || 5,
          topPostCreatorsLimit: params.topPostCreatorsLimit || 5,
        },
      }),
      providesTags: ['Dashboard'],
    }),
    getPostStatistics: builder.query<
      ResponseData<PostStatistics>,
      DashboardQueryParams
    >({
      query: (params) => ({
        url: '/admin/posts/statistics',
        method: 'GET',
        params: {
          topPostsLimit: params.topPostsLimit || 10,
          recentViolatedPostsLimit: params.recentViolatedPostsLimit || 5,
        },
      }),
      providesTags: ['Dashboard'],
    }),
  }),
});

export const { useGetUserStatisticsQuery, useGetPostStatisticsQuery } =
  dashboardApi;
