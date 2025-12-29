import { Badge } from '@/components/ui/badge.tsx';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { Progress } from '@/components/ui/progress.tsx';
import {
  AlertCircle,
  BookOpen,
  CheckCircle2,
  FileText,
  Image,
  Shield,
  TrendingUp,
} from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import type { ApprovePostResponse } from '@/features/posts/types/post.types.ts';

interface ApproveHistoryDetailProps {
  history: ApprovePostResponse;
}

interface ScoreItem {
  label: string;
  value: number;
  note: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const getScoreColor = (score: number) => {
  if (score >= 8) return 'bg-green-500';
  if (score >= 6) return 'bg-yellow-500';
  return 'bg-red-500';
};

const getStatusInfo = (status: string) => {
  const info: Record<
    string,
    {
      color: string;
      icon: React.ComponentType<{ className?: string }>;
      text: string;
    }
  > = {
    APPROVED: {
      color: 'bg-green-100 text-green-700 border-green-200',
      icon: CheckCircle2,
      text: 'Đã duyệt',
    },
    REJECTED: {
      color: 'bg-red-100 text-red-700 border-red-200',
      icon: AlertCircle,
      text: 'Từ chối',
    },
    PENDING: {
      color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      icon: AlertCircle,
      text: 'Chờ duyệt',
    },
  };
  return info[status] || info.PENDING;
};

export default function ApproveHistoryDetail({
  history,
}: ApproveHistoryDetailProps) {
  const statusInfo = getStatusInfo(history.status);
  const StatusIcon = statusInfo.icon;

  const scoreItems: ScoreItem[] = [
    {
      label: 'Tính đầy đủ công thức',
      value: history.recipeCompleteness,
      note: history.completenessNote,
      icon: BookOpen,
      color: 'text-blue-600',
    },
    {
      label: 'An toàn nguyên liệu',
      value: history.ingredientSafety,
      note: history.safetyNote,
      icon: Shield,
      color: 'text-green-600',
    },
    {
      label: 'Rõ ràng các bước',
      value: history.stepClarity,
      note: history.clarityNote,
      icon: FileText,
      color: 'text-purple-600',
    },
    {
      label: 'Phù hợp nội dung',
      value: history.contentAppropriate,
      note: history.appropriatenessNote,
      icon: CheckCircle2,
      color: 'text-orange-600',
    },
    {
      label: 'Liên quan nội dung',
      value: history.contentRelevance,
      note: history.relevanceNote,
      icon: TrendingUp,
      color: 'text-indigo-600',
    },
    {
      label: 'Chất lượng media',
      value: history.mediaQuality,
      note: history.mediaQualityNote,
      icon: Image,
      color: 'text-pink-600',
    },
  ];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <StatusIcon
                className={`w-5 h-5 ${statusInfo.color.split(' ')[1]}`}
              />
              Tổng quan đánh giá
            </CardTitle>
            <Badge className={statusInfo.color}>{statusInfo.text}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-600 mb-1">Tổng điểm AI</p>
              <p className="text-3xl font-bold text-gray-800">
                {history.totalScore.toFixed(1)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-1">Thang điểm</p>
              <p className="text-2xl font-semibold text-gray-500">/ 100</p>
            </div>
          </div>

          {history.summary && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-1">
                Tóm tắt đánh giá:
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {history.summary}
              </p>
            </div>
          )}

          <div className="text-xs text-gray-500 flex items-center gap-1">
            <span>Đánh giá lúc:</span>
            <span className="font-medium">
              {format(new Date(history.createdAt), "dd/MM/yyyy 'lúc' HH:mm", {
                locale: vi,
              })}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Chi tiết đánh giá</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {scoreItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`p-1.5 bg-gray-100 rounded-lg ${item.color}`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-gray-800">
                    {item.value}/10
                  </span>
                </div>
                <Progress
                  value={item.value * 10}
                  className="h-2"
                  indicatorClassName={getScoreColor(item.value)}
                />
                {item.note && (
                  <p className="text-xs text-gray-600 pl-9 leading-relaxed">
                    {item.note}
                  </p>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
