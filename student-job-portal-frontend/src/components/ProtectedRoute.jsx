import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, loading, role: userRole } = useAuth();

  // Auth durumu yüklenirken hiçbir şey gösterme
  if (loading) {
    return <p>Loading...</p>;
  }

  // Giriş yapılmamışsa login'e yönlendir
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Rol kontrolü (örn: employer sayfasına student giremez)
  if (role && userRole !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
