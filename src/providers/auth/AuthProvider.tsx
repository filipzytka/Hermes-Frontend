import { useEffect, useState } from "react";
import { AuthenticateUser } from "../../services/user-service";
import AuthContext from "../../context/auth";

type Props = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    const isUserAuth = async () => {
      setLoading(true);
      try {
        const currentUser = await AuthenticateUser();

        if (currentUser) {
          setAuth(currentUser.success);
          setRole(currentUser.role);
        } else {
          setAuth(false);
        }
      } catch (error) {
        setAuth(false);
      } finally {
        setLoading(false);
      }
    };

    isUserAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, loading, setLoading, role, setRole }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
