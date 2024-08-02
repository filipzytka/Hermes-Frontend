import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

type Props = {
  children: JSX.Element;
};

const PrivateRoute = ({ children }: Props) => {
  const { auth, loading } = useAuth();

  if (loading) {
    return <></>;
  }

  return auth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
