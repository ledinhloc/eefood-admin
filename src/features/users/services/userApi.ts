import { api } from '@/core/api/api';
import type { UserPageResponse, UserQueryParams, ResponseData } from '../types/user.types';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<ResponseData<UserPageResponse>, UserQueryParams>({
      query: (params) => ({
        url: '/users',
        method: 'GET',
        params,
      }),
      providesTags: ['Users'],
    }),
  }),
});

export const { useGetUsersQuery } = userApi;
