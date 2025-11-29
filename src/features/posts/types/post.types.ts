export interface PostItem {
  id: number;
  content: string;
  title: string;
  username: string;
  email: string;
  avatarUrl: string;
  imageUrl: string;
  region: string;
  difficulty: Difficulty;
  prepTime: number;
  cookTime: number;
  recipeCategories: string[];
  reactionCounts: Record<string, number>;
  totalShares: number;
  recipeId: number;
  description: string;
  status: string;
  createdAt: Date;
}

export interface PostQueryParams {
  keyword?: string;
  userId?: number;
  region?: string;
  difficulty?: string;
  category?: string;
  minPrepTime?: number;
  maxPrepTime?: number;
  maxCookTime?: number;
  minCookTime?: number;
  minReactionCount?: number;
  minTotalShares?: number;
  status?: string;
  sortBy?: string;
  page?: number;
  size?: number;
}

export interface PostPageResponse {
  message: string;
  data: {
    content: PostItem[];
    totalPages: number;
    totalElements: number;
    number: number;
    size: number;
  };
}

export interface PostCreateUpdateRequest {
  id: number;
  content: string;
  status: string;
}

export interface PostPublishResponse {
  id: number;
  recipeId: number;
  userId: number;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: Date;

  difiiculty: string;
  location: string;
  prepTime: string;
  cookTime: string;
  countReaction: number;
  countComment: number;
  status: string;
}

export type Difficulty = 'HARD' | 'MEDIUM' | 'EASY';
