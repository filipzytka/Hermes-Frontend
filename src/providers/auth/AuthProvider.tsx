import { useEffect, useState } from "react";
import AuthContext from "../../context/auth";
import { authenticateUser } from "../../api/auth";

type Props = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [role, setRole] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const isUserAuth = async () => {
      setLoading(true);
      try {
        const response = await authenticateUser();

        if (response) {
          setAuth(response.status === 200);
          setRole(response.data.role);
          setEmail(response.data.email);
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
      value={{
        auth,
        setAuth,
        loading,
        setLoading,
        role,
        setRole,
        email,
        setEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
