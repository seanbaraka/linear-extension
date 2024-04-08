import { Auth } from "@supabase/auth-ui-react";
import { createFileRoute } from "@tanstack/react-router";
import { Navigate } from "@tanstack/react-router";
import { useAuthContext } from "../hooks/userAuth";
import { supabase } from "../utils";
import { clientId, redirectUrl } from "../hooks/linear";

function Login() {
  const { session } = useAuthContext();

  if (!session) {
    return (
      <section className="m-auto flex min-h-screen w-full max-w-screen-md items-center justify-center px-8 py-4">
        <div className="flex flex-col">
          <h1 className="my-8 text-2xl font-500">Hey there, How are you ?</h1>
          <p className="text-left text-base font-400">
            Building software is not easy, but creating, managing and tracking
            the items on the roadmap should be at least easier.
          </p>
          <p className="mt-10 text-left text-base font-400 mb-4">
            Alright, let’s get you started.
          </p>
          <div className="flex my-4 flex-col gap-4 w-full max-w-screen-sm m-auto">
            <a
              href={
                "https://linear.app/oauth/authorize?client_id=" +
                clientId +
                "&redirect_uri=" +
                redirectUrl +
                "&response_type=code&scope=read,write"
              }
              className="justify-center gap-2 text-sm p-2 border border-gray-400 text-white rounded-lg flex items-center"
            >
              Continue with Linear
            </a>
          </div>
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
