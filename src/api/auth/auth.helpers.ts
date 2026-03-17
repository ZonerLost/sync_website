import type { AuthSession, AuthState, AuthUser } from "./auth.types";

export function createAuthState(session: AuthSession | null): AuthState {
  return {
    isAuthenticated: Boolean(session?.token),
    token: session?.token ?? null,
    user: session?.user ?? null,
    isHydrated: true,
  };
}

export function mapUser(user: AuthUser): AuthUser {
  return {
    id: user.id,
    role: user.role,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone || "",
    photoUrl: user.photoUrl || "",
    emailVerifiedAt: user.emailVerifiedAt ?? null,
    accountStatus: user.accountStatus || "",
    code: user.code || "",
  };
}