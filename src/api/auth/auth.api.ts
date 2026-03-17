import { http } from "../core/http";
import type {
  ApiResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponseData,
  LoginRequest,
  LoginResponseData,
  RegisterRequest,
  RegisterResponseData,
  ResendVerificationRequest,
  ResetPasswordRequest,
  ResetPasswordResponseData,
  VerifyEmailRequest,
  VerifyEmailResponseData,
} from "./auth.types";

export async function loginApi(payload: LoginRequest) {
  const { data } = await http.post<ApiResponse<LoginResponseData>>(
    "/auth/login",
    payload
  );
  return data;
}

export async function registerApi(payload: RegisterRequest) {
  const { data } = await http.post<ApiResponse<RegisterResponseData>>(
    "/auth/register",
    payload
  );
  return data;
}

export async function verifyEmailApi(payload: VerifyEmailRequest) {
  const { data } = await http.post<ApiResponse<VerifyEmailResponseData>>(
    "/auth/verify-email",
    payload
  );
  return data;
}

export async function resendVerificationApi(payload: ResendVerificationRequest) {
  const { data } = await http.post<ApiResponse<{ message: string }>>(
    "/auth/resend-verification",
    payload
  );
  return data;
}

export async function forgotPasswordApi(payload: ForgotPasswordRequest) {
  const { data } = await http.post<ApiResponse<ForgotPasswordResponseData>>(
    "/auth/forgot-password",
    payload
  );
  return data;
}

export async function resetPasswordApi(payload: ResetPasswordRequest) {
  const { data } = await http.post<ApiResponse<ResetPasswordResponseData>>(
    "/auth/reset-password",
    payload
  );
  return data;
}