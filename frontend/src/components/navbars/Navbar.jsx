import { logout } from '../../services/authService';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const { setIsAuthenticated, setIsAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clear the token from localStorage or cookies
    setIsAuthenticated(false); // Update authentication state
    setIsAdmin(false); // Reset admin state
    navigate('/signin'); // Redirect to sign-in page
  };

  return (
    <nav>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;
