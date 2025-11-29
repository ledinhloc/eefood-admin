import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useUpdatePostMutation } from '@/features/posts/services/postApi.ts';
import type { PostItem } from '@/features/posts/types/post.types.ts';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface PostModalProps {
  post: PostItem;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function PostModal({ post, open, setOpen }: PostModalProps) {
  const [recipeId, setRecipeId] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState<{
    recipeId?: string;
    content?: string;
    status?: string;
  }>({});
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();

  useEffect(() => {
    if (open && post) {
      setRecipeId(post.recipeId.toString());
      setContent(post.content);
      setStatus(post.status);
      setErrors({});
    }
  }, [open, post]);

  const validateForm = (): boolean => {
    const newErrors: {
      recipeId?: string;
      content?: string;
      status?: string;
    } = {};

    if (!recipeId) {
      newErrors.recipeId = 'Vui lòng chọn món ăn';
    }

    if (!content.trim()) {
      newErrors.content = 'Vui lòng nhập nội dung';
    } else if (content.trim().length < 10) {
      newErrors.content = 'Nội dung phải có ít nhất 10 ký tự';
    }

    if (!status) {
      newErrors.status = 'Vui lòng chọn trạng thái';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      await updatePost({
        id: post.id,
        content: content.trim(),
        status,
      }).unwrap();

      console.log(post.id);

      toast.success('Cập nhật bài viết thành công!');
      setOpen(false);
    } catch (err: any) {
      console.error('Update post error:', err);

      // Xử lý các loại lỗi khác nhau
      if (err?.status === 401) {
        toast.error('Phiên đăng nhập đã hết hạn');
      } else if (err?.status === 403) {
        toast.error('Bạn không có quyền cập nhật bài viết này');
      } else if (err?.status === 404) {
        toast.error('Không tìm thấy bài viết');
      } else if (err?.data?.message) {
        toast.error(err.data.message);
      } else {
        toast.error('Có lỗi xảy ra khi cập nhật bài viết');
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-full sm:max-w-3xl lg:max-w-4xl p-6 rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Cập nhật bài viết
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Hiển thị thông tin món ăn */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Món ăn</label>
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border">
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-20 h-20 object-cover rounded-md"
                />
              )}
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{post.title}</h3>
              </div>
            </div>
          </div>

          {/* Nội dung */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Nội dung</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="h-32 w-full resize-none border rounded-md p-2"
              placeholder="Nhập nội dung bài viết..."
            />
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">{errors.content}</p>
            )}
          </div>

          {/* Trạng thái */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Trạng thái</label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PENDING">Chưa duyệt</SelectItem>
                <SelectItem value="APPROVED">Đã duyệt</SelectItem>
                <SelectItem value="REJECT">Từ chối</SelectItem>
              </SelectContent>
            </Select>
            {errors.status && (
              <p className="text-red-500 text-sm mt-1">{errors.status}</p>
            )}
          </div>
        </div>

        <DialogFooter className="mt-6 flex justify-end space-x-3">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isUpdating}
          >
            Hủy
          </Button>
          <Button onClick={handleSubmit} disabled={isUpdating}>
            {isUpdating ? 'Đang cập nhật...' : 'Cập nhật'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
