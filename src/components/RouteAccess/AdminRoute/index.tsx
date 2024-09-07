import { Navigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

type Props = {
  children: JSX.Element;
};

const AdminRoute = ({ children }: Props) => {
  const { auth, role } = useAuth();

  if (auth && role === "admin") {
    return children;
  }

  return <Navigate to="/login" />;
};

export default AdminRoute;
