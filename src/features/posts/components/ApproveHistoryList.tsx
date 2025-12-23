import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import ApproveHistoryCard from '@/features/posts/components/ApproveHistoryCard.tsx';
import ApproveHistoryDetail from '@/features/posts/components/ApproveHistoryDetail.tsx';
import { useGetApproveHistoryQuery } from '@/features/posts/services/postApi.ts';
import { AlertCircle, Bot, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface ApproveHistoryListProps {
  postId: number;
}

export default function ApproveHistoryList({
  postId,
}: ApproveHistoryListProps) {
  const {
    data: apiResponse,
    isLoading,
    error,
  } = useGetApproveHistoryQuery(postId);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const histories = apiResponse?.data || [];
  const selectedHistory = histories.find((h) => h.id === selectedId);

  if (isLoading) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-2" />
            <p className="text-sm text-gray-500">
              Đang tải lịch sử đánh giá...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center">
            <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <p className="text-sm text-gray-500">
              Không thể tải lịch sử đánh giá
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (histories.length === 0) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center">
            <Bot className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-sm font-medium text-gray-600">
              Chưa có lịch sử đánh giá
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Bài viết chưa được AI đánh giá
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Bot className="w-5 h-5 text-blue-600" />
            Lịch sử đánh giá AI ({histories.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 max-h-[400px] overflow-y-auto">
          {histories.map((history) => (
            <ApproveHistoryCard
              key={history.id}
              history={history}
              isSelected={selectedId === history.id}
              onClick={() =>
                setSelectedId(selectedId === history.id ? null : history.id)
              }
            />
          ))}
        </CardContent>
      </Card>

      {selectedHistory && (
        <div className="animate-in slide-in-from-top duration-200">
          <ApproveHistoryDetail history={selectedHistory} />
        </div>
      )}
    </div>
  );
}
