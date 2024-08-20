import { Navigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import Loading from "../../Shared/Loading";

type Props = {
  children: JSX.Element;
};

const PublicRoute = ({ children }: Props) => {
  const { auth, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return !auth ? children : <Navigate to="/" />;
};

export default PublicRoute;
