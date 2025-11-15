import Pagination from '@/components/layout/Pagination.tsx';
import { useAppDispatch } from '@/core/store/store.ts';
import PostFilters from '@/features/posts/components/PostFilters.tsx';
import { PostTableSkeleton } from '@/features/posts/components/PostSkeleton.tsx';
import PostTable from '@/features/posts/components/PostTable.tsx';
import { useGetPostsQuery } from '@/features/posts/services/postApi.ts';
import type {
  PostItem,
  PostQueryParams,
} from '@/features/posts/types/post.types.ts';
import { useState } from 'react';

export default function PostPage() {
  const [params, setParams] = useState<PostQueryParams>({ page: 1, size: 5 });
  const dispatch = useAppDispatch();
  const { data, isLoading, isFetching } = useGetPostsQuery(params);
  const item = data?.data;
  const posts = item?.content as PostItem[];
  const rowCount = posts?.length || params.size;
  console.log(params.size);
  console.log('Post list: ', posts);
  const handleFilter = (filters: PostQueryParams) => {
    setParams({
      ...filters,
      page: 1,
      size: 5,
    });
  };

  return (
    <div className="p-6 space-y-5 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold">Post Management</h1>

      <PostFilters onFilter={handleFilter} />

      {isLoading || isFetching ? (
        <PostTableSkeleton rowCount={rowCount} />
      ) : (
        <>
          {data && <PostTable posts={posts} />}

          {data && (
            <Pagination
              page={params.page || 1}
              totalPages={item?.totalPages as number}
              onChange={(p) => setParams({ ...params, page: p })}
            />
          )}
        </>
      )}
    </div>
  );
}
