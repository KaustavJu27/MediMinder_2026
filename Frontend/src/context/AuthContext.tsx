import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { AuthAPI } from "@/services/api";


export interface User {
  id: string;
  name: string;
  email: string;
  token?: string;
  avatar?: string;
}

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (patch: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const STORAGE_KEY = "mers_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
    setLoading(false);
  }, []);

  const persist = (u: User | null) => {
    setUser(u);
    if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    else localStorage.removeItem(STORAGE_KEY);
  };

  const login = async (email: string, password: string) => {
  const res = await AuthAPI.login({
    email,
    password,
  });

  const data = res.data;

  persist({
    id: data.user.id,
    name: data.user.name,
    email: data.user.email,
    token: data.token,
  } as any);
};

  const register = async (
  name: string,
  email: string,
  password: string
) => {
  // await AuthAPI.register({
  //   name,
  //   email,
  //   password,
  // });

  const res = await AuthAPI.register({
  name,
  email,
  password,
});

console.log(res.data);

  await login(email, password);
};

  const logout = () => persist(null);
  const updateUser = (patch: Partial<User>) => {
    if (!user) return;
    persist({ ...user, ...patch });
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, loading, login, register, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
