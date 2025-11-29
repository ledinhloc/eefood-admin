import type { Difficulty } from '@/features/posts/types/post.types.ts';

export interface CategoryResponse {
  id: number;
  description: string;
  iconUrl: string;
}

export interface IngredientResponse {
  id: number;
  name: string;
  imageUrl: string;
}

export interface StepResponse {
  id: number;
  stepNumber: number;
  instruction: string;
  imageUrls: string[];
  videoUrls: string[];
  stepTime: number;
}

export interface RecipeIngredientResponse {
  id: number;
  quantity: number;
  unit: string;
  ingredient: IngredientResponse;
}

export interface CategoryPageRequest {
  name?: string;
  page?: number;
  limit?: number;
}

export interface CategoryPageResponse {
  message: string;
  data: {
    content: CategoryResponse[];
    totalPages: number;
    totalElements: number;
    number: number;
    size: number;
  };
}

export interface RecipePageResponse {
  message: string;
  data: {
    content: RecipeResponse[];
    totalPages: number;
    totalElements: number;
    number: number;
    size: number;
  };
}

export interface RecipeResponse {
  id: number;
  title: string;
  description: string;
  region: string;
  imageUrl: string;
  videoUrl: string;
  prepTime: number;
  cookTime: number;
  difficulty: Difficulty;

  categories: CategoryResponse[];
  steps: StepResponse[];
  ingredients: RecipeIngredientResponse[];
}

export interface RecipeQueryParams {
  title?: string;
  categoryId?: number;
  description?: string;
  difficulty?: string;
  region?: string;
  sortBy?: string;
  page?: number;
  size?: number;
}