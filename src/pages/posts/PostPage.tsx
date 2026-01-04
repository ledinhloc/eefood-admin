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
import { FileText } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Modern Header with gradient */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 p-8 shadow-2xl">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative flex items-center gap-4">
            <div className="p-4 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-3xl font-bold text-white mb-1">
                Post Management
              </h1>
              <p className="text-indigo-100 text-sm sm:text-base">
                Manage and monitor all posts in your system
              </p>
            </div>
          </div>
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
        </div>

        {/* Filters Section */}
        <PostFilters onFilter={handleFilter} />

        {/* Content Section */}
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
              <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-slate-200">
                <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 text-lg font-medium">
                  Không có bài viết nào
                </p>
                <p className="text-slate-400 text-sm mt-1">
                  Thử điều chỉnh bộ lọc của bạn
                </p>
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

        {/* Modals */}
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
    </div>
  );
}
