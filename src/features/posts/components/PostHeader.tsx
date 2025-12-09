import type { Difficulty, PostItem } from '@/features/posts/types/post.types.ts';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Clock, MapPin, UtensilsCrossed } from 'lucide-react';

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

export default function PostHeader({ post }: { post: PostItem }) {
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
        <span
          className={`px-3 py-1.5 rounded-full text-sm font-medium ${statusConfig[post.status]?.color || 'bg-gray-300'}`}
        >
          {statusConfig[post.status]?.label || post.status}
        </span>
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
