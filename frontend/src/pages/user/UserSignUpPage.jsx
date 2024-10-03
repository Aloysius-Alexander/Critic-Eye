
import { Box, Button, Input, FormControl, FormLabel, Heading } from '@chakra-ui/react';
import { useState } from 'react';
import { signUp } from '../../services/authService'; // Import the API function

function UserSignupPage() {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signUp(userData);
      console.log('Signed up successfully:', response);
      // Redirect to sign-in or home page upon success
    } catch (error) {
      console.error('Error during sign-up:', error);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt="10">
      <Heading as="h2" size="xl" textAlign="center" mb="6">
        Sign Up
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb="4">
          <FormLabel>First Name</FormLabel>
          <Input name="firstName" type="text" placeholder="Enter your first name" onChange={handleChange} />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Last Name</FormLabel>
          <Input name="lastName" type="text" placeholder="Enter your last name" onChange={handleChange} />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Email address</FormLabel>
          <Input name="email" type="email" placeholder="Enter your email" onChange={handleChange} />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Password</FormLabel>
          <Input name="password" type="password" placeholder="Enter your password" onChange={handleChange} />
        </FormControl>
        <Button colorScheme="teal" size="lg" type="submit" width="full">
          Sign Up
        </Button>
      </form>
    </Box>
  );
}

export default UserSignupPage;
