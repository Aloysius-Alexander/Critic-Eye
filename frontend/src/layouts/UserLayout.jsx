import BaseLayout from './BaseLayout';
import { Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const UserLayout = ({ children }) => {
  return (
    <BaseLayout>
      {/* User Navigation */}
      <Box className="bg-gray-200 p-4 mb-6">
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/movies" className="text-blue-500">Movies</Link>
            </li>
            <li>
              <Link to="/profile" className="text-blue-500">Profile</Link>
            </li>
            <li>
              <Link to="/reviews" className="text-blue-500">My Reviews</Link>
            </li>
          </ul>
        </nav>
      </Box>

      {/* User Content */}
      <Box>{children}</Box>
    </BaseLayout>
  );
};

export default UserLayout;
