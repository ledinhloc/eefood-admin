export interface ResponseData<T> {
  status: number;
  message: string;
  data?: T;
}

export interface AdminUpdateRequest {
  id: number;
  role: 'USER' | 'ADMIN';
}

export interface UserUpdateRequest {
  id: number;
  username?: string;
  email?: string;
  dob?: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  address?: Record<string, any>;
  avatarUrl?: string;
  backgroundUrl?: string;
  allergies?: string[];
  eatingPreferences?: string[];
  dietaryPreferences?: string[];
}


export interface UserCreateRequest {
  username: string;
  email: string;
  role: 'USER' | 'ADMIN';
  dob?: string; // ISO string
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  address?: Record<string, any>; // JSON object
  provider: 'GOOGLE' | 'NORMAL';
  avatarUrl?: string;
  password: string;
  allergies?: string[];
  eatingPreferences?: string[];
  dietaryPreferences?: string[];
}

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  role: 'USER' | 'ADMIN';
  provider: 'GOOGLE' | 'NORMAL';
  avatarUrl?: string;
  backgroundUrl?: string;
  allergies?: string[];
  eatingPreferences?: string[];
  dietaryPreferences?: string[];
  dob?: string; // ISO string
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  address?: Record<string, any>; // JSON object
  createdAt?: string; // ISO string
  updatedAt?: string; // ISO string
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
  role?: 'USER' | 'ADMIN';
  provider?: 'GOOGLE' | 'NORMAL';
  sortBy?: 'username' | 'email' | 'createdAt';
  direction?: 'asc' | 'desc';
}