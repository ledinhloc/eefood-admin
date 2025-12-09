import {
  Angry,
  ChevronDown,
  ChevronUp,
  Clock,
  Frown,
  Heart,
  Laugh,
  Share2,
  ThumbsUp,
} from 'lucide-react';
import { useState, type ReactNode } from 'react';

type ReactionKey = 'LIKE' | 'LOVE' | 'WOW' | 'SAD' | 'ANGRY';

const reactionIcons: Record<string, { icon: ReactNode; label: string }> = {
  LIKE: { icon: <ThumbsUp className="w-5 h-5" />, label: 'Thích' },
  LOVE: { icon: <Heart className="w-5 h-5" />, label: 'Yêu thích' },
  WOW: { icon: <Laugh className="w-5 h-5" />, label: 'Wow' },
  SAD: { icon: <Frown className="w-5 h-5" />, label: 'Buồn' },
  ANGRY: { icon: <Angry className="w-5 h-5" />, label: 'Phẫn nộ' },
};

const reactionColors: Record<string, string> = {
  LIKE: 'text-blue-500',
  LOVE: 'text-red-500',
  WOW: 'text-yellow-400',
  SAD: 'text-indigo-500',
  ANGRY: 'text-orange-600',
};

export default function PostContent({
  post,
  recipe,
}: {
  post: any;
  recipe: any;
}) {
  const [showIngredients, setShowIngredients] = useState(false);
  const [showSteps, setShowSteps] = useState(false);

  const totalReactions = Object.values(post.reactionCounts || {}).reduce(
    (sum: number, count) => sum + (count as number),
    0
  );
  const topReaction = Object.entries(post.reactionCounts || {}).sort(
    ([, a], [, b]) => (b as number) - (a as number)
  )[0];

  return (
    <>
      {/* Content */}
      <div className="bg-gray-50 rounded-lg p-5">
        <h3 className="font-semibold text-gray-800 mb-3 text-lg">
          Nội dung bài viết
        </h3>
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {post.content}
        </p>
      </div>

      {/* Categories */}
      {recipe?.categories && recipe.categories.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-800 mb-3 text-lg flex items-center gap-2">
            <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
            Danh mục công thức
          </h3>
          <div className="flex flex-wrap gap-2">
            {recipe.categories.map((category: any) => (
              <div
                key={category.id}
                className="px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 text-blue-700 rounded-full text-sm font-medium flex items-center gap-2 hover:shadow-md transition-shadow"
              >
                {category.iconUrl && (
                  <img src={category.iconUrl} alt="" className="w-4 h-4" />
                )}
                {category.description}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Engagement Stats */}
      <div className="border-t pt-6">
        <h3 className="font-semibold text-gray-800 mb-4 text-lg flex items-center gap-2">
          <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
          Thống kê tương tác
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-pink-50 to-red-50 rounded-lg px-4 py-4 border border-pink-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-1">
              <Heart className="w-5 h-5 text-red-500" />
              <span className="text-sm text-gray-600">Cảm xúc</span>
            </div>
            <span className="text-2xl font-bold text-gray-800">
              {totalReactions}
            </span>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg px-4 py-4 border border-purple-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-1">
              <Share2 className="w-5 h-5 text-purple-500" />
              <span className="text-sm text-gray-600">Chia sẻ</span>
            </div>
            <span className="text-2xl font-bold text-gray-800">
              {post.totalShares || 0}
            </span>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg px-4 py-4 border border-blue-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-1">
              <svg
                className="w-5 h-5 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span className="text-sm text-gray-600">Bình luận</span>
            </div>
            <span className="text-2xl font-bold text-gray-800">
              {post.totalComments || 0}
            </span>
          </div>

          {topReaction && (
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-lg px-4 py-4 border border-yellow-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-1">
                <span className={reactionColors[topReaction[0]]}>
                  {reactionIcons[topReaction[0]]?.icon}
                </span>
                <span className="text-sm text-gray-600">Phổ biến</span>
              </div>
              <span className="text-2xl font-bold text-gray-800">
                {topReaction[1] as ReactionKey}
              </span>
            </div>
          )}
        </div>

        {/* Reactions Breakdown */}
        {Object.entries(post.reactionCounts || {}).length > 0 && (
          <div className="mt-4 bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-3 font-medium">
              Chi tiết cảm xúc
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {Object.entries(post.reactionCounts || {}).map(([key, count]) => (
                <div
                  key={key}
                  className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border"
                >
                  <span className={reactionColors[key]}>
                    {reactionIcons[key]?.icon}
                  </span>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">
                      {reactionIcons[key]?.label || key}
                    </p>
                    <p className="font-semibold text-gray-800">
                      {count as number}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Ingredients */}
      {recipe?.ingredients && recipe.ingredients.length > 0 && (
        <div className="border rounded-xl overflow-hidden">
          <button
            onClick={() => setShowIngredients(!showIngredients)}
            className="w-full bg-gradient-to-r from-green-50 to-emerald-50 px-5 py-4 flex items-center justify-between hover:from-green-100 hover:to-emerald-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-green-500 rounded-full"></div>
              <h3 className="font-semibold text-gray-800 text-lg">
                Nguyên liệu ({recipe.ingredients.length})
              </h3>
            </div>
            {showIngredients ? (
              <ChevronUp className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-600" />
            )}
          </button>

          {showIngredients && (
            <div className="p-5 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {recipe.ingredients.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border hover:shadow-md transition-shadow"
                  >
                    {item.ingredient.imageUrl && (
                      <img
                        src={item.ingredient.imageUrl}
                        alt={item.ingredient.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">
                        {item.ingredient.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {item.quantity} {item.unit}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Steps */}
      {recipe?.steps && recipe.steps.length > 0 && (
        <div className="border rounded-xl overflow-hidden">
          <button
            onClick={() => setShowSteps(!showSteps)}
            className="w-full bg-gradient-to-r from-orange-50 to-amber-50 px-5 py-4 flex items-center justify-between hover:from-orange-100 hover:to-amber-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-orange-500 rounded-full"></div>
              <h3 className="font-semibold text-gray-800 text-lg">
                Các bước thực hiện ({recipe.steps.length} bước)
              </h3>
            </div>
            {showSteps ? (
              <ChevronUp className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-600" />
            )}
          </button>

          {showSteps && (
            <div className="p-5 bg-white space-y-4">
              {[...recipe.steps]
                .sort((a: any, b: any) => a.stepNumber - b.stepNumber)
                .map((step: any) => (
                  <div
                    key={step.id}
                    className="flex gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border hover:shadow-md transition-shadow"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                        {step.stepNumber}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800 leading-relaxed mb-3">
                        {step.instruction}
                      </p>
                      {step.stepTime > 0 && (
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                          <Clock className="w-4 h-4" />
                          <span>{step.stepTime} phút</span>
                        </div>
                      )}
                      {step.imageUrls && step.imageUrls.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3">
                          {step.imageUrls.map((url: string, idx: number) => (
                            <img
                              key={idx}
                              src={url}
                              alt={`Bước ${step.stepNumber} - ${idx + 1}`}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                          ))}
                        </div>
                      )}
                      {step.videoUrls && step.videoUrls.length > 0 && (
                        <div className="mt-3">
                          {step.videoUrls.map((url: string, idx: number) => (
                            <video
                              key={idx}
                              src={url}
                              controls
                              className="w-full rounded-lg"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}

      {/* Meta Info */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 text-sm text-gray-600 border">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <span className="font-medium text-gray-700">ID Bài viết:</span>{' '}
            <span className="text-gray-800">#{post.id}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">ID Công thức:</span>{' '}
            <span className="text-gray-800">#{post.recipeId}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Tạo lúc:</span>{' '}
            <span className="text-gray-800">
              {new Date(post.createdAt).toLocaleString('vi-VN')}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Cập nhật:</span>{' '}
            <span className="text-gray-800">
              {new Date(post.updatedAt).toLocaleString('vi-VN')}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
