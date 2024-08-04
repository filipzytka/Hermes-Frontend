import { createContext } from "react";

type AuthContextType = {
  auth: boolean;
  setAuth: (auth: boolean) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  role: string;
  setRole: (role: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
