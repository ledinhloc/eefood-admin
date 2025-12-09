import { Button } from '@/components/ui/button.tsx';
import PostContent from '@/features/posts/components/PostContent.tsx';
import PostHeader from '@/features/posts/components/PostHeader.tsx';
import { useLazyGetPostByIdQuery } from '@/features/posts/services/postApi.ts';
import { useLazyGetRecipeByIdQuery } from '@/features/recipes/services/recipeApi.ts';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';


export default function PostReviewPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [
    getPostById,
    { data: apiReponse, isLoading: isPostLoading, error: errorPost },
  ] = useLazyGetPostByIdQuery();
  const [
    getRecipeById,
    { data: recipe, isLoading: isRecipeLoading, error: errorRecipe },
  ] = useLazyGetRecipeByIdQuery();

  const post = apiReponse?.data;

  useEffect(() => {
    if (id) getPostById(Number(id));
  }, [id, getPostById]);

  useEffect(() => {
    if (post?.recipeId) getRecipeById(Number(post.recipeId));
  }, [post?.recipeId, getRecipeById]);

  useEffect(() => {
    if (errorPost) {
      toast.error('Không thể tải bài viết');
      navigate(-1);
    }
  }, [errorPost, navigate]);

  if (isPostLoading || isRecipeLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
        <div className="bg-white rounded-lg p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-lg font-semibold text-gray-800">
            Chi tiết bài viết
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="overflow-y-auto flex-1">
          <div className="p-6 space-y-6">
            <PostHeader post={post} />
            <PostContent post={post} recipe={recipe} />
          </div>
        </div>
      </div>
    </div>
  );
}
