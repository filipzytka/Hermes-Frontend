import { useContext } from "react";
import AuthContext from "../providers/auth/AuthProvider";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("The hook must be used within a Context Provider");
  }
  return context;
};
