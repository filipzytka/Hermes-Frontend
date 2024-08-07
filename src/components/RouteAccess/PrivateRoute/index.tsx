import { Navigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import Loading from "../../Loading";

type Props = {
  children: JSX.Element;
};

const PrivateRoute = ({ children }: Props) => {
  const { auth, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return auth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
