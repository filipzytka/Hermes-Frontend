import { Navigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

type Props = {
  children: JSX.Element;
};

const AdminRoute = ({ children }: Props) => {
  const { auth, role } = useAuth();

  if (auth === true && role === "admin") {
    return children;
  } else if (auth === false) {
    return <Navigate to="/login" />;
  }
};

export default AdminRoute;
