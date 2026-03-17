import { useMutation } from "@tanstack/react-query";
import { registerApi } from "../../api/auth/auth.api";
import type { RegisterRequest } from "../../api/auth/auth.types";

export function useRegister() {
  return useMutation({
    mutationFn: async (payload: RegisterRequest) => {
      const response = await registerApi(payload);
      return response.data;
    },
  });
}