import { Navigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

type Props = {
  children: JSX.Element;
};

const NotSignedInRoute = ({ children }: Props) => {
  const { auth } = useAuth();

  return !auth ? children : <Navigate to="/" />;
};

export default NotSignedInRoute;
