import { useUpdatePostMutation } from '@/features/posts/services/postApi.ts';
import type {
  Difficulty,
  PostItem,
} from '@/features/posts/types/post.types.ts';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Check, Clock, Loader2, MapPin, UtensilsCrossed, X } from 'lucide-react';
import { useState } from 'react';

const statusConfig: Record<string, { color: string; label: string }> = {
  REJECT: { color: 'bg-orange-500 text-white', label: 'Từ chối' },
  PENDING: { color: 'bg-yellow-500 text-black', label: 'Chưa duyệt' },
  APPROVED: { color: 'bg-blue-500 text-white', label: 'Đã duyệt' },
};

const difficultyConfig: Record<Difficulty, { color: string; label: string }> = {
  HARD: { color: 'bg-red-500 text-white', label: 'Khó' },
  MEDIUM: { color: 'bg-yellow-500 text-black', label: 'Trung bình' },
  EASY: { color: 'bg-green-500 text-white', label: 'Dễ' },
};

interface PostHeaderProps {
  post: PostItem;
  onStatusUpdateSuccess?: () => void;
  onStatusUpdateError?: (error: string) => void;
}

export default function PostHeader({
  post,
  onStatusUpdateSuccess,
  onStatusUpdateError,
}: PostHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(post.status);
  const [updatePost, { isLoading }] = useUpdatePostMutation();

  const handleStatusChange = (newStatus: string) => {
    setSelectedStatus(newStatus);
  };

  const handleSave = async () => {
    if (selectedStatus === post.status) {
      setIsEditing(false);
      return;
    }

    try {
      await updatePost({
        id: post.id,
        content: post.content,
        status: selectedStatus,
      }).unwrap();

      setIsEditing(false);
      onStatusUpdateSuccess?.();
    } catch (error: any) {
      console.error('Failed to update post status:', error);
      const errorMessage =
        error?.data?.message || 'Cập nhật trạng thái thất bại';
      onStatusUpdateError?.(errorMessage);
      setSelectedStatus(post.status);
    }
  };

  const handleCancel = () => {
    setSelectedStatus(post.status);
    setIsEditing(false);
  };

  return (
    <>
      {/* User Info & Status */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="w-14 h-14 border-2 border-blue-100 rounded-full overflow-hidden">
            <AvatarImage
              src={post.avatarUrl}
              alt={post.username}
              className="w-full h-full object-cover"
            />
            <AvatarFallback className="bg-blue-500 text-white text-lg flex items-center justify-center w-full h-full">
              {post.username?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-gray-800 text-lg">
              {post.username}
            </h3>
            <p className="text-sm text-gray-500">{post.email}</p>
            <p className="text-xs text-gray-400 mt-1">
              {new Date(post.createdAt).toLocaleString('vi-VN')}
            </p>
          </div>
        </div>
        {/* Status Update Section */}
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              statusConfig[post.status]?.color || 'bg-gray-300'
            } hover:opacity-90 hover:shadow-lg transition-all flex items-center gap-2 group`}
          >
            <span>{statusConfig[post.status]?.label || post.status}</span>
            <svg
              className="w-4 h-4 transition-transform group-hover:rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <select
              value={selectedStatus}
              onChange={(e) => handleStatusChange(e.target.value)}
              disabled={isLoading}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border-2 border-gray-300 focus:border-blue-500 focus:outline-none ${
                statusConfig[selectedStatus]?.color || 'bg-gray-300'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {Object.entries(statusConfig).map(([key, config]) => (
                <option key={key} value={key}>
                  {config.label}
                </option>
              ))}
            </select>

            <div className="flex items-center gap-1">
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="p-1.5 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Lưu"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Check className="w-4 h-4" />
                )}
              </button>

              <button
                onClick={handleCancel}
                disabled={isLoading}
                className="p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Hủy"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{post.title}</h1>
        {post.description && (
          <p className="text-gray-600 text-base">{post.description}</p>
        )}
      </div>

      {/* Main Image */}
      <div className="relative rounded-xl overflow-hidden shadow-lg">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-96 object-cover"
        />
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg ${difficultyConfig[post.difficulty]?.color}`}
          >
            {difficultyConfig[post.difficulty]?.label}
          </span>
        </div>
      </div>

      {/* Recipe Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 flex items-center gap-3">
          <div className="bg-blue-500 rounded-full p-2">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Thời gian chuẩn bị</p>
            <p className="text-lg font-semibold text-gray-800">
              {post.prepTime} phút
            </p>
          </div>
        </div>

        <div className="bg-orange-50 rounded-lg p-4 flex items-center gap-3">
          <div className="bg-orange-500 rounded-full p-2">
            <UtensilsCrossed className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Thời gian nấu</p>
            <p className="text-lg font-semibold text-gray-800">
              {post.cookTime} phút
            </p>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4 flex items-center gap-3">
          <div className="bg-green-500 rounded-full p-2">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Vùng miền</p>
            <p className="text-lg font-semibold text-gray-800">{post.region}</p>
          </div>
        </div>
      </div>
    </>
  );
}
