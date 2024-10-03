import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserSigninPage from './pages/user/UserSigninPage';
import UserSignupPage from './pages/user/UserSignupPage';
import MovieListPage from './pages/user/MovieListPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AddMoviePage from './pages/admin/AddMoviePage';
import UserManagementPage from './pages/admin/UserManagementPage';
import MovieDetailPage from './pages/shared/MovieDetailPage';
import ReviewPage from './pages/shared/ReviewPage';
import RouteGuard from './components/route-guards/RouteGuard';
import ReviewManagementPage from './pages/admin/ReviewManagementPage';
import UnauthorizedPage from './pages/UnauthorizedPage';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/signin" element={<UserSigninPage />} />
        <Route path="/signup" element={<UserSignupPage />} />
        <Route path="/movies" element={<MovieListPage />} />
        <Route path="/movies/:id" element={<MovieDetailPage />} />
        <Route path="/movies/:id/reviews" element={<ReviewPage />} />
        
        {/* Protected Admin Routes */}
        <Route path="/admin/dashboard" element={<RouteGuard adminOnly={true}><AdminDashboardPage /></RouteGuard>} />
        <Route path="/admin/add-movie" element={<RouteGuard adminOnly={true}><AddMoviePage /></RouteGuard>} />
        <Route path="/admin/users" element={<RouteGuard adminOnly={true}><UserManagementPage /></RouteGuard>} />
        <Route path="/admin/reviews" element={<RouteGuard adminOnly><ReviewManagementPage /></RouteGuard>} />

         {/* Unauthorized Route */}
         <Route path="/unauthorized" element={<UnauthorizedPage />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
