export interface Address {
  city: string;
  street: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  dob?: string;
  gender?: string;
  address?: Address;
  provider?: string;
  avatarUrl?: string;
  backgroundUrl?: string;
  allergies?: string[];
  eatingPreferences?: string[];
  dietaryPreferences?: string[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: number; // 200
  message: string; // "Success"
  data: User & {
    accessToken: string;
    refreshToken: string;
  };
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface RegisterResponse {
  status: number;
  message: string;
  data: User;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  role: Role;
}

export interface VerifyOtpRequest {
  email: string;
  otpCode: string;
  otpType: 'REGISTER' | 'FORGOT_PASSWORD' | string;
}

export interface VerifyOtpResponse {
  message: string;
}

export const Role = {
  ADMIN: 'ADMIN',
  USER: 'USER',
} as const;

export type Role = (typeof Role)[keyof typeof Role];
