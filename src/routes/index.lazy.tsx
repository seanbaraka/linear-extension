import { Navigate, createLazyFileRoute } from "@tanstack/react-router";
import { useAuth } from "../hooks/userAuth";

function Index() {
  // First check if we have an active session,
  const { session } = useAuth();
  // If we don't have a session recorded, prompt the user to login
  if (!session) {
    // navigate({ to: "/login" }).catch((e) => console.log("Fuck", e.message));
    return <Navigate to="/login" />;
  }

  return (
    <>
      <h1>You hare logged in</h1>
    </>
  );
}

export const Route = createLazyFileRoute("/")({
  component: Index,
});
