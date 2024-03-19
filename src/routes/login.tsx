import { Auth } from "@supabase/auth-ui-react";
import { createFileRoute } from "@tanstack/react-router";
import { Navigate } from "@tanstack/react-router";
import { useAuthContext } from "../hooks/userAuth";
import { supabase } from "../utils";

function Login() {
  const { session } = useAuthContext();

  if (!session) {
    return (
      <section className="m-auto flex min-h-screen w-full max-w-screen-md items-center justify-center px-8 py-4">
        <div className="">
          <h1 className="my-2 text-center text-3xl font-light">
            Out goes Linear, in with TLinear
          </h1>
          <Auth
            providers={["github", "google"]}
            onlyThirdPartyProviders
            localization={{
              variables: {
                sign_in: {
                  social_provider_text: "Continue with {{provider}}",
                },
              },
            }}
            appearance={{
              extend: false,
              className: {
                container: "flex flex-col gap-4 w-full max-w-screen-sm m-auto",
                button:
                  "justify-center gap-2 text-sm p-2 border border-gray-400 text-white rounded-lg flex items-center",
              },
            }}
            supabaseClient={supabase}
          />
        </div>
      </section>
    );
  } else {
    // Assuming we have an active session, proceed to the dashboard
    return <Navigate to="/" />;
  }
}

export const Route = createFileRoute("/login")({
  component: Login,
});
