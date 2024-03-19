import { useContext } from "react";
import { AuthContext } from "../context/auth";

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("You need to use this under the AuthContext Provider");
  }
  return context;
}
