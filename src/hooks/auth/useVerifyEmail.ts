import { useMutation } from "@tanstack/react-query";
import { verifyEmailApi } from "../../api/auth/auth.api";
import type { VerifyEmailRequest } from "../../api/auth/auth.types";

export function useVerifyEmail() {
  return useMutation({
    mutationFn: async (payload: VerifyEmailRequest) => {
      const response = await verifyEmailApi(payload);
      return response.data;
    },
  });
}