import { useEffect, useState } from "react";
import AuthContext from "../../context/auth";
import { authenticateUser } from "../../api/auth";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";

type Props = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState<boolean>(false);
  const [role, setRole] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const { refetch, isLoading } = useQuery({
    queryKey: ["userAuth"],
    queryFn: () => authenticateUser(),
    retry: false,
  });

  const fetchCredentials = async () => {
    const { data: credentials } = await refetch();
    if (!credentials) {
      setAuth(false);
      return;
    }

    setAuth(true);
    setRole(credentials.data.role);
    setEmail(credentials.data.email);
  };

  useEffect(() => {
    fetchCredentials();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

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
