import { api } from '@/core/api/api.ts';
import type {
  PostPageResponse,
  PostQueryParams,
} from '@/features/posts/types/post.types.ts';

export const postApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<PostPageResponse, PostQueryParams>({
      query: (params) => ({
        url: 'admin/posts',
        method: 'GET',
        params: params as Record<string, unknown>,
      }),
      providesTags: ['Posts'],
    }),
  }),
});

export const { useGetPostsQuery } = postApi;
