import { api } from '@/core/api/api.ts';
import {
  type ApprovePostResponse,
  type PostCreateUpdateRequest,
  type PostItem,
  type PostPageResponse,
  type PostPublishResponse,
  type PostQueryParams,
  type ResponseData,
} from '@/features/posts/types/post.types.ts';

export const postApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getApproveHistory: builder.query<
      ResponseData<ApprovePostResponse[]>,
      number
    >({
      query: (postId) => ({
        url: `/posts/${postId}/approve-history`,
        method: 'GET',
      }),
      providesTags: ['ApproveHistory'],
    }),
    getPostById: builder.query<ResponseData<PostItem>, number>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'GET',
      }),
      providesTags: ['Posts'],
    }),
    getPosts: builder.query<PostPageResponse, PostQueryParams>({
      query: (params) => ({
        url: '/admin/posts',
        method: 'GET',
        params: params as Record<string, unknown>,
      }),
      providesTags: ['Posts'],
    }),
    updatePost: builder.mutation<PostPublishResponse, PostCreateUpdateRequest>({
      query: ({ id, content, status }) => ({
        url: `/posts/admin/${id}`,
        method: 'PUT',
        data: { content, status },
      }),
      invalidatesTags: ['Posts'],
      transformErrorResponse: (response: any) => {
        console.error('Update post error:', response);
        return response;
      },
    }),
    deletePost: builder.mutation<void, number>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Posts'],
    }),
  }),
});

export const {
  useGetApproveHistoryQuery,
  useLazyGetPostByIdQuery,
  useGetPostsQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApi;
