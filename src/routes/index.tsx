import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuthContext } from "../hooks/userAuth";
import { supabase } from "../utils";

function Index() {
  // First check if we have an active session
  const { session } = useAuthContext();

  const navigate = useNavigate();
  // If we don't have a session recorded, prompt the user to login
  if (!session) {
    return (
      <div className="flex h-dvh flex-col items-center justify-center">
        <p className="my-4 text-xl">Oopsie, you need to log back in</p>
        <Link to="/login" className="rounded-md bg-zinc-800 px-8 py-2 text-sm">
          Let's Go
        </Link>
      </div>
    );
  } else {
    return (
      <>
        <h1>You are logged in {session.user.email}</h1>
        <button
          className="my-4 bg-zinc-800 px-4 py-2 text-sm"
          onClick={async () => {
            await supabase.auth.signOut();
            await navigate({ to: "/login" });
          }}
        >
          Logout then
        </button>
      </>
    );
  }
}

export const Route = createFileRoute("/")({
  component: Index,
});
