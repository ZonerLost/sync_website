export type UserMeResponse = {
  status: "success" | "error";
  data: {
    _id: string;
    email: string;
    role: string;
    fullName: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    companyId?: string | null;
    salaryProfilePercent?: number;
    accountStatus?: string;
    code?: string;
    status?: string;
    deviceId?: string;
    photoUrl?: string;
    pushTokens?: string[];
    emailVerifiedAt?: string | null;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
  };
};

export type UpdateMyProfileInput = {
  fullName: string;
  email: string;
  phone: string;
  photo?: File | null;
};

export type ChangePasswordInput = {
  currentPassword: string;
  newPassword: string;
};

export type ChangePasswordResponse = {
  status: "success" | "error";
  data: {
    message: string;
  };
};

export type UserProfileVM = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  photoUrl: string;
  accountStatus: string;
};