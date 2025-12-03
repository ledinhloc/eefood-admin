export interface ResponseData<T> {
  status: number;
  message: string;
  data?: T;
}

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  role: 'USER' | 'ADMIN';
  provider: 'GOOGLE' | 'NORMAL';
  avatarUrl?: string;
  allergies?: string[];
  eatingPreferences?: string[];
  dietaryPreferences?: string[];
  createdAt?: string;
}

export interface UserPageResponse {
  content: UserResponse[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface UserQueryParams {
  page: number;
  size: number;
  search?: string;
  role?: string;
  provider?: string;
  sortBy?: string;
  direction?: 'asc' | 'desc';
}
