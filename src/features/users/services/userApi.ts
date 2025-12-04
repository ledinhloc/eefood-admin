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
      query: (data) => ({ url: '/users', method: 'POST', data }),
      invalidatesTags: ['Users'],
    }),

     updateUser: builder.mutation<UserResponse, UserUpdateRequest>({
      query: (data) => ({ url: '/users/update', method: 'PUT', data }),
      invalidatesTags: ['Users'],
    }),

     updateRoleUser: builder.mutation<UserResponse, AdminUpdateRequest>({
      query: (data) => ({ url: '/users/update-role', method: 'PUT', data }),
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
