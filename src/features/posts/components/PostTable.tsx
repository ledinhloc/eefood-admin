import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Angry,
  ArrowUpDown,
  Frown,
  Heart,
  Laugh,
  Pencil,
  ThumbsUp,
  Trash2,
} from 'lucide-react';
import { useState, type JSX } from 'react';
import type { PostItem } from '../types/post.types';

export default function PostTable({
  posts,
  onEdit,
  onDelete,
}: {
  posts: PostItem[];
  onEdit: (post: PostItem) => void;
  onDelete: (post: PostItem) => void;
}) {
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedPosts = [...posts].sort((a, b) => {
    if (!sortField) return 0;
    const valA = (a as any)[sortField];
    const valB = (b as any)[sortField];

    if (typeof valA === 'string') {
      return sortOrder === 'asc'
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    }

    if (typeof valA === 'number') {
      return sortOrder === 'asc' ? valA - valB : valB - valA;
    }

    return 0;
  });

  const difficultyColor = {
    HARD: 'bg-red-500 text-white',
    MEDIUM: 'bg-yellow-500 text-black',
    EASY: 'bg-green-500 text-white',
  };

  const statusColor: Record<string, string> = {
    REJECT: 'bg-orange-500 text-white',
    PENDING: 'bg-yellow-500 text-black',
    APPROVED: 'bg-blue-500 text-white',
  };

  const statusText: Record<string, string> = {
    REJECT: 'Từ chối',
    PENDING: 'Chưa duyệt',
    APPROVED: 'Đã duyệt',
  };

  const reactionIcons: Record<string, JSX.Element> = {
    LIKE: <ThumbsUp className="inline w-4 h-4 text-blue-500" />,
    LOVE: <Heart className="inline w-4 h-4 text-red-500" />,
    WOW: <Laugh className="inline w-4 h-4 text-yellow-400" />,
    SAD: <Frown className="inline w-4 h-4 text-indigo-500" />,
    ANGRY: <Angry className="inline w-4 h-4 text-orange-600" />,
  };

  return (
    <div className="border rounded-lg overflow-x-auto shadow bg-white">
      <Table className="min-w-[1200px]">
        <TableHeader>
          <TableRow className="text-center text-black">
            <TableHead className="text-center font-bold">#</TableHead>

            <TableHead className="text-center font-bold min-w-[120px]">
              Image
            </TableHead>

            <TableHead
              className="cursor-pointer text-center font-bold"
              onClick={() => handleSort('title')}
            >
              <div className="flex items-center justify-center gap-1 min-w-[120px]">
                Title <ArrowUpDown className="w-4 h-4" />
              </div>
            </TableHead>

            <TableHead
              className="cursor-pointer text-center font-bold"
              onClick={() => handleSort('username')}
            >
              <div className="flex items-center justify-center gap-1 min-w-[200px]">
                User <ArrowUpDown className="w-4 h-4" />
              </div>
            </TableHead>

            <TableHead className="text-center font-bold">Content</TableHead>

            <TableHead
              className="cursor-pointer text-center font-bold"
              onClick={() => handleSort('region')}
            >
              <div className="flex items-center justify-center gap-1">
                Region <ArrowUpDown className="w-4 h-4" />
              </div>
            </TableHead>

            <TableHead
              className="cursor-pointer text-center font-bold"
              onClick={() => handleSort('difficulty')}
            >
              <div className="flex items-center justify-center gap-1">
                Difficulty <ArrowUpDown className="w-4 h-4" />
              </div>
            </TableHead>

            <TableHead
              className="cursor-pointer text-center font-bold"
              onClick={() => handleSort('difficulty')}
            >
              <div className="flex items-center justify-center gap-1">
                Status <ArrowUpDown className="w-10 h-4" />
              </div>
            </TableHead>

            <TableHead className="text-center font-bold">Reactions</TableHead>

            <TableHead
              className="cursor-pointer text-center font-bold"
              onClick={() => handleSort('totalShares')}
            >
              <div className="flex items-center justify-center gap-1">
                Shares <ArrowUpDown className="w-4 h-4" />
              </div>
            </TableHead>

            <TableHead
              className="cursor-pointer text-center font-bold min-w-[120px]"
              onClick={() => handleSort('prepTime')}
            >
              <div className="flex items-center justify-center gap-1">
                Prep time
                <ArrowUpDown className="w-4 h-4" />
              </div>
            </TableHead>

            <TableHead
              className="cursor-pointer text-center font-bold min-w-[120px]"
              onClick={() => handleSort('cookTime')}
            >
              <div className="flex items-center justify-center gap-1">
                Cook time
                <ArrowUpDown className="w-4 h-4" />
              </div>
            </TableHead>

            <TableHead
              className="cursor-pointer text-center font-bold"
              onClick={() => handleSort('createdAt')}
            >
              <div className="flex items-center justify-center gap-1">
                Created <ArrowUpDown className="w-4 h-4" />
              </div>
            </TableHead>

            <TableHead className="text-center font-bold">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {sortedPosts.map((p, index) => (
            <TableRow key={p.id} className="text-center">
              <TableCell>{index + 1}</TableCell>

              <TableCell>
                <img
                  src={p.imageUrl}
                  className="w-20 h-20 object-cover rounded-md"
                />
              </TableCell>

              <TableCell className="font-semibold">{p.title}</TableCell>

              <TableCell>
                <div className="flex items-center justify-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={p.avatarUrl} />
                    <AvatarFallback>
                      {p.username?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>{p.username}</div>
                </div>
              </TableCell>

              <TableCell className="font-semibold max-w-[200px] truncate">
                {p.content}
              </TableCell>

              <TableCell>{p.region}</TableCell>

              <TableCell>
                <span
                  className={`px-2 py-1 rounded text-xs ${difficultyColor[p.difficulty] || 'bg-gray-300'}`}
                >
                  {p.difficulty}
                </span>
              </TableCell>

              <TableCell>
                <span
                  className={`px-2 py-1 rounded text-xs ${statusColor[p.status] || 'bg-gray-300'}`}
                >
                  {statusText[p.status]}
                </span>
              </TableCell>

              <TableCell>
                {Object.entries(p.reactionCounts ?? {}).map(([k, v]) => {
                  const count = v ?? 0;
                  return (
                    <div
                      key={k}
                      className="text-sm flex items-center justify-center gap-1"
                    >
                      {reactionIcons[k] ?? null} {count}
                    </div>
                  );
                })}
              </TableCell>

              <TableCell>{p.totalShares ?? 0}</TableCell>

              <TableCell>{p.prepTime ?? 0} min</TableCell>

              <TableCell>{p.cookTime ?? 0} min</TableCell>

              <TableCell>
                {new Date(p.createdAt).toLocaleDateString()}
              </TableCell>

              <TableCell>
                <div className="flex gap-2 justify-center">
                  <Button
                    onClick={() => onEdit(p)}
                    variant="outline"
                    size="icon"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button onClick={() => onDelete(p)} variant="destructive" size="icon">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
