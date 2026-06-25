"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { MOCK_ACCOUNT, type MockAccount } from "./mock";
import { isMock, fetchMe, loginWithGoogle, getToken, setToken, clearToken } from "./api";

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://3.144.114.30:3000";

interface AuthContextValue {
  user: MockAccount | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signUp: (email: string, password: string, websiteUrl: string, platform: string) => Promise<void>;
  signInWithGoogle: (credential: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isLoading: true,
  login: async () => {},
  logout: () => {},
  signUp: async () => {},
  signInWithGoogle: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockAccount | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isMock) {
      const stored = sessionStorage.getItem("blockme_user");
      if (stored) setUser(JSON.parse(stored));
      setIsLoading(false);
      return;
    }

    const token = getToken();
    if (!token) {
      setIsLoading(false);
      return;
    }
    fetchMe()
      .then((u) => setUser(u as MockAccount))
      .catch(() => clearToken())
      .finally(() => setIsLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    if (isMock) {
      await new Promise((r) => setTimeout(r, 800));
      const account = { ...MOCK_ACCOUNT, email };
      setUser(account);
      sessionStorage.setItem("blockme_user", JSON.stringify(account));
      setToken("mock");
      return;
    }

    const res = await fetch(`${BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Invalid credentials");
    const { token, user: userData } = await res.json();
    setToken(token);
    setUser(userData as MockAccount);
  };

  const signInWithGoogle = async (credential: string) => {
    if (isMock) {
      await new Promise((r) => setTimeout(r, 600));
      const account = { ...MOCK_ACCOUNT, email: "you@gmail.com" };
      setUser(account);
      sessionStorage.setItem("blockme_user", JSON.stringify(account));
      setToken("mock");
      return;
    }
    const { token, user: userData } = await loginWithGoogle(credential);
    setToken(token);
    setUser(userData as MockAccount);
  };

  const logout = () => {
    setUser(null);
    if (isMock) sessionStorage.removeItem("blockme_user");
    clearToken();
  };

  const signUp = async (email: string, password: string, websiteUrl: string, platform: string) => {
    if (isMock) {
      await new Promise((r) => setTimeout(r, 800));
      const account = { ...MOCK_ACCOUNT, email, websiteUrl, platform };
      setUser(account);
      sessionStorage.setItem("blockme_user", JSON.stringify(account));
      setToken("mock");
      return;
    }
    const res = await fetch(`${BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, websiteUrl, platform }),
    });
    if (res.status === 409) throw new Error("Email already registered");
    if (!res.ok) throw new Error("Registration failed");
    const { token, user: userData } = await res.json();
    setToken(token);
    setUser(userData as MockAccount);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, signUp, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
