import { useMutation } from "@tanstack/react-query";
import { changePasswordApi } from "../../api/users/user.api";
import type { ChangePasswordInput } from "../../api/users/user.types";

export function useChangePassword() {
  return useMutation({
    mutationFn: (payload: ChangePasswordInput) => changePasswordApi(payload),
  });
}