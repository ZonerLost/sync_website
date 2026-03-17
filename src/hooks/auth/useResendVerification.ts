import { useMutation } from "@tanstack/react-query";
import { resendVerificationApi } from "../../api/auth/auth.api";
import type { ResendVerificationRequest } from "../../api/auth/auth.types";

export function useResendVerification() {
  return useMutation({
    mutationFn: async (payload: ResendVerificationRequest) => {
      const response = await resendVerificationApi(payload);
      return response.data;
    },
  });
}