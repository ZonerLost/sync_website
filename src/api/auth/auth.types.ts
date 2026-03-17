export type UserRole = "owner" | "admin" | "operator" | "engineer";

export type AuthUser = {
  id: string;
  role: UserRole | string;
  fullName: string;
  email: string;
  phone?: string;
  photoUrl?: string;
  emailVerifiedAt?: string | null;
  accountStatus?: string;
  code?: string;
};

export type ApiResponse<T> = {
  status: "success" | "error";
  data: T;
};

export type LoginRequest = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export type LoginResponseData = {
  token: string;
  user: AuthUser;
};

export type RegisterRequest = {
  email: string;
  password: string;
  fullName: string;
  phone: string;
  role: UserRole | string;
};

export type RegisterResponseData = {
  message: string;
  user: {
    id: string;
    email: string;
    role: string;
    fullName: string;
  };
};

export type VerifyEmailRequest = {
  email: string;
  code: string;
};

export type VerifyEmailResponseData = {
  message: string;
  token: string;
  user: AuthUser;
};

export type ResendVerificationRequest = {
  email: string;
};

export type ForgotPasswordRequest = {
  email: string;
};

export type ForgotPasswordResponseData = {
  message: string;
};

export type ResetPasswordRequest = {
  token: string;
  newPassword: string;
};

export type ResetPasswordResponseData = {
  message: string;
};

export type AuthSession = {
  token: string;
  user: AuthUser | null;
};

export type AuthState = {
  isAuthenticated: boolean;
  token: string | null;
  user: AuthUser | null;
  isHydrated: boolean;
};