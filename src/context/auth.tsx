import { Session } from "@supabase/supabase-js";
import { ReactNode } from "@tanstack/react-router";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { supabase } from "../utils";

interface AuthUser {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
  session: Session | undefined;
}

export const AuthContext = createContext<AuthUser | null>(null);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState("");
  const [session, setSession] = useState<Session>();

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        if (session) {
          setUser(session.user.id);
          setSession(session);
        }
      })
      .catch((er: any) => {
        console.log("An error occured", er.message);
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setSession(undefined);
      } else {
        if (session) {
          setUser(session.user.id);
          setSession(session);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const value = useMemo(
    () => ({
      user,
      setUser,
      session,
    }),
    [user, setUser, session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
