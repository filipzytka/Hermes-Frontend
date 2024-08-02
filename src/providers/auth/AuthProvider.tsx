import { useEffect, useState } from "react";
import { AuthenticateUser } from "../../services/user-service";
import AuthContext from "../../context/auth";

type Props = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const isUserAuth = async () => {
      const currentUser = await AuthenticateUser();
      setAuth(currentUser);
      setLoading(false);
    };

    isUserAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
