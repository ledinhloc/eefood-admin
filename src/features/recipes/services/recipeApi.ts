import { api } from '@/core/api/api.ts';
import type {
  CategoryPageRequest,
  CategoryPageResponse,
  RecipePageResponse,
  RecipeQueryParams,
} from '@/features/recipes/types/recipe.types.ts';

export const recipeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<CategoryPageResponse, CategoryPageRequest>({
      query: (params) => ({
        url: '/categories',
        method: 'GET',
        params: params as Record<string, unknown>,
      }),
      providesTags: ['Categories'],
    }),
    getRecipes: builder.query<RecipePageResponse, RecipeQueryParams>({
      query: (params) => ({
        url: '/recipes/my',
        method: 'GET',
        params: params as Record<string, unknown>,
      }),
      providesTags: ['Recipes'],
    }),
  }),
});

export const { useGetCategoriesQuery, useGetRecipesQuery } = recipeApi;
