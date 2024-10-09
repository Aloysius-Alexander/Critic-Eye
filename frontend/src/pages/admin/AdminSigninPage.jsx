import { Box, Heading, Input, Button, VStack, HStack, Image, IconButton } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons'; // Importing Chakra's back icon

const AdminSigninPage = () => {
  const navigate = useNavigate(); // Hook to navigate back

  return (
    <Box className="min-h-screen flex flex-col bg-gray-100">
      {/* Header Section */}
      <HStack justifyContent="space-between" w="full" p="4" bg="gray.200">
        {/* Critic Eye Logo */}
        <Box>
          <Image src="/assets/logo.png" alt="Critic Eye Logo" boxSize="100" objectFit="contain" />
        </Box>

        {/* Title */}
        <Heading as="h1" size="3xl" textAlign="center">
          Critic Eye
        </Heading>

        {/* Back Icon */}
        <Box>
          <IconButton
            aria-label="Go Back"
            icon={<ArrowBackIcon />}
            onClick={() => navigate(-1)} // Navigate back to the most recent page
            size="lg"
            variant="outline"
            borderRadius="full"
          />
        </Box>
      </HStack>

      {/* Admin Sign-In Form Section */}
      <Box className="flex-grow flex items-center justify-center">
        <Box w="full" maxW="md" p="8" bg="white" boxShadow="lg" borderRadius="lg" border="2px" borderColor="gray.300">
          <Heading as="h2" size="lg" textAlign="center" mb="6">
            ADMIN - SIGN IN
          </Heading>

          <VStack spacing="4">
            {/* Email Field */}
            <Input
              placeholder="Email"
              type="email"
              size="lg"
              variant="outline"
              borderRadius="full"
              focusBorderColor="blue.500"
            />

            {/* Password Field */}
            <Input
              placeholder="Password"
              type="password"
              size="lg"
              variant="outline"
              borderRadius="full"
              focusBorderColor="blue.500"
            />

            {/* Submit Button */}
            <Button colorScheme="teal" size="lg" width="full" borderRadius="full" mt="6">
              Sign In
            </Button>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminSigninPage;
