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
  createdAt: string;
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

type Difficulty = 'HARD' | 'MEDIUM' | 'EASY';
