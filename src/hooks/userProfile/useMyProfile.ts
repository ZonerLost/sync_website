import { useQuery } from "@tanstack/react-query";
import { getMyProfileApi } from "../../api/users/user.api";
import { queryKeys } from "../../api/core/queryKeys";

export function useMyProfile() {
  return useQuery({
    queryKey: queryKeys.users.me,
    queryFn: getMyProfileApi,
    staleTime: 1000 * 60 * 5,
  });
}