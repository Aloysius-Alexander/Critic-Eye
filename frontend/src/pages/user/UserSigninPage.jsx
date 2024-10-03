import { Box, Button, Input, FormControl, FormLabel, Heading } from '@chakra-ui/react';
import { useState } from 'react';
import { signIn } from '../../services/authService'; // Import the API function
import { useAuth } from '../../hooks/useAuth'; // Import useAuth hook
import { useNavigate } from 'react-router-dom'; // To navigate after sign-in

function UserSigninPage() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const { setIsAuthenticated } = useAuth(); // Access setIsAuthenticated from AuthContext
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signIn(credentials);
      // Store the token in localStorage
      localStorage.setItem('token', response.token); // Assuming your backend sends a token
      setIsAuthenticated(true);
      navigate('/movies'); // Redirect to movies page after sign-in
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt="10">
      <Heading as="h2" size="xl" textAlign="center" mb="6">
        Sign In
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb="4">
          <FormLabel>Email address</FormLabel>
          <Input name="email" type="email" placeholder="Enter your email" onChange={handleChange} />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Password</FormLabel>
          <Input name="password" type="password" placeholder="Enter your password" onChange={handleChange} />
        </FormControl>
        <Button colorScheme="teal" size="lg" type="submit" width="full">
          Sign In
        </Button>
      </form>
    </Box>
  );
}

export default UserSigninPage;
