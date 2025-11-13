import { isValidGender, type Gender } from "@/features/auth/types/auth.types.ts";

export const normalizeGender = (value?: string | null): Gender => {
  if (!value) return 'OTHER';
  const upper = value.toString().toUpperCase();
  return isValidGender(upper) ? upper : 'OTHER';
};
