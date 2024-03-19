import { createClient } from "@supabase/supabase-js";

export const SB_APP_ID = "mnrfhdaaccnpcqdhwkgx";

export const supabase = createClient(
  "https://mnrfhdaaccnpcqdhwkgx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ucmZoZGFhY2NucGNxZGh3a2d4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA3MDM0NzAsImV4cCI6MjAyNjI3OTQ3MH0.0T0dyk24gX8CyQPV9ABEeTAFOhbhhKc2uBRvDmpqTJA",
);
