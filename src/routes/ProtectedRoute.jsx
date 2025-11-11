import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, role, loading } = useUser(); // `useUser`-dan rolu götür

  // Yüklənir vəziyyətində heç bir səhifə göstərmə
  if (loading) return <p>Loading...</p>; 

  // İstifadəçi yoxdursa, login səhifəsinə yönləndir
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Admin və ya SuperAdmin rolu yoxlanır
  if (requiredRole === "admin" && role !== "admin") {
    return <Navigate to="/" />;
  }

  if (requiredRole === "superadmin" && role !== "superadmin") {
    return <Navigate to="/" />;
  }

  // Bütün yoxlamalar keçildikdə, componenti göstər
  return children;
};

export default ProtectedRoute;
