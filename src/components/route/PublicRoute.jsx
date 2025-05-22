import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  if (loading) return null;
  return isAuthenticated ? <Navigate to={"/home"} replace /> : children;
};

export default PublicRoute;
