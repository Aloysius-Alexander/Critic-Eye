import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Box className="min-h-screen flex flex-col items-center justify-center">
      <Heading as="h1" size="2xl" mb="6">
        Welcome to Critic Eye
      </Heading>
      <Text fontSize="lg" mb="6">
        Discover the latest movies, read reviews, and share your opinions with others.
      </Text>
      <Box>
        <Link to="/movies">
          <Button colorScheme="teal" size="lg" mr="4">
            Browse Movies
          </Button>
        </Link>
        <Link to="/signin">
          <Button colorScheme="blue" size="lg">
            Sign In
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default HomePage;
