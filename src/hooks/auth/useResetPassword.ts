import { useMutation } from "@tanstack/react-query";
import { resetPasswordApi } from "../../api/auth/auth.api";
import type { ResetPasswordRequest } from "../../api/auth/auth.types";

export function useResetPassword() {
  return useMutation({
    mutationFn: async (payload: ResetPasswordRequest) => {
      const response = await resetPasswordApi(payload);
      return response.data;
    },
  });
}