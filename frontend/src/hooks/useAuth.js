import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import jwt_decode from 'jwt-decode';
import { logout } from '../services/authService';

export const useAuth = () => {
  const { isAuthenticated, setIsAuthenticated, isAdmin, setIsAdmin } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwt_decode(token);
        if (decoded.exp * 1000 < Date.now()) {
          logout(); // Token expired, log the user out
          setIsAuthenticated(false);
          setIsAdmin(false);
        }
      } catch (error) {
        logout(); // Invalid token, log the user out
        setIsAuthenticated(false);
        setIsAdmin(false);
      }
    }
  }, [setIsAuthenticated, setIsAdmin]);

  return { isAuthenticated, setIsAuthenticated, isAdmin };
};
