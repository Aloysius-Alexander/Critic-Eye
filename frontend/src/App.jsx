import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserSigninPage from './pages/user/UserSigninPage';
import UserSignupPage from './pages/user/UserSignupPage';
import MovieListPage from './pages/user/MovieListPage';
import MovieDetailPage from './pages/user/MovieDetailPage';
import UserProfilePage from './pages/user/UserProfilePage';
import HomePage from './pages/HomePage'; // Import HomePage component

import AdminSigninPage from './pages/admin/AdminSigninPage';
import AdminSignupPage from './pages/admin/AdminSignupPage';
import AdminOverviewPage from './pages/admin/AdminOverviewPage';
import AdminMovieListPage from './pages/admin/AdminMovieListPage';
import AdminUserListPage from './pages/admin/AdminUserListPage';
import AdminReviewListPage from './pages/admin/AdminReviewListPage';
import AddMoviePage from './pages/admin/AddMoviePage';
import UpdateMoviePage from './pages/admin/UpdateMoviePage';
import DeleteMoviePage from './pages/admin/DeleteMoviePage';

function App() {
    return (
        <Router>
            <Routes>
                {/* Home Page Route */}
                <Route path="/" element={<HomePage />} />  {/* Home Page is the starting page */}

                {/* User Routes */}
                <Route path="/signin" element={<UserSigninPage />} />
                <Route path="/signup" element={<UserSignupPage />} />
                <Route path="/movies" element={<MovieListPage />} />
                <Route path="/movie/:id" element={<MovieDetailPage />} />
                <Route path="/profile" element={<UserProfilePage />} />

                {/* Admin Routes */}
                <Route path="/admin/signin" element={<AdminSigninPage />} />
                <Route path="/admin/signup" element={<AdminSignupPage />} />
                <Route path="/admin/overview" element={<AdminOverviewPage />} />
                <Route path="/admin/movies" element={<AdminMovieListPage />} />
                <Route path="/admin/users" element={<AdminUserListPage />} />
                <Route path="/admin/reviews" element={<AdminReviewListPage />} />
                <Route path="/admin/add-movie" element={<AddMoviePage />} />
                <Route path="/admin/update-movie/:id" element={<UpdateMoviePage />} />
                <Route path="/admin/delete-movie/:id" element={<DeleteMoviePage />} />

                {/* Fallback for undefined routes */}
                <Route path="*" element={<div>Page Not Found</div>} />
            </Routes>
        </Router>
    );
}

export default App;
