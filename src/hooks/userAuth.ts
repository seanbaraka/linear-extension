import { Session, createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const supabase = createClient(
  "https://mnrfhdaaccnpcqdhwkgx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ucmZoZGFhY2NucGNxZGh3a2d4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA3MDM0NzAsImV4cCI6MjAyNjI3OTQ3MH0.0T0dyk24gX8CyQPV9ABEeTAFOhbhhKc2uBRvDmpqTJA",
);

export const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setSession(session);
      })
      .catch((er: any) => console.log("An error occured", er.message));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { session, supabase };
};
