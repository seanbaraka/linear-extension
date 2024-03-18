import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "../hooks/userAuth";

function Index() {
  // First check if we have an active session,
  const { session } = useAuth();

  // If we don't have a session recorded, prompt the user to login
  if (!session) {
    // navigate({ to: "/login" }).catch((e) => console.log("Fuck", e.message));
    // return null;
    // return <Navigate to="/login" />;
    return <div className="text-red-500">Not Logged In</div>;
  } else {
    return (
      <>
        <h1>You are logged in {session.user.email}</h1>
      </>
    );
  }
}

export const Route = createFileRoute("/")({
  component: Index,
});
