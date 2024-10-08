import { Box, Heading } from '@chakra-ui/react';
import AdminLayout from '../../layouts/AdminLayout';

const AdminOverviewPage = () => {
  return (
    <AdminLayout>
      <Box className="max-w-4xl mx-auto mt-10">
        <Heading>Admin Overview</Heading>
        <Box className="mt-6">
          <p>Welcome to the Admin Dashboard. Here you can manage movies, users, and reviews.</p>
          {/* Additional dashboard content can be added here */}
        </Box>
      </Box>
    </AdminLayout>
  );
};

export default AdminOverviewPage;
