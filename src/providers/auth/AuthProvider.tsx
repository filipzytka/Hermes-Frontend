import { useEffect, useState } from "react";
import AuthContext from "../../context/auth";
import { authenticateUser } from "../../api/auth";
import { useQuery } from "@tanstack/react-query";

type Props = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState<boolean>(false);
  const [role, setRole] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const { refetch } = useQuery({
    queryKey: ["userAuth"],
    queryFn: () => authenticateUser(),
  });

  const fetchCredentials = async () => {
    const { data: credentials } = await refetch();

    if (credentials) {
      setAuth(true);
      setRole(credentials.data.role);
      setEmail(credentials.data.email);
    } else {
      setAuth(false);
    }
  };

  useEffect(() => {
    fetchCredentials();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
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
