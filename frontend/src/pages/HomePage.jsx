import { Box, Heading, Button, VStack, Divider, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Box className="min-h-screen flex flex-col items-center justify-center p-8">
      {/* Main Content */}
      <Box className="flex flex-col items-center"> 
        {/* Header */}
        <Heading as="h1" size="3xl" mb="10" color="black"> {/* Text color changed to blue */}
          Welcome to Critic Eye
        </Heading>

        <Box className="flex flex-row justify-center items-start w-full max-w-6xl">
          {/* Left Section: Logo and Description */}
          <Box className="flex flex-col items-center justify-center flex-grow mr-10">
            {/* Increased Logo Size */}
            <Box w="400" h="400" className="flex items-center justify-center mb-4">
              <Image src="/assets/logo.png" alt="Website Logo" boxSize="400" objectFit="contain" />
            </Box>

            {/* Website Description */}
            <Box w="72" h="40" className="flex items-center justify-center">
              <Text fontSize="2xl" color="gray.600" textAlign="center">
                "Discover the latest movies, read reviews, and share your opinions with the world."
              </Text>
            </Box>
          </Box>

          {/* Divider */}
          <Divider orientation="vertical" borderColor="gray.400" height="550px" />

          {/* Right Section: User and Admin Sign In/Sign Up */}
          <Box className="flex flex-col flex-grow ml-10 space-y-10">
            {/* User Section */}
            <Box border="1px" borderColor="gray.400" bg="gray.100" p="6" borderRadius="md" className="flex flex-col items-center">
              <Box w="24" h="24" className="flex items-center justify-center mb-4">
                <Image src="/assets/user-icon.png" alt="User Icon" boxSize="24" objectFit="cover" />
              </Box>
              <VStack spacing="4">
                <Link to="/signin">
                  <Button colorScheme="blue" _hover={{ bg: "blue.600" }}>User Sign In</Button>
                </Link>
                <Link to="/signup">
                  <Button colorScheme="teal" _hover={{ bg: "teal.600" }}>User Sign Up</Button>
                </Link>
              </VStack>
            </Box>

            {/* Admin Section */}
            <Box border="1px" borderColor="gray.400" bg="gray.100" p="6" borderRadius="md" className="flex flex-col items-center">
              <Box w="24" h="24" className="flex items-center justify-center mb-4">
                <Image src="/assets/admin-icon.png" alt="Admin Icon" boxSize="24" objectFit="cover" />
              </Box>
              <VStack spacing="4">
                <Link to="/admin/signin">
                  <Button colorScheme="blue" _hover={{ bg: "blue.600" }}>Admin Sign In</Button>
                </Link>
                <Link to="/admin/signup">
                  <Button colorScheme="teal" _hover={{ bg: "teal.600" }}>Admin Sign Up</Button>
                </Link>
              </VStack>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
