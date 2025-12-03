import { api } from '@/core/api/api';
import { type UserPageResponse, type UserQueryParams, type ResponseData, type UserCreateRequest, type UserUpdateRequest, type AdminUpdateRequest, type UserResponse } from '../types/user.types';

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

    createUser: builder.mutation<UserResponse, UserCreateRequest>({
      query: (body) => ({ url: '/users', method: 'POST', body }),
      invalidatesTags: ['Users'],
    }),

     updateUser: builder.mutation<UserResponse, UserUpdateRequest>({
      query: (body) => ({ url: '/users/update', method: 'PUT', body }),
      invalidatesTags: ['Users'],
    }),

     updateRoleUser: builder.mutation<UserResponse, AdminUpdateRequest>({
      query: (body) => ({ url: '/users/update-role', method: 'PUT', body }),
      invalidatesTags: ['Users'],
    }),

    deleteUser: builder.mutation<void, number>({
      query: (id) => ({ url: `/users/delete/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Users'],
    }),
  }),
});


export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useUpdateRoleUserMutation,
  useDeleteUserMutation,
} = userApi;
