/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type {
  AuthSession,
  AuthState,
  AuthUser,
  LoginRequest,
} from "../api/auth/auth.types";
import { createAuthState, mapUser } from "../api/auth/auth.helpers";
import {
  clearStoredAuth,
  getStoredAuth,
  setStoredAuth,
} from "../api/core/storage";
import { useLogin } from "../hooks/auth/useLogin";

type LoginArgs = LoginRequest;

type AuthContextValue = {
  auth: AuthState;
  login: (args: LoginArgs) => Promise<AuthUser | null>;
  logout: () => void;
  setSession: (session: AuthSession | null) => void;
  isLoggingIn: boolean;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    token: null,
    user: null,
    isHydrated: false,
  });

  const loginMutation = useLogin();

  useEffect(() => {
    const stored = getStoredAuth();

    if (!stored?.token) {
      setAuth({
        isAuthenticated: false,
        token: null,
        user: null,
        isHydrated: true,
      });
      return;
    }

    setAuth(
      createAuthState({
        token: stored.token,
        user: stored.user,
      })
    );
  }, []);

  const setSession = (session: AuthSession | null) => {
    if (!session?.token) {
      clearStoredAuth();
      setAuth({
        isAuthenticated: false,
        token: null,
        user: null,
        isHydrated: true,
      });
      return;
    }

    const normalizedSession: AuthSession = {
      token: session.token,
      user: session.user ? mapUser(session.user) : null,
    };

    setStoredAuth({
      token: normalizedSession.token,
      user: normalizedSession.user,
    });

    setAuth(createAuthState(normalizedSession));
  };

  const login = async (args: LoginArgs): Promise<AuthUser | null> => {
    const result = await loginMutation.mutateAsync(args);

    const session = {
      token: result.token,
      user: mapUser(result.user),
    };

    if (args.rememberMe) {
      setStoredAuth({
        token: session.token,
        user: session.user,
      });
    } else {
      clearStoredAuth();
    }

    setAuth({
      isAuthenticated: true,
      token: session.token,
      user: session.user,
      isHydrated: true,
    });

    return session.user;
  };

  const logout = () => {
    clearStoredAuth();
    setAuth({
      isAuthenticated: false,
      token: null,
      user: null,
      isHydrated: true,
    });
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      auth,
      login,
      logout,
      setSession,
      isLoggingIn: loginMutation.isPending,
    }),
    [auth, loginMutation.isPending]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return ctx;
};
