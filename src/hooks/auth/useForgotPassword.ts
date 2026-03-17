import { useMutation } from "@tanstack/react-query";
import { forgotPasswordApi } from "../../api/auth/auth.api";
import type { ForgotPasswordRequest } from "../../api/auth/auth.types";

export function useForgotPassword() {
  return useMutation({
    mutationFn: async (payload: ForgotPasswordRequest) => {
      const response = await forgotPasswordApi(payload);
      return response.data;
    },
  });
}