import { Navigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import Loading from "../../Shared/Loading";

type Props = {
  children: JSX.Element;
};

const AdminRoute = ({ children }: Props) => {
  const { auth, loading, role } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (auth && role === "admin") {
    return children;
  }

  return <Navigate to="/login" />;
};

export default AdminRoute;
