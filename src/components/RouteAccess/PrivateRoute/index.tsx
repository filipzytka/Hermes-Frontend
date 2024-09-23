import { Navigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

type Props = {
  children: JSX.Element;
};

const PrivateRoute = ({ children }: Props) => {
  const { auth } = useAuth();

  if (auth === true) {
    return children;
  } else if (auth === false) {
    <Navigate to="/login" />;
  }
};

export default PrivateRoute;
