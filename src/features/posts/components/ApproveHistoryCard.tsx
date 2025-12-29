import { Badge } from '@/components/ui/badge.tsx';
import { Card, CardContent } from '@/components/ui/card.tsx';
import { Bot, Calendar, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import type { ApprovePostResponse } from '@/features/posts/types/post.types.ts';

interface ApproveHistoryCardProps {
  history: ApprovePostResponse;
  isSelected: boolean;
  onClick: () => void;
}

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    APPROVED: 'bg-green-100 text-green-700 border-green-200',
    REJECTED: 'bg-red-100 text-red-700 border-red-200',
    PENDING: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  };
  return colors[status] || 'bg-gray-100 text-gray-700 border-gray-200';
};

const getStatusText = (status: string) => {
  const texts: Record<string, string> = {
    APPROVED: 'Đã duyệt',
    REJECTED: 'Từ chối',
    PENDING: 'Chờ duyệt',
  };
  return texts[status] || status;
};

const getScoreColor = (score: number) => {
  if (score >= 8) return 'text-green-600';
  if (score >= 6) return 'text-yellow-600';
  return 'text-red-600';
};

export default function ApproveHistoryCard({
  history,
  isSelected,
  onClick,
}: ApproveHistoryCardProps) {
  return (
    <Card
      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
        isSelected ? 'ring-2 ring-blue-500 shadow-md' : ''
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-blue-100 rounded-lg">
                <Bot className="w-4 h-4 text-blue-600" />
              </div>
              <Badge className={`${getStatusColor(history.status)} text-xs`}>
                {getStatusText(history.status)}
              </Badge>
            </div>

            <p className="text-sm text-gray-700 line-clamp-2 mb-2">
              {history.summary || 'Không có tóm tắt'}
            </p>

            <div className="flex items-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>
                  {format(new Date(history.createdAt), 'dd/MM/yyyy HH:mm', {
                    locale: vi,
                  })}
                </span>
              </div>
              <div
                className={`font-semibold ${getScoreColor(history.totalScore)}`}
              >
                Điểm: {history.totalScore.toFixed(1)}/100
              </div>
            </div>
          </div>

          <ChevronRight
            className={`w-5 h-5 text-gray-400 transition-transform ${
              isSelected ? 'rotate-90' : ''
            }`}
          />
        </div>
      </CardContent>
    </Card>
  );
}
