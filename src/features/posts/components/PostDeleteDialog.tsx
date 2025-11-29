import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDeletePostMutation } from "@/features/posts/services/postApi";
import { Loader2 } from "lucide-react";
import type { PostItem } from "../types/post.types";

interface PostDeleteDialogProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  post: PostItem | null;
}

export default function PostDeleteDialog({
  open,
  setOpen,
  post,
}: PostDeleteDialogProps) {
  const [deletePost, { isLoading }] = useDeletePostMutation();

  const handleDelete = async () => {
    if (!post) return;
    try {
      await deletePost(post.id).unwrap();
    } catch (err) {
      console.error("Delete failed:", err);
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Xác nhận xoá bài viết</DialogTitle>
        </DialogHeader>

        <p>
          Bạn có chắc chắn muốn xoá bài viết:
          <strong> {post?.title}</strong>?
        </p>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isLoading}
          >
            Không
          </Button>

          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Có, xoá ngay"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
