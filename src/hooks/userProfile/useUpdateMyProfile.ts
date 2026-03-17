import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMyProfileApi } from "../../api/users/user.api";
import { queryKeys } from "../../api/core/queryKeys";
import type { UpdateMyProfileInput } from "../../api/users/user.types";

export function useUpdateMyProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateMyProfileInput) => updateMyProfileApi(payload),
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(queryKeys.users.me, updatedProfile);
    },
  });
}