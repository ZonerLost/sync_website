import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../../api/auth/auth.api";
import type { LoginRequest } from "../../api/auth/auth.types";

export function useLogin() {
  return useMutation({
    mutationFn: async (payload: LoginRequest) => {
      const response = await loginApi(payload);
      return response.data;
    },
  });
}