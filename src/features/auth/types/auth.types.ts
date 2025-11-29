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
  gender?: Gender;
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
  email: string | null;
  otpType: 'REGISTER' | 'FORGOT_PASSWORD' | null;
  otpCode: string | null;
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

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface ResetPasswordRequest {
  email: string;
  otp: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  message: string;
}

export interface ProfileResponse {
  message: string;
  data: User;
}

export interface UpdateProfileResponse {
  message: string;
  data: User;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  status: number;
  message: string;
  data: {
    access_token: string;
    expires_in: number;
    refresh_expires_in: number;
    refresh_token: string;
    token_type: string;
    session_state: string;
    scope: string;
  };
}

export type Role = (typeof Role)[keyof typeof Role];
export type UpdateProfileRequest = Partial<Omit<User, 'role'>>;

export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export const isValidGender = (value: string | undefined): value is Gender =>
  value === 'MALE' || value === 'FEMALE' || value === 'OTHER';
