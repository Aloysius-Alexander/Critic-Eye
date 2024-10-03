import { useEffect, useState } from 'react';
import { getAdminOverview } from '../../services/adminService';
import { Box, Stat, StatLabel, StatNumber, SimpleGrid, Heading } from '@chakra-ui/react';

function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalMovies: 0,
    totalUsers: 0,
    totalReviews: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getAdminOverview();
        setStats(data);
      } catch (error) {
        console.error('Error fetching admin statistics:', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <Box p="4">
      <Heading as="h2" size="lg" mb="6">Admin Dashboard</Heading>
      <SimpleGrid columns={[1, 3]} spacing="6">
        <Stat>
          <StatLabel>Total Movies</StatLabel>
          <StatNumber>{stats.totalMovies}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Total Users</StatLabel>
          <StatNumber>{stats.totalUsers}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Total Reviews</StatLabel>
          <StatNumber>{stats.totalReviews}</StatNumber>
        </Stat>
      </SimpleGrid>
    </Box>
  );
}

export default AdminDashboardPage;
