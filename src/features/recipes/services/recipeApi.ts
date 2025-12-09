import { api } from '@/core/api/api.ts';
import {
  type CategoryPageRequest,
  type CategoryPageResponse,
  type RecipePageResponse,
  type RecipeQueryParams,
  type RecipeResponse,
} from '@/features/recipes/types/recipe.types.ts';
import type { ResponseData } from '@/features/users/types/user.types.ts';

export const recipeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getRecipeById: builder.query<RecipeResponse, number>({
      query: (id) => ({
        url: `/recipes/${id}`,
        method: 'GET',
      }),
      providesTags: ['Recipes'],
    }),
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

export const {
  useLazyGetRecipeByIdQuery,
  useGetCategoriesQuery,
  useGetRecipesQuery,
} = recipeApi;
