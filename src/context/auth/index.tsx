import { createContext } from "react";

type AuthContextType = {
  auth: boolean | null;
  setAuth: (auth: boolean | null) => void;
  role: string;
  setRole: (role: string) => void;
  email: string;
  setEmail: (email: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
