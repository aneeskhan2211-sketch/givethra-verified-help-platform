import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { type ReactNode, createContext, useContext } from "react";

export type UserRole = "hero" | "help_seeker" | "admin" | null;

interface AuthContextValue {
  isAuthenticated: boolean;
  isInitializing: boolean;
  isLoggingIn: boolean;
  login: () => void;
  logout: () => void;
  role: UserRole;
  setRole: (role: UserRole) => void;
  isHero: boolean;
  isHelpSeeker: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// Persist role in localStorage keyed by auth state
const ROLE_KEY = "givethra_role";

export function AuthProvider({ children }: { children: ReactNode }) {
  const { login, clear, isAuthenticated, isInitializing, loginStatus } =
    useInternetIdentity();
  const queryClient = useQueryClient();

  const storedRole = (localStorage.getItem(ROLE_KEY) as UserRole) ?? null;

  const setRole = (role: UserRole) => {
    if (role) localStorage.setItem(ROLE_KEY, role);
    else localStorage.removeItem(ROLE_KEY);
  };

  const handleLogout = () => {
    clear();
    queryClient.clear();
    localStorage.removeItem(ROLE_KEY);
  };

  const role: UserRole = isAuthenticated ? storedRole : null;

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isInitializing,
        isLoggingIn: loginStatus === "logging-in",
        login,
        logout: handleLogout,
        role,
        setRole,
        isHero: role === "hero",
        isHelpSeeker: role === "help_seeker",
        isAdmin: role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
