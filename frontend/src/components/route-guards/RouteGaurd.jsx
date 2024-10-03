import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const RouteGuard = ({ children, adminOnly = false }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/unauthorized" />; // Redirect to unauthorized page
  }

  return children;
};

export default RouteGuard;
