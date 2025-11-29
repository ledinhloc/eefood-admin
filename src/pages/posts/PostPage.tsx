import Pagination from '@/components/layout/Pagination.tsx';
import { useAppDispatch, useAppSelector } from '@/core/store/store.ts';
import PostDeleteDialog from '@/features/posts/components/PostDeleteDialog.tsx';
import PostFilters from '@/features/posts/components/PostFilters.tsx';
import { PostTableSkeleton } from '@/features/posts/components/PostSkeleton.tsx';
import PostTable from '@/features/posts/components/PostTable.tsx';
import PostModal from '@/features/posts/components/PostUpdateModal';
import { useGetPostsQuery } from '@/features/posts/services/postApi.ts';
import { setFilters, updateFilters } from '@/features/posts/slices/postSlice';
import type {
  PostItem,
  PostQueryParams,
} from '@/features/posts/types/post.types.ts';
import { useState } from 'react';

export default function PostPage() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.post?.filters);
  const [params, setParams] = useState<PostQueryParams>(
    filters || { page: 1, size: 5 }
  );
  const { data, isLoading, isFetching } = useGetPostsQuery(params);

  const item = data?.data;
  const posts = item?.content as PostItem[];
  const rowCount = posts?.length || params.size;
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deletePost, setDeletePost] = useState<PostItem | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<PostItem | null>(null);

  const handleFilter = (newFilters: PostQueryParams) => {
    const updatedParams = {
      ...newFilters,
      page: 1,
      size: params.size || 5,
    };
    setParams(updatedParams);
    dispatch(setFilters(updatedParams));
  };

  const handlePageChange = (page: number) => {
    const updatedParams = { ...params, page };
    setParams(updatedParams);
    dispatch(updateFilters({ page }));
  };

  return (
    <div className="p-6 space-y-5 bg-gray-50 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Post Management</h1>
      </div>

      <PostFilters onFilter={handleFilter} />

      {isLoading || isFetching ? (
        <PostTableSkeleton rowCount={rowCount} />
      ) : (
        <>
          {data && posts && posts.length > 0 ? (
            <PostTable
              posts={posts}
              onEdit={(post) => {
                setSelectedPost(post);
                setOpenModal(true);
              }}
              onDelete={(post) => {
                setDeletePost(post);
                setOpenDeleteDialog(true);
              }}
            />
          ) : (
            <div className="text-center py-8 text-gray-500">
              Không có bài viết nào
            </div>
          )}

          {data && item && item.totalPages > 0 && (
            <Pagination
              page={params.page || 1}
              totalPages={item.totalPages}
              onChange={handlePageChange}
            />
          )}
        </>
      )}

      {selectedPost && (
        <PostModal
          post={selectedPost}
          open={openModal}
          setOpen={setOpenModal}
        />
      )}
      {deletePost && (
        <PostDeleteDialog
          open={openDeleteDialog}
          setOpen={setOpenDeleteDialog}
          post={deletePost}
        />
      )}
    </div>
  );
}
