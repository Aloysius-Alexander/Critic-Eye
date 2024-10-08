import BaseLayout from './BaseLayout';
import { Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  return (
    <BaseLayout>
      {/* Admin Navigation */}
      <Box className="bg-gray-200 p-4 mb-6">
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/admin/overview" className="text-blue-500">Overview</Link>
            </li>
            <li>
              <Link to="/admin/movies" className="text-blue-500">Movies</Link>
            </li>
            <li>
              <Link to="/admin/users" className="text-blue-500">Users</Link>
            </li>
            <li>
              <Link to="/admin/reviews" className="text-blue-500">Reviews</Link>
            </li>
          </ul>
        </nav>
      </Box>

      {/* Admin Content */}
      <Box>{children}</Box>
    </BaseLayout>
  );
};

export default AdminLayout;
