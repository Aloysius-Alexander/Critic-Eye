import { Box, Input, Button } from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';

const AdminSignin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/v1/admin/SignIn', { email, password });
      // Handle admin login logic
      console.log(response.data);
    } catch (error) {
      console.error('Admin login failed:', error);
    }
  };

  return (
    <Box className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4"
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4"
        />
        <Button type="submit" colorScheme="teal" className="w-full">
          Sign In
        </Button>
      </form>
    </Box>
  );
};

export default AdminSignin;
