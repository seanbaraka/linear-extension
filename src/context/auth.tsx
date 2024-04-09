import { ReactNode } from "@tanstack/react-router";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { LinearClient } from "@linear/sdk";

interface AuthUser {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
  linearClient: LinearClient | null;
}

export const AuthContext = createContext<AuthUser | null>(null);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState("");
  const [linearClient, setLinearClient] = useState<LinearClient | null>(null);

  useEffect(() => {
    if (linearClient) return;
    const token = localStorage.getItem("linearToken");
    if (!token) return;
    const client = new LinearClient({
      accessToken: token,
    });
    setLinearClient(client);
  }, [linearClient]);

  const value = useMemo(
    () => ({
      user,
      setUser,
      linearClient,
    }),
    [user, setUser, linearClient],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
