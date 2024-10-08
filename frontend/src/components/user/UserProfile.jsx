import { Box, Heading, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('/api/v1/user/profile');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    fetchUserProfile();
  }, []);

  if (!user) return <Text>Loading...</Text>;

  return (
    <Box className="max-w-4xl mx-auto mt-10">
      <Heading>User Profile</Heading>
      <Text>First Name: {user.firstName}</Text>
      <Text>Last Name: {user.lastName}</Text>
      <Text>Email: {user.email}</Text>
    </Box>
  );
};

export default UserProfile;
