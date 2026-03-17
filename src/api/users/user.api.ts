import { http } from "../core/http";
import type {
  ChangePasswordInput,
  ChangePasswordResponse,
  UpdateMyProfileInput,
  UserMeResponse,
  UserProfileVM,
} from "./user.types";

function mapUserProfile(data: UserMeResponse["data"]): UserProfileVM {
  return {
    id: data._id,
    fullName: data.fullName || "",
    email: data.email || "",
    phone: data.phone || "",
    role: data.role || "",
    photoUrl: data.photoUrl || "",
    accountStatus: data.accountStatus || "",
  };
}

export async function getMyProfileApi(): Promise<UserProfileVM> {
  const { data } = await http.get<UserMeResponse>("/users/me");
  return mapUserProfile(data.data);
}

export async function updateMyProfileApi(
  payload: UpdateMyProfileInput
): Promise<UserProfileVM> {
  const formData = new FormData();
  formData.append("fullName", payload.fullName);
  formData.append("email", payload.email);
  formData.append("phone", payload.phone);

  if (payload.photo) {
    formData.append("photo", payload.photo);
  }

  const { data } = await http.patch<UserMeResponse>("/users/me", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return mapUserProfile(data.data);
}

export async function changePasswordApi(payload: ChangePasswordInput) {
  const { data } = await http.post<ChangePasswordResponse>(
    "/auth/change-password",
    payload
  );

  return data.data;
}