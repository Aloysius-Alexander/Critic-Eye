import { Box, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminUserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/v1/admin/user-list');
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <Box className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl mb-6">User List</h2>
      {users.map((user) => (
        <Box key={user._id} className="mb-4 p-4 border border-gray-200 rounded">
          <p>{user.firstName} {user.lastName}</p>
          <p>{user.email}</p>
          <Button colorScheme="red" className="mt-2">Delete User</Button>
        </Box>
      ))}
    </Box>
  );
};

export default AdminUserList;
