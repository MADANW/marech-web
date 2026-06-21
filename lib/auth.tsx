"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { MOCK_ACCOUNT, type MockAccount } from "./mock";

interface AuthContextValue {
  user: MockAccount | null;
  isLoading: boolean;
  login: (email: string, _password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isLoading: true,
  login: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockAccount | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem("blockme_user");
    if (stored) setUser(JSON.parse(stored));
    setIsLoading(false);
  }, []);

  const login = async (_email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 800));
    const account = { ...MOCK_ACCOUNT, email: _email };
    setUser(account);
    sessionStorage.setItem("blockme_user", JSON.stringify(account));
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("blockme_user");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
