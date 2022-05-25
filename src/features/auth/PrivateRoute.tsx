import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsAuthenticated } from "./authSlice";

interface Props {
  component: React.ComponentType;
  path?: string;
}

export const PrivateRoute: React.FC<Props> = ({
  component: RouteComponent,
}) => {
  const isAuthenticated: boolean = useSelector(selectIsAuthenticated);

  if (isAuthenticated) {
    return <RouteComponent />;
  }

  return <Navigate to="/login" />;
};
