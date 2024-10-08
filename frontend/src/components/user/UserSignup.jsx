import { Box, Input, Button } from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';

const UserSignup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/v1/user/SignUp', { firstName, lastName, email, password });
      // Handle user registration logic
      console.log(response.data);
    } catch (error) {
      console.error('User signup failed:', error);
    }
  };

  return (
    <Box className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="mb-4"
        />
        <Input
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="mb-4"
        />
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
          Sign Up
        </Button>
      </form>
    </Box>
  );
};

export default UserSignup;
