const AUTH_STORAGE_KEY = "zonerlost-admin-auth";

export type StoredAuthUser = {
  id: string;
  role: string;
  fullName: string;
  email: string;
  phone?: string;
  photoUrl?: string;
  emailVerifiedAt?: string | null;
  accountStatus?: string;
  code?: string;
};

export type StoredAuthState = {
  token: string;
  user: StoredAuthUser | null;
};

export function getStoredAuth(): StoredAuthState | null {
  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as StoredAuthState;

    if (!parsed?.token) return null;
    return parsed;
  } catch (error) {
    console.error("Failed to read auth storage", error);
    return null;
  }
}

export function setStoredAuth(auth: StoredAuthState): void {
  try {
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
  } catch (error) {
    console.error("Failed to write auth storage", error);
  }
}

export function clearStoredAuth(): void {
  try {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear auth storage", error);
  }
}

export function getAccessToken(): string | null {
  return getStoredAuth()?.token ?? null;
}