import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { api, type User } from "./api/client";

interface AuthCtx {
  user: User | null;
  loading: boolean;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
  setUser: (u: User | null) => void;
}

const Ctx = createContext<AuthCtx>({
  user: null,
  loading: true,
  refresh: async () => {},
  logout: async () => {},
  setUser: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      const { data } = await api.get("/auth/profile");
      setUser(data.user ?? data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {}
    setUser(null);
  };

  useEffect(() => {
    if (typeof window !== "undefined") refresh();
  }, []);

  return (
    <Ctx.Provider value={{ user, loading, refresh, logout, setUser }}>{children}</Ctx.Provider>
  );
}

export const useAuth = () => useContext(Ctx);
